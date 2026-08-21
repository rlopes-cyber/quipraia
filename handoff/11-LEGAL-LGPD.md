# Pacote legal e LGPD da QuiPraia

Este documento especifica páginas, textos e comportamentos que precisam existir no produto. É uma minuta operacional baseada na legislação brasileira e nas orientações públicas da ANPD. Antes da publicação comercial, um profissional jurídico deve revisar os textos e preencher os dados do controlador.

## 1. Dados que o proprietário precisa definir

Substituir antes da produção:

- `[NOME EMPRESARIAL OU NOME DO CONTROLADOR]`
- `[CPF OU CNPJ, CONFORME A ESTRUTURA JURÍDICA]`
- `[ENDEREÇO COMPLETO]`
- `[E-MAIL DE SUPORTE]`
- `[E-MAIL DE PRIVACIDADE]`
- `[NOME OU IDENTIFICAÇÃO DO ENCARREGADO, QUANDO APLICÁVEL]`
- `[DOMÍNIO OFICIAL]`
- `[DATA DE VIGÊNCIA]`
- `[FORO COMPETENTE, SEM AFASTAR DIREITOS DO CONSUMIDOR]`

Não publicar placeholders.

## 2. Rotas obrigatórias no produto

```text
/privacidade
/termos
/cookies
/diretrizes-da-comunidade
/assinatura-e-cancelamento
/politica-de-anuncios
/seguranca-e-previsoes
/privacidade/solicitacao
/configuracoes/privacidade
```

Links para Privacidade, Termos, Cookies e contato devem aparecer no rodapé. Cadastro, login e checkout devem apontar para os documentos pertinentes sem caixa previamente marcada.

## 3. Política de Privacidade

### Política de Privacidade da QuiPraia

Última atualização: `[DATA DE VIGÊNCIA]`

A QuiPraia respeita sua privacidade e trata dados pessoais de forma transparente, segura e limitada ao necessário para oferecer a plataforma de informações de surf, praias e interação entre usuários.

#### Quem controla seus dados

O controlador dos dados é `[NOME EMPRESARIAL OU NOME DO CONTROLADOR]`, inscrito no `[CPF OU CNPJ]` sob o número `[NÚMERO]`, com endereço em `[ENDEREÇO]`. Para assuntos de privacidade, entre em contato pelo e-mail `[E-MAIL DE PRIVACIDADE]`. O contato do encarregado, quando aplicável, é `[IDENTIFICAÇÃO E CONTATO]`.

#### Dados tratados

Podemos tratar:

- dados de cadastro, como nome, e-mail, identificador da conta e foto;
- dados fornecidos pelo Google quando essa opção de login for escolhida, conforme as permissões apresentadas;
- preferências, praias favoritas, nível de surf e configurações;
- relatos, fotos, confirmações, denúncias e outras contribuições à comunidade;
- dados de assinatura, como situação, plano e identificadores da transação, sem armazenar o número completo do cartão;
- dados técnicos, como IP, data e hora, navegador, dispositivo, logs de segurança e cookies;
- localização aproximada ou precisa, apenas quando o usuário autorizar e enquanto necessária para a função solicitada;
- comunicações com suporte e solicitações de privacidade.

Evite publicar em relatos dados pessoais seus ou de terceiros. A QuiPraia não solicita dados sensíveis para o uso normal do serviço.

#### Finalidades e bases legais

Tratamos dados para:

- criar e autenticar sua conta, executar os Termos e entregar as funções solicitadas;
- manter favoritos, perfil e contribuições, conforme a execução do contrato;
- prevenir fraude, abuso e incidentes, com base em legítimo interesse e cumprimento de obrigações;
- processar assinatura e cumprir obrigações legais, fiscais e consumeristas;
- responder solicitações e exercer direitos em processos administrativos ou judiciais;
- enviar comunicações de marketing somente com base adequada e opção simples de descadastro;
- usar localização, analytics ou publicidade personalizada somente quando houver base legal aplicável e, quando exigido, consentimento específico.

Aceitar os Termos não significa consentir com marketing, localização contínua ou publicidade personalizada. Essas escolhas devem ser separadas.

#### Compartilhamento

Podemos compartilhar dados estritamente necessários com provedores de:

