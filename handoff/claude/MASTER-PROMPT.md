# Prompt mestre definitivo para o Claude

## Sua função

Você é o engenheiro principal responsável por transformar o repositório existente da QuiPraia em um produto funcional, conectado ao Supabase e publicável na Vercel.

O produto, a marca, o design system e as telas já estão aprovados e implementados. Sua tarefa não é criar outro site, reinterpretar o layout ou reiniciar o projeto. Sua tarefa é preservar o visual atual, concluir a infraestrutura externa, migrar o runtime para Next.js nativo, testar e publicar um preview seguro.

Trabalhe com autonomia dentro do repositório. Pare somente quando precisar de conta externa, segredo, permissão, decisão comercial ou ação irreversível do proprietário.

## Resultado esperado

Entregar a QuiPraia com:

1. Next.js App Router nativo e compatível com Vercel.
2. Todas as telas atuais preservadas visualmente.
3. Supabase Auth e Postgres funcionando.
4. Login por Google ou e-mail e senha.
5. Perfil, favoritas, alertas, comunidade e administração persistindo dados.
6. Previsão modelada, gráficos e mapa funcionando.
7. Admin protegido por `profiles.role = 'admin'`.
8. Preview publicado na Vercel.
9. Páginas legais, central de privacidade e controles LGPD implementados.
10. Testes, documentação e relatório final completos.
11. Produção e cobrança ativadas somente depois de autorização explícita.

## Contexto factual do repositório

- Diretório do projeto: raiz deste repositório.
- Baseline funcional: commit `53318a0`.
- Interface validada localmente em `http://localhost:3001`.
- Oito testes de jornada aprovados no baseline.
- Auditoria de dependências de produção no baseline: zero vulnerabilidades.
- Modo sem Supabase: demonstração local.
- Modo com Supabase: autenticação e persistência reais.
- Pagamentos: fundação de dados pronta, checkout ainda não implementado.
- Plataforma de publicação desejada: Vercel.

## Descoberta crítica de infraestrutura

O repositório usa atualmente `vinext`, Vite, Wrangler e plugin Cloudflare. Esse runtime foi útil para prototipagem, mas não deve ser publicado diretamente como um projeto Vercel.

Antes de qualquer deploy, migre o projeto para Next.js nativo.

Sinais do runtime atual:

- `package.json` usa `vinext dev`, `vinext build` e `vinext start`.
- `vite.config.ts` carrega `vinext`, `@openai/sites-vite-plugin` e `@cloudflare/vite-plugin`.
- `worker/index.ts` é um entrypoint Cloudflare.
- `next-env.d.ts` importa `vinext/types`.
- Os testes atuais importam `dist/server/index.js`.
- `MapExperience.tsx` usa worker MapLibre com sufixo Vite `?worker&url`.

Não faça deploy enquanto esses pontos não forem migrados e um `next build` nativo não passar.

## Leitura obrigatória antes de editar

Leia integralmente, nesta ordem:

1. `handoff/README.md`
2. `handoff/10-IMPLEMENTATION-STATUS.md`
3. `handoff/claude/MASTER-PROMPT.md`
4. `handoff/claude/VERCEL-SUPABASE-RUNBOOK.md`
5. `handoff/claude/FINAL-CHECKLIST.md`
6. `handoff/11-LEGAL-LGPD.md`
7. `handoff/01-PRD-MVP.md`
8. `handoff/02-DESIGN-SYSTEM-LOCK.md`
9. `handoff/03-INFORMATION-ARCHITECTURE.md`
10. `handoff/04-TECHNICAL-ARCHITECTURE.md`
11. `handoff/05-DATA-APIS.md`
12. `handoff/06-DATABASE-SCHEMA.md`
13. `handoff/07-DEVELOPER-HANDOFF.md`
14. `handoff/09-TEST-PLAN.md`
15. `PAGAMENTOS.md`
16. `SETUP-TESTE-GRATUITO.md`
17. `design-system/tokens.json`
18. todos os arquivos de `design-approvals/`

Depois da leitura, audite o código existente antes de propor alterações.

## Regras invioláveis da marca

