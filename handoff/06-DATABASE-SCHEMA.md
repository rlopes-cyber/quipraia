# Modelo de dados e segurança

## Tabelas

| Tabela | Finalidade |
|---|---|
| `profiles` | nome, avatar, nível, cidade, onboarding e função |
| `beaches` | praia, slug, coordenada, orientação, status e configuração |
| `beach_photos` | fotos, autoria/licença, posição e destaque |
| `favorites` | relação usuário–praia |
| `alert_preferences` | faixa desejada e canais por usuário/praia |
| `forecast_runs` | execução do provedor, fonte, horário e status |
| `forecast_points` | série horária normalizada por praia |
| `session_scores` | Session Pulse calculado e versão do algoritmo |
| `reports` | relatos, condição, lotação, texto, foto e moderação |
| `report_confirmations` | confirmações por usuário |
| `report_flags` | denúncias e motivo |
| `plans` | catálogo Gratuito/Colaborador |
| `subscriptions` | estado espelhado do Stripe |
| `ad_campaigns` | anunciante, período, destino e segmentação |
| `ad_creatives` | imagem e copy por campanha |
| `ad_events` | impressão/clique agregado |
| `integration_health` | estado e última sincronização |
| `audit_log` | ações administrativas imutáveis |

## Campos essenciais de previsão

`forecast_points`:

- `beach_id uuid`
- `forecast_time timestamptz`
- `wave_height_m numeric`
- `wave_period_s numeric`
- `wave_direction_deg numeric`
- `swell_height_m numeric null`
- `swell_period_s numeric null`
- `swell_direction_deg numeric null`
- `wind_speed_kmh numeric`
- `wind_gust_kmh numeric null`
- `wind_direction_deg numeric`
- `sea_level_m numeric null`
- `sea_surface_temp_c numeric null`
- `provider text`
- `provider_run_at timestamptz`
- `ingested_at timestamptz`
- chave única: `(beach_id, forecast_time, provider)`

## RLS obrigatória

- `profiles`: usuário lê/edita o próprio; admin lê/modera conforme função.
- `favorites` e `alert_preferences`: somente proprietário.
- `beaches`, previsões e campanhas ativas: leitura para autenticados; escrita apenas admin/backend.
- `reports`: autenticados leem aprovados; autor insere e edita enquanto pendente; admin modera.
- `subscriptions`: usuário lê a própria; somente webhook/backend escreve.
- `audit_log`: somente admin lê; somente backend escreve; nenhuma atualização/exclusão pelo cliente.

O Supabase recomenda RLS em toda tabela exposta e alerta que a chave `service_role` nunca pode ir ao frontend. Fontes: [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) e [Securing Data](https://supabase.com/docs/guides/database/secure-data).

## Funções e papéis

- `user`: acesso normal.
- `moderator`: relatos e denúncias.
- `admin`: operação completa.
- Função armazenada em tabela/claim controlada por backend. Nunca promover acesso por comparação de e-mail no cliente.

## Retenção

- Previsão bruta: 30 dias no teste; agregar histórico depois.
- Relatos rejeitados: 90 dias para auditoria.
- Eventos de anúncio: guardar agregados diários, não rastreamento individual desnecessário.
- Auditoria: mínimo 12 meses quando houver operação comercial.

## Privacidade

- Coletar somente nome, e-mail, avatar opcional, nível, cidade e preferências.
- Localização exata não precisa ser persistida para usar o mapa.
- Permitir exportação e exclusão de conta.
- Preparar Termos, Política de Privacidade e base legal de comunicações antes da abertura pública.

