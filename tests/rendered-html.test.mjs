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
  assert.match(html, /Veja a praia antes de escolher/);
  assert.match(html, /quipraia-praia-do-flamengo-v1\.jpg/);
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

test("renders password recovery and update flows", async () => {
  const recovery = await render("/recuperar-senha");
  assert.equal(recovery.status, 200);
  const recoveryHtml = await recovery.text();
  assert.match(recoveryHtml, /Vamos recuperar sua conta/);
  assert.match(recoveryHtml, /Enviar link de recuperação/);

  const update = await render("/nova-senha");
  assert.equal(update.status, 200);
  const updateHtml = await update.text();
  assert.match(updateHtml, /Crie uma nova senha/);
  assert.match(updateHtml, /Salvar nova senha/);
});

test("keeps authentication callbacks safe in demonstration mode", async () => {
  const response = await render("/auth/callback?next=//site-malicioso.example");
  assert.ok([302, 303, 307, 308].includes(response.status));
  const location = response.headers.get("location") ?? "";
  assert.match(location, /^http:\/\/localhost\/app\?modo=demonstracao$/);
  assert.doesNotMatch(location, /site-malicioso/);
});

test("renders the authenticated product home", async () => {
  const response = await render("/app");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Stella Maris/);
  assert.match(html, /Condição atual/);
  assert.match(html, /Curva e extremos/);
  assert.match(html, /icon-waves/);
  assert.match(html, /Sair da conta/);
});

test("renders the core product journeys", async () => {
  const expectations = [
    ["/mapa", [/Mapa de sessões/, /Praia do Flamengo/, /Stella Maris/, /Imagem editorial QuiPraia/]],
    ["/comparar", [/Comparar praias/, /Jaguaribe/, /\+12h/, /quipraia-jaguaribe-v1\.jpg/]],
    ["/praias/stella-maris", [/Stella Maris/, /Janela da sessão/, /Ondas/, /Período/, /Vento/, /Maré/, /Explore a costa/]],
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
