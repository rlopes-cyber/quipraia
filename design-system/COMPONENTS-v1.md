# QuiPraia — componentes v1

## Button

| Variante | Uso | Visual |
|---|---|---|
| Primary | Uma ação principal por contexto | Coral, texto Midnight |
| Secondary | Ação complementar | Midnight, texto Foam |
| Outline | Comparar, filtrar, cancelar | Transparente, borda Midnight |
| Ghost | Ações locais e navegação | Sem fundo |
| Danger | Exclusão e moderação | Danger, confirmação obrigatória |

Tamanhos: `sm 36 px`, `md 44 px`, `lg 52 px`. Estados: default, hover, pressed, focus, loading e disabled. Loading preserva a largura e anuncia `aria-busy`.

## Beach Card

**Função:** permitir comparação rápida entre praias.

Conteúdo obrigatório:

- foto e nome;
- distância ou região;
- Session Pulse com rótulo;
- altura + período;
- vento + direção;
- próxima mudança de maré;
- atualização e fonte;
- favorito e comparação.

Variantes: compacta para mapa, horizontal para comparação e editorial para descoberta. Não esconder unidades nem transformar toda a foto em área clicável sem rótulo acessível.

## Metric Tile

Propriedades: `type`, `value`, `unit`, `direction`, `trend`, `timestamp`, `source`, `confidence`.

Variantes: swell, período, vento, maré, temperatura e chuva. O valor é dominante; ícone e cor são apoio. Dados indisponíveis mostram `—` e a razão, nunca `0`.

## Time Rail

Seletor horizontal de horários: Agora, +3h, +6h, +9h e +12h. Mantém contexto ao trocar praia e sincroniza gráficos, cards e mapa. No teclado, setas movem o horário; Home/End acessam extremos.

## Session Pulse

Barra de cinco segmentos com rótulo obrigatório. Hover/toque abre os fatores: swell, período, vento, maré e confiança da previsão. Não representa qualidade da água nem avaliação de usuários.

## Map Marker

Estados: neutro, favorável, selecionado, com relato recente e indisponível.

- Marcador contém abreviação da praia ou Session Pulse, não a logo completa.
- Selecionado cresce 12% e recebe contorno Foam.
- Agrupamentos indicam quantidade.
- Lista sincronizada funciona como alternativa acessível ao mapa.

## Community Report

Campos: praia, horário observado, tamanho percebido, vento percebido, formação, lotação, foto opcional e comentário curto. Exibe idade do relato e reputação do autor. Fotos passam por moderação.

## Advertisement Banner

Mensagem-base: **“Anuncie aqui. Fortaleça o movimento surf.”**

Variantes: horizontal, card e conteúdo patrocinado. Sempre exibe `Publicidade`; não pode imitar cards de previsão nem interromper gráficos.

## Navigation

- Hotsite: logo, Como funciona, Praias, Comunidade, Planos e Entrar.
- Produto mobile: Hoje, Mapa, Comparar, Comunidade e Perfil.
- Produto desktop: sidebar recolhível com os mesmos destinos.
- Administração: Visão geral, Praias, Relatos, Usuários, Anúncios, Dados e Configurações.

## Feedback e sistema

| Estado | Tratamento |
|---|---|
| Loading | Skeleton com dimensões estáveis |
| Vazio | Explicação + próxima ação |
| Erro de API | Último dado válido, idade e tentar novamente |
| Offline | Cache identificado e ações locais permitidas |
| Sincronizando | Indicador discreto, sem bloquear navegação |
| Sucesso | Confirmação curta e não modal |

## Formulários

Label sempre visível; placeholder é exemplo, não rótulo. Erro aparece junto ao campo e no resumo. Login prioriza Google; e-mail permanece como contingência. Senhas administrativas nunca ficam gravadas diretamente no frontend em produção.