- hospedagem e entrega da aplicação;
- banco de dados, autenticação e armazenamento;
- login Google, quando escolhido;
- pagamentos, quando ativados;
- e-mail transacional e suporte;
- monitoramento de erros, segurança e analytics autorizados;
- autoridades públicas, quando houver obrigação legal ou ordem válida.

A lista atual de operadores, finalidade, país e política de privacidade deve ficar disponível em `/privacidade#operadores` e ser atualizada quando a arquitetura mudar.

#### Transferências internacionais

Alguns fornecedores podem processar dados fora do Brasil. A QuiPraia deve adotar mecanismo válido previsto na LGPD e na regulamentação da ANPD, avaliar fornecedores e informar os países ou regiões envolvidos.

#### Retenção

Os dados serão mantidos apenas pelo período necessário para cada finalidade, obrigação legal, prevenção de fraude e exercício regular de direitos. A aplicação deve publicar uma matriz de retenção com pelo menos:

| Categoria | Regra proposta |
|---|---|
| Conta e perfil | Até a exclusão da conta, ressalvadas obrigações legais |
| Relatos públicos | Até exclusão pelo autor ou moderação; anonimizar quando necessário |
| Favoritos | Até remoção ou exclusão da conta |
| Aceites legais | Durante a relação e pelo prazo necessário à comprovação |
| Logs de segurança | Prazo definido por finalidade e risco, com acesso restrito |
| Registros de incidentes | No mínimo cinco anos conforme regulamentação da ANPD |
| Assinatura e fiscal | Prazo exigido pela legislação aplicável |
| Solicitações LGPD | Prazo necessário para comprovar atendimento |

Os prazos definitivos devem ser aprovados antes da produção.

#### Seus direitos

Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio ou eliminação quando aplicável, portabilidade conforme regulamentação, informação sobre compartilhamentos, informação sobre consentimento, revogação de consentimento, oposição e revisão de decisões automatizadas quando cabível.

Envie a solicitação em `/privacidade/solicitacao` ou pelo e-mail `[E-MAIL DE PRIVACIDADE]`. Podemos pedir confirmação de identidade proporcional ao risco. O atendimento deve ser gratuito e gerar protocolo.

#### Segurança

Adotamos controles técnicos e administrativos compatíveis com o risco. Nenhum sistema é totalmente imune. Quando um incidente puder causar risco ou dano relevante, serão adotadas as providências e comunicações exigidas pela legislação.

#### Crianças e adolescentes

A QuiPraia não é direcionada a crianças. Definir idade mínima operacional antes do lançamento. Se o serviço admitir adolescentes, aplicar proteção reforçada, linguagem adequada, minimização e avaliação jurídica específica. Contas identificadas como pertencentes a crianças sem base válida devem ser bloqueadas e tratadas conforme orientação jurídica.

#### Atualizações

Mudanças relevantes serão comunicadas no produto ou pelo e-mail cadastrado. A versão, data e histórico dos documentos devem permanecer disponíveis.

#### Contato

Privacidade: `[E-MAIL DE PRIVACIDADE]`  
Suporte: `[E-MAIL DE SUPORTE]`  
Controlador: `[NOME E ENDEREÇO]`

## 4. Termos de Uso

### Termos de Uso da QuiPraia

Última atualização: `[DATA DE VIGÊNCIA]`

Ao criar uma conta, você concorda com estes Termos e declara que leu a Política de Privacidade.

#### O serviço

A QuiPraia reúne previsões de ondas, maré, vento, informações de praias e relatos da comunidade. As informações são indicativas, podem conter atraso, indisponibilidade ou imprecisão e não substituem observação local, orientação profissional, sinalização oficial ou avaliação pessoal de segurança.

#### Conta

Você deve fornecer informações corretas, proteger suas credenciais e avisar sobre uso não autorizado. A conta é pessoal. Login pelo Google é opcional, pois também existe cadastro por e-mail e senha.

#### Uso permitido

Você concorda em não:

- atacar, testar vulnerabilidades ou contornar controles;
- coletar dados de outros usuários sem autorização;
- automatizar acesso de forma abusiva;
- publicar conteúdo ilegal, enganoso, discriminatório ou que exponha terceiros;
- anunciar sem autorização;
- manipular relatos, confirmações ou avaliações;
- copiar ou revender conteúdo, marca ou base de dados em desacordo com as licenças.

