# Arquitetura técnica recomendada

## Nota sobre a implementação atual

O código existente usa Vinext, Vite e um worker Cloudflare. Esta documentação descreve a arquitetura de destino. Antes da Vercel, migrar o runtime para Next.js nativo com App Router, preservando componentes, CSS, tokens, rotas e comportamento existentes. Não reconstruir a interface nem introduzir um novo tema.

## Stack

- Next.js com App Router, TypeScript e renderização híbrida.
- CSS e componentes próprios com tokens do `design-tokens.json`, sem tema visual genérico. Tailwind só deve ser adotado se houver benefício comprovado e sem reescrever desnecessariamente o sistema aprovado.
- Supabase para Postgres, Auth, Storage, Edge Functions e Cron.
- MapLibre GL JS para o mapa.
- Vercel para previews e hospedagem conforme licença do plano.
- Stripe Checkout/Billing para assinatura quando a monetização for ativada.

## Diagrama lógico

```text
Browser/PWA
  ├─ Hotsite e autenticação
  ├─ App autenticado
  └─ Admin protegido
        │
        ▼
Next.js / Server Actions / Route Handlers
        │
        ├─ Supabase Auth + RLS
        ├─ Postgres + PostGIS
        ├─ Storage de avatares, relatos e anúncios
        ├─ Edge Function de ingestão
        └─ Stripe webhooks
              ▲
              │
Supabase Cron ─┴─ Open-Meteo Marine/Weather
```

## Ingestão e cache

1. Cron chama uma Edge Function a cada 60 minutos no teste.
2. A função busca todas as praias ativas em uma única execução e agrupa coordenadas quando o provedor permitir.
3. Respostas brutas são validadas, normalizadas e gravadas em `forecast_runs` e `forecast_points`.
4. A aplicação lê apenas o banco, não chama a API marinha do navegador.
5. Se a sincronização falhar, mantém o último conjunto válido e exibe sua idade.
6. Alertas administrativos surgem após duas falhas ou 120 minutos sem atualização.

## Session Pulse

É uma síntese editorial, não uma medição científica. V1 calcula uma pontuação interna a partir de:

- altura dentro da faixa configurada para a praia;
- período;
- compatibilidade da direção do swell;
- intensidade/direção do vento;
- estágio da maré;
- confiança/frescor do dado.

O algoritmo deve ser configurável por praia, versionado e acompanhado por texto (“Bom”, “Regular”, “Fraco”). Não apresentar promessa de segurança.

## Segurança

- Todas as tabelas públicas com RLS.
- `service_role` somente no backend/Edge Functions.
- Função administrativa em claim ou tabela separada, nunca por e-mail no frontend.
- Senhas gerenciadas pelo Supabase Auth; nenhuma senha no repositório.
- Upload com tipo, tamanho e dimensão limitados; remover metadados EXIF.
- Webhooks Stripe verificados por assinatura e idempotência.
- Auditoria para moderação, planos, praias e campanhas.

## Ambientes

- Local: Supabase local/Mailpit e dados de demonstração.
- Preview: projeto de teste, sem cobrança real e APIs em modo de avaliação.
- Produção: domínio oficial, SMTP, backups, provedor comercial de previsão e plano de hospedagem compatível com monetização.
