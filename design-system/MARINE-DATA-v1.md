# QuiPraia — sistema de dados do mar v1

## Princípio

Cada fenômeno recebe uma visualização própria. Maré, swell e vento nunca reutilizam o mesmo gráfico apenas trocando o título.

## Maré — Tide Curve

**Forma:** curva contínua com preenchimento leve em Tide, linha de agora Coral e pontos explícitos de alta/baixa.

Exibir:

- altura em metros;
- horários de alta e baixa;
- movimento `enchendo` ou `vazando`;
- nível no horário selecionado;
- período de 24 horas, com foco inicial nas próximas 12;
- fonte, atualização e confiança.

Interação: arrastar ou usar setas move o cursor; tooltip mostra hora e altura. Mobile usa scroll horizontal sem reduzir rótulos abaixo de `12 px`. Uma tabela com hora/altura acompanha o gráfico para acessibilidade.

## Ondas — Swell Stack

Usar três camadas coordenadas:

1. **Altura:** faixa vertical ou banda de variação, não apenas uma linha.
2. **Período:** pontos dimensionados por energia e valor em segundos.
3. **Direção:** seta sobre rosa dos ventos simplificada, acompanhada de sigla e graus.

Exemplo: `1,2–1,6 m · 11 s · ESE 112°`. Swell primário e secundário ficam separados quando a API fornecer ambos.

## Vento — Wind Track

**Forma:** linha de velocidade + faixa de rajadas + setas de direção em intervalos regulares.

Exibir:

- velocidade média em `km/h`;
- rajadas;
- direção cardinal e graus;
- classificação local: terral, lateral ou maral;
- mudança prevista e horário.

O tamanho das setas não representa velocidade; espessura e valor textual fazem isso. Direção sempre tem texto alternativo.

## Janela recomendada

Combina swell, período, vento, estágio da maré, luz e confiança da fonte. A saída é uma faixa horária, não uma promessa.

Exemplo:

> Melhor janela: 06:20–08:10 · vento terral fraco · maré enchendo · confiança média.

Sempre permitir abrir “Por que esta janela?” com pesos e dados utilizados.

## Agora

O horário atual é representado por Coral em todos os gráficos. A seleção de outro horário muda para um cursor Foam/Midnight; assim o usuário diferencia “agora” de “horário analisado”.

## Sincronização

- Um único horário selecionado controla todos os módulos.
- Trocar praia preserva o horário quando houver dados.
- Atualização automática não move o cursor durante interação.
- Mostrar `Atualizado há X min` e a fonte em cada conjunto.
- Divergências entre APIs são registradas e não misturadas silenciosamente.

## Estados de confiança

| Estado | Regra visual | Texto |
|---|---|---|
| Alta | ícone preenchido + texto | Modelos convergem |
| Média | ícone parcial + texto | Pequena divergência |
| Baixa | contorno + texto | Dados incompletos ou divergentes |

Não usar verde/amarelo/vermelho como único indicador.

## Densidade por contexto

| Contexto | Informação |
|---|---|
| Card da praia | altura, período, vento, próxima maré, Pulse |
| Página da praia | gráficos completos e relatos |
| Mapa | Pulse, altura e vento resumidos |
| Comparação | mesmos horários e escalas lado a lado |
| Watch/widget | altura, vento e próxima maré |

## Dados ausentes

- `Sem leitura de período para este horário`, não `0 s`.
- Manter último valor somente quando identificado como cache.
- Não calcular Session Pulse se faltarem fatores essenciais.
- Permitir relato comunitário sem apresentá-lo como dado de API.
