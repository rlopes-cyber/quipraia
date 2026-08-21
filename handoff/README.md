# QuiPraia: pacote de produto e handoff

Este diretório é a fonte de verdade para programar o MVP da QuiPraia. Ele consolida as decisões aprovadas e impede que marca, iconografia ou layout sejam reinterpretados durante a implementação.

Comece por [Estado atual da implementação](10-IMPLEMENTATION-STATUS.md). Esse arquivo separa o que já está pronto do que ainda depende de contas, licenças e credenciais externas.

## Estado das decisões

- Marca oficial: **QuiPraia: direção 3C Performance**.
- Frase principal: **Qual praia hoje?**
- Linha de apoio: **Swell · Maré · Vento**.
- Público inicial: surfistas em Salvador.
- Acesso ao produto: cadastro obrigatório por Google ou e-mail/senha.
- Apple não faz parte do escopo.
- Planos: Gratuito e Colaborador por **R$ 9,90/mês**.
- Publicidade: módulos próprios com “Anuncie aqui. Fortaleça o movimento surf.”
- Plataforma inicial: web responsiva/PWA; aplicativos nativos ficam para uma fase posterior.

## Artefatos

1. [Auditoria visual](00-VISUAL-AUDIT.md)
2. [PRD do MVP](01-PRD-MVP.md)
3. [Design system bloqueado](02-DESIGN-SYSTEM-LOCK.md)
4. [Arquitetura de informação e fluxos](03-INFORMATION-ARCHITECTURE.md)
5. [Arquitetura técnica](04-TECHNICAL-ARCHITECTURE.md)
6. [Fontes de dados, APIs e custos](05-DATA-APIS.md)
7. [Modelo de dados e segurança](06-DATABASE-SCHEMA.md)
8. [Handoff para desenvolvimento](07-DEVELOPER-HANDOFF.md)
9. [Prompt mestre para Claude](claude/MASTER-PROMPT.md)
10. [Plano de testes](09-TEST-PLAN.md)
11. [Estado atual da implementação](10-IMPLEMENTATION-STATUS.md)
12. [Pacote legal e LGPD](11-LEGAL-LGPD.md)
13. [Runbook Supabase e Vercel](claude/VERCEL-SUPABASE-RUNBOOK.md)
14. [Checklist final](claude/FINAL-CHECKLIST.md)
15. [Tokens em JSON](design-tokens.json)
16. [Ícones canônicos](assets/quipraia-icons.svg)
17. [Schema SQL](schema.sql) e [seed geográfico](seed-beaches.sql)

## Visuais aprovados

Os arquivos ficam em `../design-approvals/`. Não alterar os aprovados. Os arquivos com `candidate` compõem o pacote consolidado aguardando revisão final do proprietário.

## Regra de implementação

Antes de escrever código, o desenvolvedor deve ler este README, o bloqueio do design system e o prompt mestre. Se houver conflito, prevalece a tela aprovada mais recente. Não reconstruir logo ou ícones manualmente.

## Nota crítica sobre a publicação

A implementação atual funciona como protótipo em Vinext, Vite e Cloudflare. O destino aprovado é Vercel com Next.js nativo. A migração descrita no prompt mestre deve acontecer antes do primeiro Preview Deployment. O projeto já existente deve ser migrado e preservado, não reconstruído do zero.
