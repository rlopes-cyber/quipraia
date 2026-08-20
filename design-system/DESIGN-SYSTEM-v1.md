# QuiPraia Design System v1

## Princípio

**Ler o mar com clareza, escolher a sessão com confiança.**

O sistema combina a precisão técnica da direção 3C com fotografia e linguagem de surf real. A interface não deve parecer um painel meteorológico genérico nem uma marca de competição. Os dados são protagonistas; a identidade oferece ritmo, orientação e personalidade.

## Hierarquia visual

1. **Decisão:** condição atual, melhor janela e praia selecionada.
2. **Evidência:** maré, swell, período, vento e relatos recentes.
3. **Contexto:** temperatura, chuva, luz, lotação e características do pico.
4. **Ação:** comparar, favoritar, relatar e abrir mapa.

Cada tela deve responder em até cinco segundos: **onde, quando e por quê surfar**.

## Marca

- Direção oficial: **3C Performance**.
- Logo principal: Foam sobre Midnight ou Midnight sobre Foam.
- Coral: apenas quilha, CTA principal e marcador “agora”.
- Símbolo mínimo recomendado: `24 px` digital e `8 mm` impresso.
- Área de proteção: altura do terminal coral em todos os lados.
- Não reconstruir o wordmark com uma fonte semelhante.

## Cores

| Token | Valor | Uso |
|---|---:|---|
| Midnight | `#0B1D2D` | Navegação, títulos, fundos imersivos |
| Foam | `#F4F6F7` | Canvas e logo invertido |
| Seafoam | `#9FD3C6` | Swell, sucesso e condições favoráveis |
| Coral | `#FF6B57` | Ação, agora e decisão |
| Silver Blue | `#6B8194` | Vento e informação secundária |
| Tide | `#57AFCB` | Curva e área da maré |
| Period | `#F4B860` | Período e energia |

Regras:

- Coral não deve ocupar mais de 10% de uma tela.
- Cor nunca será o único meio de comunicar uma condição.
- Cards usam branco; Midnight fica reservado para navegação, destaques e visualizações imersivas.
- Fotografias recebem overlay Midnight somente quando houver texto sobreposto.

## Tipografia

| Estilo | Fonte | Peso | Tamanho/linha | Uso |
|---|---|---:|---:|---|
| Display | Sora | 700 | `40–72 / 1.05` | Campanhas e abertura do hotsite |
| H1 | Sora | 700 | `32 / 1.15` | Praia e tela principal |
| H2 | Sora | 600 | `24 / 1.2` | Seções |
| H3 | Sora | 600 | `18 / 1.3` | Cards |
| Body | Inter | 400 | `16 / 1.5` | Conteúdo |
| Label | Inter | 600 | `13 / 1.3` | Controles e metadados |
| Data XL | Sora | 600 | `32 / 1` | Altura, período e vento |
| Data SM | Inter | 600 | `14 / 1.2` | Eixos, unidades e horários |

Dados numéricos usam algarismos tabulares. Unidades nunca ficam isoladas: `1,4 m`, `12 s`, `18 km/h`.

## Grid e responsividade

| Faixa | Colunas | Margem | Gutter |
|---|---:|---:|---:|
| Mobile `< 768` | 4 | 16 px | 12 px |
| Tablet `768–1199` | 8 | 24 px | 16 px |
| Desktop `≥ 1200` | 12 | 32 px | 24 px |

- Conteúdo máximo: `1280 px`.
- Cards de dados não ficam menores que `156 px`.
- Gráficos têm altura mínima de `220 px` no mobile.
- Navegação principal: inferior no mobile, lateral compacta no desktop autenticado.

## Forma, profundidade e movimento

- Raios: `8`, `12`, `16` e `24 px`; não misturar valores arbitrários.
- Cards principais: `16 px`; modais e painéis: `24 px`.
- Bordas neutras substituem sombras na maior parte da interface.
- Sombra flutuante apenas em menus, modais e marcador selecionado.
- Transições: `120 ms` para feedback, `220 ms` para componentes e `420 ms` para gráficos.
- Respeitar `prefers-reduced-motion`.

## Fotografia

- Sessões reais, água e textura; evitar banco de imagens com pose artificial.
- Priorizar luz natural, horizonte e leitura do pico.
- Mostrar Salvador como origem sem transformar a marca em turismo local.
- Temperatura visual levemente quente; azuis não devem ficar excessivamente ciano.
- Cards de praia usam proporção `4:3`; heróis usam `16:9` ou `3:2`.

## Iconografia

- Traço uniforme de `1.75 px` em grade de `24 px`.
- Terminais arredondados e cortes diagonais derivados da marca 3C.
- Ícone sempre acompanhado de rótulo em dados críticos.
- Conjunto obrigatório: swell, período, direção, maré, vento, rajada, chuva, temperatura, luz, lotação, relato e câmera.
- Não misturar Flaticon de famílias diferentes; qualquer ícone externo deve ser redesenhado no padrão.

## Condição da sessão

Não usar estrelas. O padrão será **Session Pulse**, uma barra de cinco segmentos inspirada nos canais do símbolo.

| Nível | Rótulo | Significado |
|---:|---|---|
| 1 | Flat | Sem condição útil |
| 2 | Fraco | Surfável com limitações |
| 3 | Regular | Sessão possível |
| 4 | Bom | Janela recomendada |
| 5 | Clássico | Conjunto raro de condições |

O rótulo textual é obrigatório. O cálculo deve exibir fatores considerados e horário da atualização.

## Acessibilidade mínima

- WCAG 2.1 AA para texto e controles.
- Área de toque mínima: `44 × 44 px`.
- Foco visível em todos os elementos interativos.
- Teclado completo em mapas, tabs, gráficos e modais.
- Gráficos incluem resumo textual e tabela alternativa.
- Direções não podem depender apenas de setas; anunciar `vento nordeste`, por exemplo.
- Horários, datas e unidades devem respeitar o locale `pt-BR`.

## Voz da interface

- Direta: “Melhor janela entre 06:30 e 08:15”.
- Transparente: “Atualizado há 12 min · fonte: Open-Meteo”.
- Comunitária: “3 surfistas confirmaram vento fraco”.
- Responsável: “A previsão pode mudar. Observe as condições locais.”

Evitar superlativos, previsões garantidas e excesso de gírias.

## Critério para aprovação de telas

Uma tela só segue para programação quando:

- usa apenas tokens documentados;
- possui mobile e desktop;
- cobre loading, vazio, erro e offline;
- apresenta fonte e horário dos dados;
- passa contraste AA;
- responde claramente onde, quando e por quê surfar.
