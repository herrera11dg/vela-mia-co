import { test, expect } from "@playwright/test";

const EMAIL = `cliente.video.${Date.now()}@test.com`;
const PAUSA = 11000;

type Resultado = { caso: string; titulo: string; pass: boolean };
const resultados: Resultado[] = [];

function tarjeta(opts: {
  caso: string;
  titulo: string;
  metodo: string;
  endpoint: string;
  requestBody: string;
  esperado: number;
  status?: number;
  responseBody?: string;
  pass?: boolean;
}): string {
  const terminado = opts.status !== undefined;
  const color = !terminado ? "#f9a825" : opts.pass ? "#2e7d32" : "#c62828";
  const badge = !terminado ? "EJECUTANDO..." : opts.pass ? "PASÓ ✓" : "FALLÓ ✗";
  const responseHtml = terminado ? opts.responseBody : "Esperando respuesta...";
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f1ea; padding: 30px; }
  .card { background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); padding: 28px; max-width: 1000px; margin: 0 auto; border-top: 8px solid ${color}; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .caso { font-size: 13px; color: #7a8c5e; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
  h1 { font-size: 24px; color: #3a2a1e; margin-top: 4px; }
  .badge { padding: 8px 20px; border-radius: 20px; color: #fff; font-weight: bold; font-size: 16px; background: ${color}; }
  .row { display: flex; gap: 16px; margin-bottom: 16px; align-items: flex-end; }
  .label { font-size: 11px; color: #8a7a6a; text-transform: uppercase; margin-bottom: 3px; }
  .endpoint { font-family: Consolas, monospace; background: #f0ebe3; padding: 8px 12px; border-radius: 6px; font-size: 14px; }
  .metodo { font-weight: bold; color: #c62828; }
  pre { background: #2d2d2d; color: #e8e8e8; padding: 12px; border-radius: 8px; font-family: Consolas, monospace; font-size: 13px; white-space: pre-wrap; word-break: break-word; min-height: 50px; }
  .status { font-size: 38px; font-weight: bold; color: ${color}; text-align: center; }
  .esperado { font-size: 12px; color: #8a7a6a; text-align: center; }
</style></head><body>
  <div class="card">
    <div class="header">
      <div><div class="caso">${opts.caso}</div><h1>${opts.titulo}</h1></div>
      <div class="badge">${badge}</div>
    </div>
    <div class="row">
      <div style="flex:1"><div class="label">Petición HTTP</div>
        <div class="endpoint"><span class="metodo">${opts.metodo}</span> http://127.0.0.1:5000${opts.endpoint}</div></div>
      <div style="width:140px"><div class="label">Estado HTTP</div>
        <div class="status">${terminado ? opts.status : "..."}</div>
        <div class="esperado">Esperado: ${opts.esperado}</div></div>
    </div>
    <div class="label">Cuerpo de la petición (JSON)</div>
    <pre>${opts.requestBody}</pre>
    <div style="height:12px"></div>
    <div class="label">Respuesta de la API (JSON)</div>
    <pre>${responseHtml}</pre>
  </div>
</body></html>`;
}

function tarjetaResumen(): string {
  const filas = resultados.map((r) => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;">
      <span style="color:#3a2a1e;">${r.caso} — ${r.titulo}</span>
      <span style="color:${r.pass ? '#2e7d32' : '#c62828'};font-weight:bold;">${r.pass ? 'PASÓ ✓' : 'FALLÓ ✗'}</span>
    </div>`).join("");
  const total = resultados.length;
  const pasados = resultados.filter((r) => r.pass).length;
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f1ea; padding: 40px; }
  .card { background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); padding: 32px; max-width: 700px; margin: 0 auto; border-top: 8px solid #7a8c5e; text-align: center; }
  h1 { font-size: 26px; color: #3a2a1e; margin-bottom: 8px; }
  .sub { color: #8a7a6a; font-size: 14px; margin-bottom: 24px; }
  .big { font-size: 46px; font-weight: bold; color: #2e7d32; margin-bottom: 8px; }
  .list { text-align: left; margin-top: 10px; }
</style></head><body>
  <div class="card">
    <h1>Resumen de pruebas</h1>
    <div class="sub">Módulo de Autenticación — Vela Mía</div>
    <div class="big">${pasados} / ${total}</div>
    <div class="sub">pruebas superadas</div>
    <div class="list">${filas}</div>
  </div>
</body></html>`;
}

test("Video de evidencia - 5 casos de prueba API Vela Mía", async ({ request, page }) => {
  test.setTimeout(180000);

  const registroBody = {
    documento_identidad: String(Date.now()).slice(-10),
    nombres: "Cliente",
    apellidos: "Prueba",
    correo: EMAIL,
    telefono: "3000000000",
    contrasena: "Vela123",
  };
  const req1 = JSON.stringify(registroBody, null, 2);

  // ===== CP-01: Registro exitoso =====
  await page.setContent(tarjeta({ caso: "CP-01", titulo: "Registro exitoso de un nuevo cliente", metodo: "POST", endpoint: "/api/registro", requestBody: req1, esperado: 201 }));
  await page.waitForTimeout(4000);
  const r1 = await request.post("/api/registro", { data: registroBody });
  const ok1 = r1.status() === 201;
  await page.setContent(tarjeta({ caso: "CP-01", titulo: "Registro exitoso de un nuevo cliente", metodo: "POST", endpoint: "/api/registro", requestBody: req1, esperado: 201, status: r1.status(), responseBody: await r1.text(), pass: ok1 }));
  resultados.push({ caso: "CP-01", titulo: "Registro exitoso", pass: ok1 });
  await page.waitForTimeout(PAUSA - 4000);
  expect(r1.status()).toBe(201);

  // ===== CP-02: Registro duplicado =====
  await page.setContent(tarjeta({ caso: "CP-02", titulo: "Registro fallido por usuario duplicado", metodo: "POST", endpoint: "/api/registro", requestBody: req1, esperado: 409 }));
  await page.waitForTimeout(4000);
  const r2 = await request.post("/api/registro", { data: registroBody });
  const ok2 = r2.status() === 409;
  await page.setContent(tarjeta({ caso: "CP-02", titulo: "Registro fallido por usuario duplicado", metodo: "POST", endpoint: "/api/registro", requestBody: req1, esperado: 409, status: r2.status(), responseBody: await r2.text(), pass: ok2 }));
  resultados.push({ caso: "CP-02", titulo: "Registro duplicado", pass: ok2 });
  await page.waitForTimeout(PAUSA - 4000);
  expect(r2.status()).toBe(409);

  // ===== CP-03: Login exitoso =====
  const loginOk = { correo: EMAIL, contrasena: "Vela123" };
  const req3 = JSON.stringify(loginOk, null, 2);
  await page.setContent(tarjeta({ caso: "CP-03", titulo: "Inicio de sesión exitoso", metodo: "POST", endpoint: "/api/login", requestBody: req3, esperado: 200 }));
  await page.waitForTimeout(4000);
  const r3 = await request.post("/api/login", { data: loginOk });
  const ok3 = r3.status() === 200;
  await page.setContent(tarjeta({ caso: "CP-03", titulo: "Inicio de sesión exitoso", metodo: "POST", endpoint: "/api/login", requestBody: req3, esperado: 200, status: r3.status(), responseBody: await r3.text(), pass: ok3 }));
  resultados.push({ caso: "CP-03", titulo: "Login exitoso", pass: ok3 });
  await page.waitForTimeout(PAUSA - 4000);
  expect(r3.status()).toBe(200);

  // ===== CP-04: Login contraseña incorrecta =====
  const loginMal = { correo: EMAIL, contrasena: "ClaveEquivocada" };
  const req4 = JSON.stringify(loginMal, null, 2);
  await page.setContent(tarjeta({ caso: "CP-04", titulo: "Inicio de sesión con contraseña incorrecta", metodo: "POST", endpoint: "/api/login", requestBody: req4, esperado: 401 }));
  await page.waitForTimeout(4000);
  const r4 = await request.post("/api/login", { data: loginMal });
  const ok4 = r4.status() === 401;
  await page.setContent(tarjeta({ caso: "CP-04", titulo: "Inicio de sesión con contraseña incorrecta", metodo: "POST", endpoint: "/api/login", requestBody: req4, esperado: 401, status: r4.status(), responseBody: await r4.text(), pass: ok4 }));
  resultados.push({ caso: "CP-04", titulo: "Login contraseña incorrecta", pass: ok4 });
  await page.waitForTimeout(PAUSA - 4000);
  expect(r4.status()).toBe(401);

  // ===== CP-05: Login campos vacíos =====
  const loginVacio = { correo: "", contrasena: "" };
  const req5 = JSON.stringify(loginVacio, null, 2);
  await page.setContent(tarjeta({ caso: "CP-05", titulo: "Validación de campos vacíos en el login", metodo: "POST", endpoint: "/api/login", requestBody: req5, esperado: 400 }));
  await page.waitForTimeout(4000);
  const r5 = await request.post("/api/login", { data: loginVacio });
  const ok5 = r5.status() === 400;
  await page.setContent(tarjeta({ caso: "CP-05", titulo: "Validación de campos vacíos en el login", metodo: "POST", endpoint: "/api/login", requestBody: req5, esperado: 400, status: r5.status(), responseBody: await r5.text(), pass: ok5 }));
  resultados.push({ caso: "CP-05", titulo: "Login campos vacíos", pass: ok5 });
  await page.waitForTimeout(PAUSA - 4000);
  expect(r5.status()).toBe(400);

  // ===== Resumen final =====
  await page.setContent(tarjetaResumen());
  await page.waitForTimeout(9000);
});