#### Conteúdo do usuário

Você mantém os direitos sobre o conteúdo que criar e concede à QuiPraia licença não exclusiva, gratuita e limitada ao funcionamento, divulgação e melhoria do serviço, enquanto o conteúdo permanecer publicado, respeitados seus direitos e a Política de Privacidade. Você declara ter autorização sobre fotos e informações enviadas.

A QuiPraia pode moderar ou remover conteúdo que viole estes Termos ou as Diretrizes da Comunidade, com registro da decisão e canal de contestação quando adequado.

#### Propriedade intelectual

A marca QuiPraia, interfaces, textos editoriais, software e elementos próprios são protegidos. Dados, mapas, fontes, fotos e serviços de terceiros seguem suas respectivas licenças e atribuições.

#### Planos

O plano Gratuito e o plano Colaborador possuem benefícios exibidos antes da contratação. O Colaborador custa R$ 9,90 por mês quando a cobrança estiver ativa. Preço, renovação, meios de pagamento e cancelamento devem ser apresentados com clareza no checkout.

#### Suspensão e encerramento

Podemos limitar ou suspender contas por risco de segurança, fraude ou violação destes Termos, observando proporcionalidade e legislação aplicável. Você pode excluir sua conta nas configurações. Determinados registros podem ser conservados quando houver obrigação legal ou exercício regular de direitos.

#### Limitação responsável

A QuiPraia não garante condições seguras para entrar no mar. Surf envolve riscos naturais, clima, correntes, animais, equipamentos e condições individuais. Consulte avisos oficiais, salva-vidas e condições locais. Nada nestes Termos exclui direitos ou responsabilidades que não possam ser afastados pela legislação brasileira.

#### Alterações e contato

Alterações relevantes serão comunicadas. Para suporte, use `[E-MAIL DE SUPORTE]`. Aplica-se a legislação brasileira, preservados o Código de Defesa do Consumidor e o foro legalmente competente.

## 5. Política de Cookies

### Política de Cookies da QuiPraia

Cookies e tecnologias semelhantes podem ser usados para manter a sessão, proteger a conta, lembrar preferências, medir desempenho e, futuramente, operar publicidade.

Categorias:

| Categoria | Comportamento |
|---|---|
| Necessários | Ativos para autenticação, segurança e funções solicitadas |
| Preferências | Ativos somente com base legal adequada e escolha configurável |
| Analytics | Bloqueados até consentimento quando este for a base usada |
| Publicidade | Bloqueados até consentimento específico; sem caixa pré-marcada |

O banner deve oferecer “Aceitar opcionais”, “Recusar opcionais” e “Configurar” com destaque equivalente. Fechar o banner não equivale a consentimento. A escolha deve poder ser alterada em `/configuracoes/privacidade`.

Manter inventário gerado a partir do produto real com nome, fornecedor, finalidade, categoria, duração e domínio. Não listar cookies inexistentes nem omitir tecnologias efetivamente usadas.

## 6. Diretrizes da Comunidade

Relatos devem ajudar outros surfistas com informação atual e respeitosa.

Permitido:

- relatar condições observadas;
- publicar foto própria ou autorizada;
- confirmar ou contestar informação de boa-fé;
- discordar sem atacar pessoas.

Proibido:

- assédio, discriminação, ameaça ou incentivo à violência;
- exposição de dados pessoais ou localização precisa de terceiros;
- conteúdo sexual, ilegal ou exploração de menores;
- spam, propaganda não autorizada e manipulação coordenada;
- informação deliberadamente falsa sobre risco ou condições;
- foto sem direitos ou que viole privacidade.

Usuários podem denunciar. A moderação deve registrar motivo, responsável, horário e decisão. Reincidência pode levar a restrição ou suspensão. Disponibilizar canal de contestação.

## 7. Assinatura, cancelamento e arrependimento

Antes da contratação, mostrar:

- preço total de R$ 9,90 por mês;
- recorrência mensal e renovação automática;
- benefícios e limitações do plano;
- forma de pagamento;
- condições de cancelamento;
- identificação e contato do fornecedor;
- resumo contratual antes da confirmação.

