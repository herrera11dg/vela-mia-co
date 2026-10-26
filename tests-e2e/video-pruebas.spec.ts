import { test, expect } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

const VIDEO_DIR = path.resolve(process.cwd(), "videos");
const EMAIL = `cliente.video.${Date.now()}@test.com`;
const PAUSA = 12000;

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
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f1ea; padding: 24px; }
  .card { background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); padding: 26px; max-width: 1000px; margin: 0 auto; border-top: 8px solid ${color}; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .caso { font-size: 13px; color: #7a8c5e; font-weight: bold; letter-spacing: 1px; }
  h1 { font-size: 22px; color: #3a2a1e; margin-top: 4px; }
  .badge { padding: 8px 20px; border-radius: 20px; color: #fff; font-weight: bold; font-size: 16px; background: ${color}; }
  .row { display: flex; gap: 16px; margin-bottom: 14px; align-items: flex-end; }
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
    <pre>${terminado ? opts.responseBody : "Esperando respuesta..."}</pre>
  </div>
</body></html>`;
}

test.use({
  video: { mode: "on", size: { width: 1100, height: 800 } },
});

test("Video de evidencia - 5 casos de prueba API Vela Mía", async ({ request, page }) => {
  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  // ===== CP-01 =====
  const registroBody = {
    documento_identidad: "1099999999",
    nombres: "Cliente",
    apellidos: "Prueba",
    correo: EMAIL,
    telefono: "3000000000",
    contrasena: "Vela123",
  };
  const req1 = JSON.stringify(registroBody, null, 2);
  await page.setContent(tarjeta({
    caso: "CP-01", titulo: "Registro exitoso de un nuevo cliente",
    metodo: "POST", endpoint: "/api/registro", requestBody: req1, esperado: 201,
  }));
  await page.waitForTimeout(4000);
  const r1 = await request.post("/api/registro", { data: registroBody });
  const ok1 = r1.status() === 201;
  await page.setContent(tarjeta({
    caso: "CP-01", titulo: "Registro exitoso de un nuevo cliente",
    metodo: "POST", endpoint: "/api/registro", requestBody: req1, esperado: 201,
    status: r1.status(), responseBody: await r1.text(), pass: ok1,
  }));
  resultados.push({ caso: "CP-01", titulo: "Registro exitoso", pass: ok1 });
  await page.waitForTimeout(PAUSA - 4000);

  expect(r1.status()).toBe(201);
});