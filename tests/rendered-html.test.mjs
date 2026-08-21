import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test, { after, before } from "node:test";

// Next.js has no equivalent of the previous Vinext/Cloudflare worker import
// (`dist/server/index.js`). Instead this suite builds and starts a real
// `next start` server once, then exercises it over HTTP for every journey,
// as suggested by handoff/claude/MASTER-PROMPT.md.
const PORT = process.env.TEST_PORT || "3100";
const BASE_URL = `http://127.0.0.1:${PORT}`;

let serverProcess;

function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const response = await fetch(url, { headers: { accept: "text/html" } });
        if (response.ok || response.status < 500) {
          resolve();
          return;
        }
      } catch {
        // server not ready yet
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url} to respond`));
        return;
      }
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

before(async () => {
  serverProcess = spawn("npx", ["next", "start", "-p", PORT], {
    cwd: new URL("..", import.meta.url),
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  });

  let startupOutput = "";
  serverProcess.stdout.on("data", (chunk) => {
    startupOutput += chunk.toString();
  });
  serverProcess.stderr.on("data", (chunk) => {
    startupOutput += chunk.toString();
  });

  serverProcess.on("exit", (code) => {
    if (code !== null && code !== 0) {
      console.error("next start exited early:\n", startupOutput);
    }
  });

  await waitForServer(`${BASE_URL}/`);
});

after(() => {
  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill("SIGTERM");
  }
});

async function render(path = "/") {
  return fetch(`${BASE_URL}${path}`, {
    headers: { accept: "text/html" },
    redirect: "manual",
  });
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
  assert.match(location, /^http:\/\/127\.0\.0\.1:\d+\/app\?modo=demonstracao$/);
  assert.doesNotMatch(location, /site-malicioso/);
});

test("renders the authenticated product home", async () => {
  const response = await render("/app");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Stella Maris/);
  assert.match(html, /Condição atual/);
  assert.match(html, /Curva modelada/);
  assert.match(html, /icon-waves/);
  assert.match(html, /Sair da conta/);
});

test("renders the core product journeys", async () => {
  const expectations = [
    ["/mapa", [/Mapa de sessões/, /Praia do Flamengo/, /Stella Maris/, /Imagem editorial QuiPraia/]],
    ["/comparar", [/Comparar praias/, /Jaguaribe/, /\+12h/, /quipraia-jaguaribe-v1\.jpg/]],
    ["/praias/stella-maris", [/Stella Maris/, /Evolução do nível do mar/, /Ondas/, /Período/, /Vento/, /Nível do mar/, /Explore a costa/]],
    ["/comunidade", [/Relatar condição/, /De quem está na água/, /Pulso da comunidade/]],
    ["/perfil", [/Praias favoritas/, /Melhor janela/, /Colaborador/]],
  ];

  for (const [path, patterns] of expectations) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render successfully`);
    const html = await response.text();
    for (const pattern of patterns) assert.match(html, pattern);
    assert.doesNotMatch(html, /—/, `${path} should not use em dashes`);
  }
});

test("renders plans and administration without insecure demo credentials", async () => {
  const plans = await render("/planos");
  assert.equal(plans.status, 200);
  const plansHtml = await plans.text();
  assert.match(plansHtml, /R\$ 9,90/);
  assert.match(plansHtml, /Quero ser Colaborador/);
  assert.match(plansHtml, /cobrança será ativada/i);

  const admin = await render("/admin");
  assert.equal(admin.status, 200);
  const adminHtml = await admin.text();
  assert.match(adminHtml, /Visão geral/);
  assert.match(adminHtml, /Praias ativas/i);
  assert.doesNotMatch(adminHtml, /adm\*123|adm@ondai|NEXT_PUBLIC_DEMO_ADMIN/i);
});

test("does not render em dashes in any principal journey", async () => {
  for (const path of ["/", "/app", "/mapa", "/comparar", "/comunidade", "/perfil", "/planos", "/admin", "/entrar", "/cadastro"]) {
    const response = await render(path);
    const html = await response.text();
    assert.doesNotMatch(html, /—/, `${path} should not use em dashes`);
  }
});
