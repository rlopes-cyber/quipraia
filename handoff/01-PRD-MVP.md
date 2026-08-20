# PRD — QuiPraia MVP

## Problema

Surfistas precisam combinar previsão, maré, vento, conhecimento local e relatos recentes para decidir onde e quando surfar. Hoje essas informações ficam dispersas, possuem leituras técnicas pouco amigáveis e não oferecem contexto comunitário por praia.

## Objetivo do MVP

Entregar uma aplicação web responsiva para Salvador que permita decidir “qual praia hoje?” em até 30 segundos, usando previsão marinha sincronizada por horário e confirmação da comunidade.

## Metas iniciais

- Pelo menos 60% dos cadastros concluem o onboarding.
- Pelo menos 40% dos usuários ativados retornam em 7 dias.
- Um usuário encontra a melhor janela de uma praia em até 30 segundos.
- Pelo menos 20% dos usuários ativos publicam ou confirmam um relato no primeiro mês.
- Conversão de 3% a 5% para Colaborador após a validação do preço.

## Personas

- **Surfista local:** conhece as praias, quer economizar deslocamento e confirmar a leitura.
- **Surfista iniciante/intermediário:** precisa de uma síntese compreensível e praias compatíveis.
- **Administrador:** cadastra praias, monitora dados, modera relatos e gerencia anúncios.
- **Parceiro local:** quer anunciar para surfistas em praias ou períodos específicos.

## Escopo P0

- Hotsite público e cadastro obrigatório.
- Login por Google e e-mail/senha, confirmação e recuperação de senha.
- Onboarding: nível, cidade e até três praias favoritas.
- Home com Session Pulse, melhor janela, condições atuais, maré e praias próximas.
- Detalhe de praia com abas Maré, Ondas, Vento e Relatos.
- Linha temporal única que sincroniza todos os dados.
- Mapa interativo de Salvador com coordenadas reais.
- Comparação de até três praias no mesmo horário.
- Perfil, favoritos e preferências de alerta.
- Relatos comunitários com foto opcional, condição, lotação e texto curto.
- Confirmação e denúncia de relatos.
- Plano Gratuito e Colaborador de R$ 9,90/mês.
- Espaços publicitários gerenciados internamente.
- Painel administrativo para praias, usuários, relatos, integrações e anúncios.

## P1 após o primeiro teste

- Alertas por e-mail/push de melhor janela.
- Previsão estendida para colaboradores.
- Ranking de confiabilidade dos relatos.
- Instalação como PWA e funcionamento offline parcial.
- Analytics de funil, retenção e conversão.

## Fora do MVP

- Aplicativos nativos iOS/Android.
- Login Apple.
- Chat privado entre usuários.
- Marketplace ou reservas de aulas.
- Câmeras ao vivo próprias.
- Recomendação automatizada com promessa de segurança.
- Uso da previsão para navegação marítima.

## Histórias principais

- Como surfista, quero ver uma síntese por praia para decidir onde surfar.
- Como surfista, quero mover o horário e ver maré, ondas e vento juntos.
- Como surfista, quero comparar praias sem interpretar gráficos diferentes.
- Como membro, quero relatar a condição real para ajudar a comunidade.
- Como colaborador, quero recursos avançados e uma experiência sem anúncios.
- Como administrador, quero revisar conteúdo e falhas de sincronização em um painel único.

## Critérios de lançamento

- As dez praias iniciais possuem coordenadas, fotos, orientação e dados válidos.
- Nenhum dado fictício aparece sem o rótulo “demonstração”.
- Última atualização e fonte aparecem em toda previsão.
- Falha de uma API não apaga o último dado válido.
- RLS está habilitada em toda tabela exposta.
- Fluxos de Google, e-mail, recuperação e logout passam nos testes.
- Administrador não é criado com senha em código-fonte.
- O site atende ao básico de WCAG 2.1 AA e navegação por teclado.