- Marca oficial: QuiPraia, direção 3C Performance.
- Não redesenhar a marca.
- Não gerar nova logo.
- Não vetorizar novamente os símbolos.
- Não trocar proporções, inclinação ou detalhe Coral.
- Usar somente os SVGs de `public/brand/final/`.
- Logo principal usada nas telas atuais: `quipraia-3c-wordmark-dark-approved.svg`.
- Símbolo: `quipraia-3c-symbol-dark-approved.svg`.
- Lockup: `quipraia-3c-lockup-dark-approved.svg`.
- Não substituir ícones marinhos por emojis, clipart ou outra biblioteca.
- Sprite oficial: `public/handoff-assets/quipraia-icons.svg`.
- Fonte de títulos e métricas: Sora 600 ou 700.
- Fonte de interface e dados: Inter 500, 600 ou 700.
- Não usar tipografia cursiva.
- Não usar travessão em textos de interface, documentação ou relatório.

## Tokens bloqueados

| Token | Valor | Uso |
|---|---|---|
| Midnight | `#0B1D2D` | Fundo principal |
| Midnight Deep | `#081824` | Sidebar e contraste |
| Surface | `#102638` | Cards |
| Surface Raised | `#132F42` | Banners e elevação |
| Seafoam | `#9FD3C6` | Dado positivo, seleção e ícones |
| Coral | `#FF6B57` | CTA, horário atual e atenção |
| Foam | `#F4F6F7` | Títulos e conteúdo principal |
| Silver Blue | `#6B8194` | Metadados e estados secundários |

Coral não representa qualidade do surf. Qualidade deve combinar texto, forma e Seafoam.

## Conteúdo obrigatório

- Frase principal: “Qual praia hoje?”
- Linha de apoio: “Swell · Maré · Vento”
- Banner: “Anuncie aqui. Fortaleça o movimento surf.”
- Plano Gratuito: R$ 0.
- Plano Colaborador: R$ 9,90 por mês.
- Login: Google ou e-mail e senha.
- Não implementar login Apple.
- Público inicial: surfistas em Salvador.
- Fotografias atuais são editoriais e provisórias até licenciamento.
- Dados modelados devem informar fonte, horário e limitação de navegação.

## Rotas que já existem

- `/`: hotsite.
- `/entrar`: login.
- `/cadastro`: cadastro.
- `/recuperar-senha`: recuperação.
- `/nova-senha`: redefinição.
- `/auth/callback`: callback do Supabase.
- `/auth/signout`: logout.
- `/app`: home autenticada.
- `/mapa`: mapa de sessões.
- `/comparar`: comparação de praias.
- `/praias/[slug]`: detalhes da praia.
- `/comunidade`: relatos.
- `/perfil`: conta e preferências.
- `/planos`: Gratuito e Colaborador.
- `/admin`: operação protegida.
- `/api/forecast`: previsão normalizada.
- `/privacidade`: Política de Privacidade.
- `/termos`: Termos de Uso.
- `/cookies`: Política de Cookies.
- `/diretrizes-da-comunidade`: regras de publicação e moderação.
- `/assinatura-e-cancelamento`: condições comerciais.
- `/politica-de-anuncios`: regras de publicidade.
- `/seguranca-e-previsoes`: limitações dos dados e segurança.
- `/privacidade/solicitacao`: exercício dos direitos do titular.
- `/configuracoes/privacidade`: preferências e consentimentos.

As rotas legais ainda não existentes devem ser criadas. Nenhuma rota atual deve desaparecer sem justificativa e aprovação.

## Praias atuais

Preserve as dez praias e suas coordenadas em `app/lib/beaches.ts`:

1. Praia do Flamengo.
2. Stella Maris.
3. Itapuã.
4. Piatã.
5. Jaguaribe.
6. Patamares e Pituaçu.
7. Boca do Rio.
8. Amaralina.
9. Buracão.
10. Porto da Barra.

Não reorganize praias por posição visual manual. O mapa deve usar latitude e longitude reais.

## Dados e integrações atuais

- Supabase: Auth, Postgres e RLS.
- Open-Meteo Marine: ondas, período, direção e nível do mar modelado.
- Open-Meteo Weather: vento.
- MapLibre GL JS: mapa interativo.
- OpenStreetMap: tiles do piloto com atribuição visível.
- Vercel: destino de preview e produção.

O OpenStreetMap público e a Open-Meteo gratuita são adequados para piloto de baixo tráfego e avaliação. Antes de monetizar, registre a necessidade de licença ou provedor comercial.

## Banco já preparado

Fonte principal: `supabase/schema.sql`.

