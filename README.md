# QuiPraia

QuiPraia é uma plataforma web responsiva para surfistas compararem praias, ondas, maré, vento e relatos da comunidade. O piloto começa em Salvador e foi planejado para expansão geográfica.

## Estado atual

- Interface e design system 3C Performance aprovados.
- Hotsite, autenticação, produto, mapa, praias, comunidade, perfil, planos e admin implementados no protótipo.
- Previsões Open-Meteo e mapa MapLibre conectados.
- Schema Supabase, RLS e migrações preparados.
- Pacote legal e LGPD especificado.
- Runtime atual em Vinext e Vite.
- Runtime de destino em Next.js nativo para publicação na Vercel.

Não publicar diretamente antes da migração de runtime e dos testes descritos no handoff.

## Início para desenvolvimento com Claude

O Claude deve carregar automaticamente [CLAUDE.md](CLAUDE.md). O proprietário também pode copiar [PROMPT-PARA-CLAUDE.md](PROMPT-PARA-CLAUDE.md).

Documentos principais:

1. [Prompt mestre](handoff/claude/MASTER-PROMPT.md)
2. [Estado da implementação](handoff/10-IMPLEMENTATION-STATUS.md)
3. [Design system bloqueado](handoff/02-DESIGN-SYSTEM-LOCK.md)
4. [Pacote legal e LGPD](handoff/11-LEGAL-LGPD.md)
5. [Runbook Supabase e Vercel](handoff/claude/VERCEL-SUPABASE-RUNBOOK.md)
6. [Checklist final](handoff/claude/FINAL-CHECKLIST.md)

## Desenvolvimento local no baseline atual

Requisitos:

- Node.js 22.13 ou superior
- npm

```bash
npm install
npm run dev
```

O comando ainda usa Vinext até a primeira fase do prompt mestre. Depois da migração, deve usar `next dev`.

## Variáveis

Copie `.env.example` para `.env.local` e preencha apenas no ambiente local. Nunca envie chaves ou senhas ao Git.

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_MAP_TILE_URL
```

Sem Supabase, o protótipo pode exibir dados de demonstração. Com Supabase configurado, autenticação e persistência passam a ser reais.

## Identidade bloqueada

- Marca: QuiPraia 3C Performance
- Títulos e métricas: Sora
- Interface e dados: Inter
- Cores: Midnight, Foam, Seafoam, Coral e Silver Blue
- Ativos oficiais: `public/brand/final/`
- Visuais aprovados: `design-approvals/`

Não redesenhar a marca, trocar a tipografia, substituir ícones ou introduzir templates genéricos.

## Publicação

O fluxo aprovado é:

1. migrar para Next.js nativo;
2. executar lint, typecheck, testes e build;
3. conectar Supabase e Google OAuth;
4. validar RLS e fluxos LGPD;
5. publicar Preview Deployment na Vercel;
6. revisar desktop e celular;
7. promover para produção somente após aprovação explícita.

Cobrança real e anúncios comerciais permanecem desativados até decisão do proprietário e revisão jurídica.
