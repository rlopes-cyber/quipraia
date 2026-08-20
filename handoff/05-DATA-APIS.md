# Dados, APIs e viabilidade sem custo inicial

Verificado em 20 de agosto de 2026. Preços e limites devem ser conferidos novamente antes do lançamento.

## Recomendação para o teste

| Necessidade | Serviço | Custo no teste | Observação |
|---|---|---:|---|
| Banco, autenticação, storage e cron | Supabase Free | R$ 0 | suficiente para teste controlado |
| Google login | Supabase Auth + Google Identity | R$ 0 | exige projeto OAuth e URLs autorizadas |
| Ondas e maré modelada | Open-Meteo Marine | R$ 0 | apenas avaliação/não comercial |
| Vento | Open-Meteo Weather | R$ 0 | mesma limitação comercial |
| Mapa | MapLibre GL JS | R$ 0 | biblioteca livre; tiles têm política própria |
| Hospedagem | Vercel Hobby | R$ 0 | somente uso pessoal/não comercial |
| Pagamento | Stripe | sem mensalidade base | tarifa por cobrança quando ativado |
| Anúncios | módulo próprio QuiPraia | R$ 0 | operação manual pelo admin |

## Supabase

O plano Free informa 50 mil usuários ativos mensais, banco de 500 MB, 1 GB de arquivos e 5 GB de egress; projetos gratuitos podem pausar após uma semana sem atividade. Fonte: [Supabase Pricing](https://supabase.com/pricing).

O Supabase suporta login Google na web e autenticação por e-mail/senha. Fontes: [Google Login](https://supabase.com/docs/guides/auth/social-login/auth-google) e [Password Auth](https://supabase.com/docs/guides/auth/passwords).

Limitação importante: o serviço de e-mail embutido é apenas para teste e possui limite baixo; a documentação indica 2 e-mails por hora e recomenda SMTP próprio em produção. Fonte: [Auth rate limits](https://supabase.com/docs/guides/auth/rate-limits).

Jobs recorrentes podem ser executados com Supabase Cron/`pg_cron` chamando Edge Functions. Fonte: [Scheduling Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions).

## Open-Meteo

A Marine API entrega altura, direção e período de ondas/swell, além de `sea_level_height_msl`, temperatura e correntes. A própria documentação alerta que marés/correntes modeladas têm resolução aproximada de 8 km, precisão costeira limitada e não servem para navegação. Fonte: [Open-Meteo Marine API](https://open-meteo.com/en/docs/marine-weather-api).

A API gratuita é destinada a uso não comercial, limitada a 10 mil chamadas diárias e sem SLA. Uso comercial requer assinatura/licença e endpoint de cliente; atribuição dos dados é obrigatória. Fonte: [Open-Meteo Pricing](https://open-meteo.com/en/pricing).

### Decisão

- Usar Open-Meteo para desenvolvimento, teste privado e validação de UX.
- Mostrar “previsão modelada” e horário de atualização.
- Não apresentar a maré como dado de navegação.
- Antes de anúncios ou cobranças, contratar licença comercial ou substituir o provedor.

## Maré alternativa

WorldTides oferece 100 créditos iniciais e dados de alturas/extremos. Porém, a licença padrão restringe compartilhamento/cache por múltiplos usuários; por isso não deve ser adotada em uma arquitetura de cache coletivo sem acordo apropriado. Fontes: [WorldTides Pricing](https://www.worldtides.info/developer) e [API Docs](https://www.worldtides.info/apidocs).

Decisão: manter WorldTides apenas como candidato para teste comparativo de precisão. Para produção, negociar licença ou estudar fonte hidrográfica oficial com autorização explícita; não raspar PDFs da Marinha silenciosamente.

## Mapa

MapLibre GL JS é uma biblioteca TypeScript open source para mapas WebGL. Fonte: [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/).

Os dados do OpenStreetMap são livres, mas os servidores públicos de tiles não são infraestrutura gratuita ilimitada e podem bloquear uso inadequado. Fonte: [OSM Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/).

### Decisão

- Protótipo: MapLibre + tiles OSM sob baixo tráfego, com atribuição e cache conforme política.
- Produção: contratar provedor de tiles, usar serviço OSM compatível ou hospedar tiles.
- Praias ficam em PostGIS com coordenadas revisadas; Google Maps não será fonte primária gratuita.

## Vercel

O plano Hobby é gratuito, mas os termos o restringem a uso pessoal e não comercial. Fonte: [Vercel Fair Use](https://vercel.com/docs/limits/fair-use-guidelines).

### Decisão

- Usar Hobby apenas para desenvolvimento/preview sem receita.
- Antes de ativar assinatura ou publicidade comercial, migrar para Vercel Pro ou hospedagem que permita uso comercial gratuito.

## Stripe e preço de R$ 9,90

A página brasileira informa preço padrão de 3,99% + R$ 0,39 por cartão nacional, sem mensalidade de configuração; Stripe Billing adiciona 0,7% sobre o volume recorrente. Fonte: [Stripe Brasil Pricing](https://stripe.com/br/pricing).

Estimativa simples por assinatura de R$ 9,90: líquido aproximado de R$ 9,05 antes de impostos, reembolsos e outras cobranças. Confirmar a tarifa real exibida na conta Stripe antes do lançamento.

## Publicidade sem plataforma externa

O MVP usa um gerenciador próprio: imagem, título, URL, praias, posição, período e status. O admin aprova e acompanha impressões/cliques básicos. Isso evita custo e dependência de rede de anúncios na fase inicial.

## Limite real do “tudo grátis”

É viável testar com custo de software próximo de zero enquanto não houver operação comercial. Não é sustentável prometer custo zero depois de cobrar assinatura ou vender anúncios: previsão, hospedagem, e-mail e tiles precisam de licenças/infraestrutura adequadas.

