# Handoff para desenvolvimento

## Ordem obrigatória

1. Carregar fontes e tokens.
2. Importar ativos oficiais da marca e sprite de ícones.
3. Implementar shell responsivo e componentes base.
4. Implementar hotsite e autenticação.
5. Criar schema, RLS e seeds de praias.
6. Integrar ingestão de previsão e cache.
7. Implementar Home, Praia, Mapa e Comparação.
8. Implementar Comunidade, Perfil e Planos.
9. Implementar Admin.
10. Cobrir estados, acessibilidade e testes.

## Componentes

| Componente | Variantes/props mínimas |
|---|---|
| `Button` | `primary`, `secondary`, `ghost`, `danger`; loading/disabled |
| `IconButton` | 42 px; label acessível obrigatório |
| `MetricCard` | tipo, valor, unidade, tendência, ícone canônico |
| `SessionPulse` | 5 segmentos, label textual e melhor janela |
| `TimeRail` | horários, selecionado, callback, teclado |
| `TideChart` | pontos, extremos, agora, tooltip e falta de dados |
| `WavePanel` | altura, período, direção, energia |
| `WindPanel` | média, rajada, direção e séries |
| `BeachCard` | foto, nome, distância, condição e favorito |
| `BeachMarker` | condição, seleção e label de leitor de tela |
| `ReportCard` | autor, praia, idade, dados, confirmar e denunciar |
| `AdSlot` | posição, campanha, tracking agregado e fallback |
| `DataFreshness` | atualizado, atrasado, indisponível |

## Interações

- Hover/focus: 120 ms; mudança de página/card: 200 ms; gráficos: 320 ms.
- Respeitar `prefers-reduced-motion`.
- TimeRail: setas esquerda/direita, Home/End e foco visível.
- Gráfico: tooltip por mouse, toque e teclado; resumo textual equivalente.
- Mapa: marcador selecionável por teclado e lista alternativa sincronizada.
- Formulários: validação após blur e no envio; erro fica junto ao campo e no resumo.
- Relato: preservar rascunho se upload/envio falhar.

## Conteúdo e limites

- Nome de praia: 60 caracteres, 1 linha com ellipsis em card.
- Relato: 240 caracteres.
- Nome de usuário: 60 caracteres.
- CTA: máximo recomendado de 28 caracteres.
- Nunca esconder unidade, origem ou horário do dado.
- Nunca usar “seguro”, “garantido” ou recomendação de navegação.

## Responsividade

| Faixa | Comportamento |
|---|---|
| `<768` | uma coluna; bottom nav; cards empilhados; comparação horizontal |
| `768–1199` | duas colunas; header compacto; mapa/detalhe alternáveis |
| `>=1200` | sidebar; 12 colunas; conteúdo simultâneo; máximo 1440 px |

## Estados

- Skeleton preserva a altura final.
- Falha da previsão mostra último dado válido e idade.
- Sem favoritos conduz ao mapa.
- Sem GPS oferece seleção manual de cidade.
- Offline mostra cache e desabilita publicação.
- Acesso admin negado não revela dados internos.
- Upload falho mantém arquivo/rascunho para nova tentativa.

## Acessibilidade

- Contraste WCAG 2.1 AA.
- Alvos de toque mínimos de 44 × 44 px.
- Ordem de foco igual à visual.
- `aria-live="polite"` para atualização de horário, sucesso e estado de sincronização.
- Gráficos têm tabela/resumo textual acessível.
- Coral nunca é o único indicador de estado.
- Imagens editoriais têm alt descritivo; decorativas usam alt vazio.

## Administração

- Toda rota `/admin` exige sessão e `role in ('moderator','admin')` no servidor.
- Ações destrutivas exigem confirmação explícita.
- Moderação, alterações de praia, campanhas e planos geram auditoria.
- Admin inicial deve ser promovido por migration/script seguro usando UUID, nunca senha hardcoded.

## Critérios visuais

- Comparar screenshot de cada rota com os PNGs em `design-approvals`.
- Logo e ícones devem ser arquivos oficiais, não cópias desenhadas no JSX.
- Não aceitar componentes padrão sem tematização.
- Fotografias provisórias devem estar marcadas para substituição/licença.

