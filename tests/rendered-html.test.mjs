import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the QuiPraia hotsite with approved brand and plans", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>QuiPraia: Qual praia hoje\?<\/title>/i);
  assert.match(html, /quipraia-3c-wordmark-dark-approved\.svg/);
  assert.match(html, /Continuar com Google/);
  assert.match(html, /R\$ 9,90/);
  assert.match(html, /Fortaleça o movimento surf/);
  assert.doesNotMatch(html, /Ondai|adm\*123|adm@ondai/i);
});

test("renders both authentication choices", async () => {
  for (const path of ["/entrar", "/cadastro"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /(Continuar|Cadastrar) com Google/);
    assert.match(html, /type="email"/);
    assert.match(html, /type="password"/);
  }
});

test("renders the authenticated product home", async () => {
  const response = await render("/app");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Stella Maris/);
  assert.match(html, /Condição atual/);
  assert.match(html, /Curva e extremos/);
  assert.match(html, /icon-waves/);
});

test("renders the core product journeys", async () => {
  const expectations = [
    ["/mapa", [/Mapa de sessões/, /Praia do Flamengo/, /Stella Maris/]],
    ["/comparar", [/Comparar praias/, /Jaguaribe/, /\+12h/]],
    ["/praias/stella-maris", [/Stella Maris/, /Janela da sessão/, /Ondas/, /Período/, /Vento/, /Maré/]],
    ["/comunidade", [/Relatar condição/, /De quem está na água/, /Pulso da comunidade/]],
    ["/perfil", [/Praias favoritas/, /Melhor janela/, /Colaborador/]],
  ];

  for (const [path, patterns] of expectations) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render successfully`);
    const html = await response.text();
    for (const pattern of patterns) assert.match(html, pattern);
    assert.doesNotMatch(html, /\u2014/, `${path} should not use em dashes`);
  }
});
