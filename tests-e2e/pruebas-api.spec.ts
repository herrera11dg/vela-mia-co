import { test, expect } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

// Carpeta donde se guardan las capturas de pantalla (relativa a la raíz del proyecto)
const SHOTS_DIR = path.resolve(process.cwd(), "capturas");

// Correo único para que la prueba sea repetible sin conflictos
const EMAIL = `cliente.prueba.${Date.now()}@test.com`;

// Estilos CSS para las tarjetas de resultado
function buildCard(opts: {
  caso: string;
  titulo: string;
  endpoint: string;
  metodo: string;
  requestBody: string;
  status: number;
  responseBody: string;
  pass: boolean;
  observacion?: string;
}): string {
  const color = opts.pass ? "#2e7d32" : "#c62828";
  const badge = opts.pass ? "PASÓ ✓" : "FALLÓ ✗";
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f1ea; padding: 30px; }
  .card { background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); padding: 28px; max-width: 900px; margin: 0 auto; border-top: 6px solid ${color}; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .caso { font-size: 13px; color: #7a8c5e; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
  h1 { font-size: 22px; color: #3a2a1e; margin-top: 4px; }
  .badge { padding: 6px 16px; border-radius: 20px; color: #fff; font-weight: bold; font-size: 14px; background: ${color}; }
  .row { display: flex; gap: 16px; margin-bottom: 14px; }
  .label { font-size: 11px; color: #8a7a6a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
  .endpoint { font-family: Consolas, monospace; background: #f0ebe3; padding: 8px 12px; border-radius: 6px; font-size: 14px; }
  .metodo { font-family: Consolas, monospace; font-weight: bold; color: #c62828; }
  pre { background: #2d2d2d; color: #e8e8e8; padding: 14px; border-radius: 8px; font-family: Consolas, monospace; font-size: 13px; overflow-x: auto; white-space: pre-wrap; word-break: break-word; }
  .status-big { font-size: 40px; font-weight: bold; color: ${color}; text-align: center; }
  .status-label { text-align: center; font-size: 12px; color: #8a7a6a; }
  .obs { margin-top: 16px; padding: 12px; background: #fff8e1; border-left: 4px solid #f9a825; border-radius: 4px; font-size: 13px; color: #6a5a4a; }
</style></head>
<body>
  <div class="card">
    <div class="header">
      <div><div class="caso">${opts.caso}</div><h1>${opts.titulo}</h1></div>
      <div class="badge">${badge}</div>
    </div>
    <div class="row">
      <div style="flex:1"><div class="label">Endpoint</div><div class="endpoint"><span class="metodo">${opts.metodo}</span> ${opts.endpoint}</div></div>
      <div style="width:120px"><div class="label">Estado HTTP</div><div class="status-big">${opts.status}</div></div>
    </div>
    <div class="label">Cuerpo de la petición (JSON)</div>
    <pre>${opts.requestBody}</pre>
    <div style="height:14px"></div>
    <div class="label">Respuesta de la API (JSON)</div>
    <pre>${opts.responseBody}</pre>
    ${opts.observacion ? `<div class="obs">📌 ${opts.observacion}</div>` : ""}
  </div>
</body></html>`;
}

test.describe("Documentación de pruebas - Vela Mía (API)", () => {
  test("Ejecutar los 5 casos de prueba del plan y capturar evidencia", async ({ request, page }) => {
    fs.mkdirSync(SHOTS_DIR, { recursive: true });

    // ===== CP-01: Registro exitoso =====
    const registroBody = {
      documento_identidad: "1099999999",
      nombres: "Cliente",
      apellidos: "Prueba",
      correo: EMAIL,
      telefono: "3000000000",
      contrasena: "Vela123",
    };
    const r1 = await request.post("/api/registro", { data: registroBody });
    const body1 = await r1.text();
    await page.setContent(buildCard({
      caso: "CP-01",
      titulo: "Registro exitoso de un nuevo cliente",
      endpoint: "/api/registro",
      metodo: "POST",
      requestBody: JSON.stringify(registroBody, null, 2),
      status: r1.status(),
      responseBody: body1,
      pass: r1.status() === 201,
    }));
    await page.screenshot({ path: path.join(SHOTS_DIR, "cp01-registro-exitoso.png"), fullPage: true });

    // ===== CP-02: Registro duplicado =====
    const r2 = await request.post("/api/registro", { data: registroBody });
    const body2 = await r2.text();
    await page.setContent(buildCard({
      caso: "CP-02",
      titulo: "Registro fallido por usuario duplicado",
      endpoint: "/api/registro",
      metodo: "POST",
      requestBody: JSON.stringify(registroBody, null, 2),
      status: r2.status(),
      responseBody: body2,
      pass: r2.status() === 409,
      observacion: "El plan (AA1-EV02) esperaba HTTP 400; la API devuelve HTTP 409 (Conflict), código semánticamente correcto para datos duplicados.",
    }));
    await page.screenshot({ path: path.join(SHOTS_DIR, "cp02-registro-duplicado.png"), fullPage: true });

    // ===== CP-03: Login exitoso =====
    const loginOk = { correo: EMAIL, contrasena: "Vela123" };
    const r3 = await request.post("/api/login", { data: loginOk });
    const body3 = await r3.text();
    await page.setContent(buildCard({
      caso: "CP-03",
      titulo: "Inicio de sesión exitoso (credenciales correctas)",
      endpoint: "/api/login",
      metodo: "POST",
      requestBody: JSON.stringify(loginOk, null, 2),
      status: r3.status(),
      responseBody: body3,
      pass: r3.status() === 200,
    }));
    await page.screenshot({ path: path.join(SHOTS_DIR, "cp03-login-exitoso.png"), fullPage: true });

    // ===== CP-04: Login con contraseña incorrecta =====
    const loginMal = { correo: EMAIL, contrasena: "ClaveEquivocada" };
    const r4 = await request.post("/api/login", { data: loginMal });
    const body4 = await r4.text();
    await page.setContent(buildCard({
      caso: "CP-04",
      titulo: "Inicio de sesión fallido (contraseña incorrecta)",
      endpoint: "/api/login",
      metodo: "POST",
      requestBody: JSON.stringify(loginMal, null, 2),
      status: r4.status(),
      responseBody: body4,
      pass: r4.status() === 401,
    }));
    await page.screenshot({ path: path.join(SHOTS_DIR, "cp04-login-contrasena-incorrecta.png"), fullPage: true });

    // ===== CP-05: Login con campos vacíos =====
    const loginVacio = { correo: "", contrasena: "" };
    const r5 = await request.post("/api/login", { data: loginVacio });
    const body5 = await r5.text();
    await page.setContent(buildCard({
      caso: "CP-05",
      titulo: "Validación de campos vacíos en el login",
      endpoint: "/api/login",
      metodo: "POST",
      requestBody: JSON.stringify(loginVacio, null, 2),
      status: r5.status(),
      responseBody: body5,
      pass: r5.status() === 400,
    }));
    await page.screenshot({ path: path.join(SHOTS_DIR, "cp05-login-campos-vacios.png"), fullPage: true });

    // Verificaciones finales (asserts)
    expect(r1.status()).toBe(201);
    expect(r2.status()).toBe(409);
    expect(r3.status()).toBe(200);
    expect(r4.status()).toBe(401);
    expect(r5.status()).toBe(400);
  });
});
