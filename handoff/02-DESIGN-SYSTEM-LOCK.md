# Bloqueio do design system: QuiPraia 3C

## Fonte única de verdade

- Brandboard: `../public/brand/final/quipraia-3c-brandboard-approved.png`
- Logo escura: `../public/brand/final/quipraia-3c-lockup-dark-final.svg`
- Logo clara: `../public/brand/final/quipraia-3c-lockup-light-final.svg`
- Wordmark: `../public/brand/final/quipraia-3c-wordmark-dark-approved.svg`
- Símbolo: `../public/brand/final/quipraia-3c-symbol-dark-approved.svg`
- Ícones: `assets/quipraia-icons.svg`
- Tokens: `design-tokens.json`

Não redesenhar, vetorizar novamente, trocar proporções, inclinação ou detalhe Coral da marca.

## Cores

| Token | Valor | Uso |
|---|---:|---|
| Midnight | `#0B1D2D` | fundo principal |
| Midnight Deep | `#081824` | sidebar e contraste |
| Surface | `#102638` | cards |
| Surface Raised | `#132F42` | banners e elevação |
| Seafoam | `#9FD3C6` | dado positivo, seleção, ícones |
| Coral | `#FF6B57` | CTA e momento atual |
| Foam | `#F4F6F7` | títulos e conteúdo principal |
| Silver Blue | `#6B8194` | metadados e estados secundários |

Coral não significa “bom”. Ele significa ação principal, horário atual ou atenção. Qualidade de sessão combina texto, forma e Seafoam.

## Tipografia

- **Sora 600/700:** títulos, métricas e chamadas.
- **Inter 500/600/700:** interface, legendas e dados auxiliares.
- Não usar fonte cursiva na interface. A direção 3C aprovada substituiu essa exploração por uma linguagem técnica de performance.
- Números tabulares devem usar `font-variant-numeric: tabular-nums`.

## Iconografia

- Traço técnico arredondado, `2–2.5px`, sem preenchimento ornamental.
- Cor padrão Seafoam; Coral apenas para estado atual/atenção.
- Ícones marinhos oficiais: onda com crista e base, período circular com onda, vento com redemoinhos, maré com três níveis e seta.
- Não usar estrelas, clipart, pins genéricos como avaliação, ondas sinusoidais genéricas ou misturar bibliotecas.
- O mapa pode usar marcadores circulares de condição; “B” significa Bom e deve ter rótulo acessível.

## Layout

- Base espacial de 4 px.
- Mobile: 4 colunas, margem 16, gutter 12.
- Tablet: 8 colunas, margem 24, gutter 16.
- Desktop: 12 colunas, conteúdo máximo 1440, gutter 24.
- Cards: raio 16 ou 24; inputs e CTAs: 12–16; pills: raio total.
- Sombras discretas e borda de 1 px. Não usar glassmorphism exagerado.

## Fotografia

- Surf lifestyle editorial, litoral brasileiro, luz natural e textura real.
- Evitar fotografia genérica de banco, saturação tropical artificial e ondas extremas.
- Toda imagem gerada é provisória até licenciamento ou produção fotográfica.

## Regra de consistência

Se um componente já existe em tela aprovada, ele deve ser reutilizado. Novos componentes precisam usar os mesmos tokens, raio, traço e estados antes de qualquer variação criativa.