Migrações incrementais:

- `002_profile_community_hardening.sql`
- `003_admin_operations.sql`
- `004_billing_foundation.sql`

Tabelas principais:

- `profiles`
- `favorites`
- `reports`
- `report_confirmations`
- `beach_settings`
- `ads`
- `subscriptions`
- `plan_interests`

Funções administrativas:

- `is_admin()`
- `moderate_report()`
- `delete_report_admin()`

Não coloque `service_role` no navegador. Não permita que o usuário altere `role` ou `plan` pelo cliente.

## Fase 0: auditoria e proteção do trabalho existente

1. Execute `git status --short`.
2. Preserve alterações e arquivos do proprietário.
3. Não adicione nem exclua os quatro PNGs `candidate` em `public/brand/approval/` sem autorização.
4. Registre screenshots das rotas principais antes da migração.
5. Rode o baseline atual: lint, testes e build.
6. Crie um plano de migração em etapas pequenas.
7. Faça commits separados por fase.

Se o baseline falhar, diagnostique antes de migrar.

## Fase 1: migrar Vinext para Next.js nativo

### Dependências e scripts

1. Instale uma versão estável do Next.js compatível com React 19.
2. Substitua scripts por:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "typecheck": "tsc --noEmit",
  "lint": "eslint ."
}
```

3. Remova dependências exclusivas do runtime de protótipo quando não forem mais usadas:

- `vinext`
- `@cloudflare/vite-plugin`
- `@openai/sites-vite-plugin`
- `@vitejs/plugin-react`
- `@vitejs/plugin-rsc`
- `react-server-dom-webpack` direto
- `vite`
- `wrangler`

4. Remova ou arquive configurações exclusivas de Cloudflare:

- `vite.config.ts`
- `worker/`
- `.openai/hosting.json`
- exemplos D1 que não façam parte do produto.

5. Não remova Supabase, MapLibre, componentes, CSS, imagens, testes úteis ou documentação.

### Tipos e configuração

1. Troque `next-env.d.ts` pelo formato padrão gerado pelo Next.js.
2. Preserve `next.config.ts` simples, sem configuração experimental desnecessária.
3. Mantenha `proxy.ts`, pois o Next.js atual usa esse padrão para proteção de rotas.
4. Confirme que Server Components e Client Components respeitam as fronteiras do App Router.
5. Não converta tudo para Client Components.

### MapLibre no Next.js

O import atual com `?worker&url` é específico do Vite e precisa ser removido.

Implemente o padrão compatível com Next.js:

1. Crie script para copiar estes arquivos do pacote MapLibre para `public/maplibre/`:
   - `maplibre-gl-worker.mjs`
   - `maplibre-gl-shared.mjs`
2. Execute o script em `predev` e `prebuild`.
3. Em `MapExperience.tsx`, use `setWorkerUrl('/maplibre/maplibre-gl-worker.mjs')`.
4. Garanta que o CSS do MapLibre seja carregado globalmente no root layout ou em `globals.css`.
5. Teste mapa, marcadores, seletor, zoom, atribuição e fallback sem WebGL.

### Testes

Os testes atuais carregam `dist/server/index.js`, que pertence ao Vinext. Substitua essa estratégia.

Use uma destas opções, priorizando simplicidade e estabilidade:

1. Playwright contra `next dev` ou `next start`.
2. Testes de componentes e funções com Vitest, somados a E2E Playwright.
3. Script que inicia `next start` após `next build`, aguarda a porta e executa requisições HTTP.

Preserve as oito jornadas atuais e o teste que impede travessão.

### Critério de saída da Fase 1

Só avance quando todos passarem:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

O build deve ser do Next.js, sem Vinext, Vite ou Wrangler.

## Fase 2: conectar o Supabase real

1. Pergunte se o projeto Supabase está vazio ou já possui tabelas.
2. Se estiver vazio, execute `supabase/schema.sql` uma única vez pelo SQL Editor.
3. Se já existir baseline anterior, aplique somente migrações pendentes na ordem.
4. Não execute SQL destrutivo sem confirmação.
5. Configure as variáveis locais sem exibir valores em logs:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAP_TILE_URL=https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

6. Ative e-mail e senha no Supabase Auth.
7. Configure Google OAuth usando Client ID e Client Secret fornecidos pelo proprietário.
8. Nunca solicite que segredos sejam colados em arquivo versionado ou no chat.
9. Configure URLs de callback local, preview e produção.
10. Crie uma conta normal do proprietário.
11. Promova essa conta a admin via SQL seguro usando o UUID ou e-mail fornecido no momento da operação.

### Fluxos obrigatórios no Supabase real

- Cadastro por e-mail.
- Confirmação de e-mail, se habilitada.
- Login por e-mail e senha.
- Login Google.
- Logout.
- Recuperação de senha.
- Redefinição de senha.
- Redirecionamento seguro por `returnTo`.
- Usuário comum bloqueado no `/admin`.
- Admin autorizado no `/admin`.
- Edição de perfil persistente.
- Favoritas persistentes e limite de cinco.
- Alertas persistentes.
- Relato persistente.
- Confirmação de relato persistente.
- Moderação administrativa.
- Ativação de praia.
- Cadastro de anúncio.
- Lista de interesse no plano Colaborador.

### RLS obrigatória

Crie testes com pelo menos dois usuários e um admin. Confirme que:

- Usuário A não altera perfil ou favoritas do usuário B.
- Usuário não altera `role` ou `plan`.
- Usuário não modera relatos.
- Usuário não gerencia anúncios ou praias.
- Admin consegue operar somente pelas políticas e funções previstas.
- Anônimo não lê tabelas protegidas.
- `service_role` não aparece no bundle.

## Fase 3: revisão funcional e visual

Não redesenhe. Compare o Next.js migrado com as telas anteriores.

Revise em 375, 768, 1280 e 1440 px:

- hotsite;
- entrar e cadastrar;
- home autenticada;
- mapa;
- comparação;
- praia com abas Visão geral, Maré, Ondas, Vento e Relatos;
- comunidade;
- perfil editável;
- planos;
- admin e suas seções.

Confirme:

- logo correta em todas as telas;
- Sora e Inter carregadas;
- tokens 3C preservados;
- ícones canônicos;
- fotografias presentes;
- sem overflow horizontal;
- foco visível;
- navegação por teclado;
- estados loading, vazio, erro e sucesso;
- gráficos com unidade e fonte;
- ondas com altura, pico, período e direção;
- vento com velocidade e direção;
- nível do mar nomeado como modelado;
- atribuição OpenStreetMap visível;
- banner de anúncio com o texto aprovado;
- R$ 9,90 em todas as ocorrências do Colaborador;
- nenhum travessão em textos.

## Fase 4: preparar a Vercel

Antes da Vercel, implemente o pacote de `handoff/11-LEGAL-LGPD.md`:

1. Crie todas as páginas legais e seus links no rodapé, cadastro, login e planos.
2. Implemente banner de cookies com aceitar opcionais, recusar opcionais e configurar.
3. Bloqueie cookies não essenciais antes da escolha válida.
4. Registre versão e aceite de documentos.
5. Separe consentimentos opcionais do aceite necessário para a conta.
6. Crie central de privacidade, exportação, correção e exclusão.
7. Crie protocolo e fluxo administrativo para solicitações de titulares.
8. Implemente matriz de retenção e runbook de incidentes.
9. Não publique placeholders jurídicos. Solicite ao proprietário os dados faltantes antes da produção.
10. Trate as minutas como conteúdo que precisa de revisão jurídica antes de cobrança e operação comercial.

Depois disso, prepare a Vercel.

Use preferencialmente integração Git com deploy automático de preview.

1. Confirme que o repositório está em GitHub, GitLab ou Bitbucket.
2. Importe o repositório na Vercel.
3. Defina o framework como Next.js.
4. Use a raiz do repositório como Root Directory.
5. Não configure output estático, pois existem rotas dinâmicas e autenticação.
6. Cadastre variáveis separadamente para Development, Preview e Production.
7. Nunca versione `.env.local`, tokens da Vercel ou segredos OAuth.
8. Publique primeiro um preview.
9. Rode a validação completa no preview.
10. Só promova para produção após autorização explícita do proprietário.

Variáveis públicas esperadas:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_MAP_TILE_URL
```

