# Prompt mestre para implementar a QuiPraia

Você implementará a QuiPraia a partir de um pacote de design e produto já aprovado. Não redesenhe a marca, não invente outro design system e não substitua os ícones.

## Antes de programar

Leia integralmente, nesta ordem:

1. `handoff/README.md`
2. `handoff/01-PRD-MVP.md`
3. `handoff/02-DESIGN-SYSTEM-LOCK.md`
4. `handoff/03-INFORMATION-ARCHITECTURE.md`
5. `handoff/04-TECHNICAL-ARCHITECTURE.md`
6. `handoff/05-DATA-APIS.md`
7. `handoff/06-DATABASE-SCHEMA.md`
8. `handoff/07-DEVELOPER-HANDOFF.md`
9. `handoff/09-TEST-PLAN.md`
10. todos os arquivos em `design-approvals/`

## Regras invioláveis

- Marca: QuiPraia 3C Performance; importar SVGs de `public/brand/final`.
- Usar Sora para títulos/métricas e Inter para interface/dados.
- Usar somente tokens de `handoff/design-tokens.json`.
- Usar os símbolos de `handoff/assets/quipraia-icons.svg`; não procurar outra biblioteca para os ícones marinhos.
- Manter Midnight, Foam, Seafoam, Coral e Silver Blue nos papéis definidos.
- Coral é CTA/Agora/atenção; não representa qualidade.
- Cadastro oferece Google ou e-mail/senha. Não implementar Apple.
- Plano Colaborador custa R$ 9,90/mês.
- Inserir os slots “Anuncie aqui. Fortaleça o movimento surf.” nos layouts definidos.
- Não usar dados falsos como se fossem reais. Seeds e mocks devem exibir “Dados de demonstração”.
- Não hardcode credencial administrativa. Criar mecanismo seguro de promoção por UUID/servidor.
- Não alterar o site publicado até passar por build, testes e revisão visual local.

## Stack alvo

- Next.js App Router + TypeScript.
- Tailwind CSS usando os tokens aprovados.
- Supabase Auth/Postgres/Storage/Edge Functions/Cron com RLS.
- MapLibre GL JS com provedor de tiles compatível.
- Open-Meteo apenas no modo de avaliação; acesso sempre pelo backend e com cache.
- Stripe Checkout/Billing somente quando chaves de teste estiverem configuradas.

## Método de trabalho

1. Audite o repositório e preserve arquivos do proprietário.
2. Crie um plano de implementação por fases.
3. Implemente primeiro fundações e shell.
4. Faça cada fluxo funcionar ponta a ponta antes de abrir o próximo.
5. Use migrations versionadas e RLS desde o início.
6. Crie testes unitários, integração e E2E conforme `09-TEST-PLAN.md`.
7. Rode lint, typecheck, testes, build e screenshots nos breakpoints.
8. Compare visualmente com os PNGs aprovados e corrija divergências.
9. Documente variáveis de ambiente em `.env.example`, sem segredos.
10. Entregue relatório final com rotas, testes, limitações e passos manuais.

## Fases sugeridas

- Fase A: tokens, fontes, assets, componentes e shell responsivo.
- Fase B: hotsite, login, cadastro e onboarding.
- Fase C: banco, seeds de praias, ingestão e normalização.
- Fase D: home, praia, gráficos, mapa e comparação.
- Fase E: comunidade, perfil, planos e anúncios.
- Fase F: admin, estados, acessibilidade, testes e deploy de preview.

Se um detalhe estiver ausente, escolha a solução que reutiliza componentes existentes e registre a decisão. Não introduza nova linguagem visual.