O cancelamento deve estar disponível na conta, sem fluxo artificialmente difícil. Informar quando o acesso termina e enviar confirmação. O exercício do direito de arrependimento em contratação online deve ser tratado conforme a legislação consumerista aplicável. Reembolso, estorno e efeitos sobre benefícios precisam estar descritos antes da cobrança real.

Não ativar pagamento até que esses fluxos, webhooks, suporte e textos tenham sido testados.

## 8. Política de anúncios

- Todo anúncio deve ser identificado como “Publicidade” ou “Anúncio”.
- Não confundir anúncio com recomendação editorial ou condição da praia.
- Proibir conteúdo ilegal, enganoso, discriminatório, predatório ou incompatível com o público.
- Não aceitar publicidade de aposta, tabaco, arma ou produto ilícito.
- Exigir que o anunciante possua direitos sobre textos, marcas e imagens.
- Disponibilizar denúncia de anúncio.
- Publicidade comportamental depende de base legal e configuração de cookies.
- O módulo institucional usa: “Anuncie aqui. Fortaleça o movimento surf.”

## 9. Aviso de previsão e segurança

Texto curto junto aos dados:

> Previsão indicativa. Confira a atualização, observe o mar e siga orientações locais antes de entrar.

Texto completo em `/seguranca-e-previsoes`:

> A QuiPraia combina dados de terceiros e informações da comunidade. Previsões podem mudar e relatos podem conter erro. Altura, período, direção, maré e vento não determinam sozinhos a segurança. Considere sua experiência, equipamento, correntes, fundo, lotação, clima, sinalização e orientação de salva-vidas. Em emergência, procure os serviços públicos competentes.

## 10. Requisitos técnicos de conformidade

### Aceite e versões

Criar tabelas ou estruturas equivalentes:

```text
legal_documents: id, type, version, effective_at, content_hash, published_at
legal_acceptances: user_id, document_id, accepted_at, source, ip_hash
consent_preferences: user_id, category, granted, changed_at, policy_version
privacy_requests: id, user_id, type, status, opened_at, due_at, resolved_at, notes
data_incidents: id, detected_at, category, risk, decision, notified_at, closed_at
processors: id, name, purpose, country, privacy_url, active
```

O aceite dos Termos e a ciência da Política são necessários para criar conta. Marketing, localização não essencial, analytics e publicidade usam controles separados. Não usar aceite único para tudo.

### Central de privacidade

O usuário deve conseguir:

- ver e alterar consentimentos opcionais;
- baixar seus dados em formato legível;
- corrigir o perfil;
- solicitar exclusão;
- ver solicitações e protocolos;
- acessar versões atuais dos documentos;
- sair de comunicações de marketing.

Exclusão e exportação exigem sessão recente ou nova autenticação. Operações assíncronas precisam informar prazo e conclusão.

### Minimização e privacidade por padrão

- Não exigir localização para usar funções que aceitam praia manual.
- Não guardar coordenada precisa sem necessidade clara.
- Remover EXIF de fotos enviadas.
- Não exibir e-mail, IP ou identificador interno publicamente.
- Separar analytics de dados identificáveis sempre que possível.
- Limitar logs e aplicar controle de acesso.

### Incidentes

Manter runbook com triagem, contenção, avaliação de risco, preservação de evidência, comunicação e correção. Incidentes com risco ou dano relevante podem exigir comunicação à ANPD e aos titulares em até três dias úteis. O registro de incidentes deve ser mantido por no mínimo cinco anos.

## 11. Referências oficiais

- [Lei Geral de Proteção de Dados Pessoais](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [Direitos dos titulares na ANPD](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares)
- [Guia de cookies da ANPD](https://www.gov.br/anpd/pt-br/assuntos/noticias-periodo-eleitoral/anpd-lanca-guia-orientativo-201ccookies-e-protecao-de-dados-pessoais201d)
- [Regulamentações da ANPD](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd)
- [Comunicação de incidentes de segurança](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis)
- [Marco Civil da Internet](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm)
- [Código de Defesa do Consumidor](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm)
- [Decreto do comércio eletrônico](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm)