Se pagamento for implementado depois, as chaves secretas devem ser server-only.

### Validação do preview

- Página inicial responde 200.
- Assets da marca respondem 200.
- `/api/forecast` responde ou apresenta fallback controlado.
- Callback Supabase retorna ao domínio correto.
- Login e logout funcionam.
- Rotas protegidas redirecionam.
- Admin bloqueia usuário comum.
- Nenhum segredo aparece em HTML, bundle ou logs.
- Console sem erros.
- Mapa carrega e mantém atribuição.
- Teste mobile real ou emulação 375 px.

## Fase 5: produção e operação

Não ativar automaticamente:

- deploy de produção;
- cobrança;
- anúncios comerciais;
- e-mails para usuários;
- chaves de pagamento;
- exclusão de dados;
- mudanças de DNS.

Essas ações exigem autorização no momento da execução.

Antes de monetizar, documente:

- licença comercial da previsão;
- provedor de tiles para tráfego comercial;
- plano de hospedagem compatível com uso comercial;
- Termos de Uso;
- Política de Privacidade;
- Política de Cookies;
- Diretrizes da Comunidade;
- Política de anúncios;
- canal de direitos dos titulares;
- dados do controlador e contato de privacidade;
- canal de suporte;
- SMTP transacional;
- provedor de pagamentos;
- rotina de backup e monitoramento.

## Pagamentos

Leia `PAGAMENTOS.md`.

O banco já possui `subscriptions` e `plan_interests`. Não marque assinatura como ativa pelo navegador.

Quando o proprietário escolher o provedor:

1. Use checkout hospedado ou embutido do provedor.
2. Calcule o preço no servidor ou use Price ID fixo seguro.
3. Verifique assinatura do webhook usando corpo bruto.
4. Faça processamento idempotente por ID do evento.
5. Atualize `subscriptions` e `profiles.plan` apenas no backend.
6. Teste criação, renovação, atraso, cancelamento e reembolso.
7. Não ative cobrança real sem autorização.

## Princípios de implementação

- Preserve o trabalho existente.
- Prefira alterações pequenas e verificáveis.
- Não misture migração de runtime com redesign.
- Não use mocks como se fossem dados reais.
- Não esconda falhas de API.
- Não silencie erros de TypeScript ou lint para concluir o deploy.
- Não use `dangerouslySetInnerHTML` para dados de usuário.
- Não registre tokens, senhas, chaves ou conteúdo sensível.
- Não faça alterações destrutivas no banco sem backup e confirmação.
- Não use `git reset --hard`.
- Não mexa em arquivos candidatos do proprietário.

## Commits sugeridos

1. `chore: migrate runtime to native nextjs`
2. `test: replace vinext rendering tests`
3. `feat: connect live supabase project`
4. `fix: close visual and accessibility gaps`
5. `docs: add vercel production runbook`

Cada commit deve passar build e testes relevantes.

## Definição de pronto

O trabalho só está pronto quando:

- não há dependência de Vinext ou Cloudflare no runtime de produção;
- `next build` passa;
- lint passa sem erros;
- typecheck passa;
- testes passam;
- Supabase real funciona;
- RLS foi validada;
- Google e e-mail funcionam;
- mapa e previsão funcionam;
- admin está protegido;
- páginas legais e controles LGPD estão implementados;
- cookies opcionais não são carregados antes da escolha válida;
- exportação e exclusão de conta foram testadas;
- telas mantêm o visual aprovado;
- preview Vercel está acessível;
- documentação está atualizada;
- ações que dependem do proprietário estão listadas.

## Relatório final obrigatório

Entregue ao final:

1. resumo do que foi alterado;
2. commits criados;
3. dependências removidas e adicionadas;
4. rotas validadas;
5. tabelas e migrações aplicadas;
6. testes executados e resultados;
7. URL do preview;
8. status do Supabase e Google OAuth;
9. riscos e limitações;
10. passos manuais restantes;
11. plano de rollback;
12. confirmação de que a identidade 3C não foi alterada.
13. status das páginas legais, consentimentos e solicitações LGPD.
14. placeholders jurídicos que ainda exigem dados do proprietário.

## Primeira resposta esperada do Claude

Antes de editar, responda com:

1. confirmação de que leu os arquivos obrigatórios;
2. resumo do estado atual;
3. reconhecimento de que o runtime Vinext precisa ser migrado;
4. plano em fases;
5. arquivos que pretende alterar na Fase 1;
6. confirmação de que não modificará o design aprovado nem os PNGs candidatos.

Em seguida, comece a auditoria e avance autonomamente até encontrar uma dependência externa real.
