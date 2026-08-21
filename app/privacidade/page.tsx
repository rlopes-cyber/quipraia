import { LegalPage, LegalPlaceholder } from "../components/LegalPage";
import { LEGAL_CONTACT } from "../lib/legal";

export default function PrivacidadePage() {
  return <LegalPage kicker="Documento legal" title="Política de Privacidade da QuiPraia">
    <p>A QuiPraia respeita sua privacidade e trata dados pessoais de forma transparente, segura e limitada ao necessário para oferecer a plataforma de informações de surf, praias e interação entre usuários.</p>

    <h2>Quem controla seus dados</h2>
    <p>O controlador dos dados é <LegalPlaceholder>{LEGAL_CONTACT.controlador}</LegalPlaceholder>, inscrito no <LegalPlaceholder>{LEGAL_CONTACT.documento}</LegalPlaceholder>, com endereço em <LegalPlaceholder>{LEGAL_CONTACT.endereco}</LegalPlaceholder>. Para assuntos de privacidade, entre em contato pelo e-mail <LegalPlaceholder>{LEGAL_CONTACT.emailPrivacidade}</LegalPlaceholder>. O contato do encarregado, quando aplicável, é <LegalPlaceholder>{LEGAL_CONTACT.encarregado}</LegalPlaceholder>.</p>

    <h2>Dados tratados</h2>
    <p>Podemos tratar:</p>
    <ul>
      <li>dados de cadastro, como nome, e-mail, identificador da conta e foto;</li>
      <li>dados fornecidos pelo Google quando essa opção de login for escolhida, conforme as permissões apresentadas;</li>
      <li>preferências, praias favoritas, nível de surf e configurações;</li>
      <li>relatos, fotos, confirmações, denúncias e outras contribuições à comunidade;</li>
      <li>dados de assinatura, como situação, plano e identificadores da transação, sem armazenar o número completo do cartão;</li>
      <li>dados técnicos, como IP, data e hora, navegador, dispositivo, logs de segurança e cookies;</li>
      <li>localização aproximada ou precisa, apenas quando o usuário autorizar e enquanto necessária para a função solicitada;</li>
      <li>comunicações com suporte e solicitações de privacidade.</li>
    </ul>
    <p>Evite publicar em relatos dados pessoais seus ou de terceiros. A QuiPraia não solicita dados sensíveis para o uso normal do serviço.</p>

    <h2>Finalidades e bases legais</h2>
    <p>Tratamos dados para:</p>
    <ul>
      <li>criar e autenticar sua conta, executar os Termos e entregar as funções solicitadas;</li>
      <li>manter favoritos, perfil e contribuições, conforme a execução do contrato;</li>
      <li>prevenir fraude, abuso e incidentes, com base em legítimo interesse e cumprimento de obrigações;</li>
      <li>processar assinatura e cumprir obrigações legais, fiscais e consumeristas;</li>
      <li>responder solicitações e exercer direitos em processos administrativos ou judiciais;</li>
      <li>enviar comunicações de marketing somente com base adequada e opção simples de descadastro;</li>
      <li>usar localização, analytics ou publicidade personalizada somente quando houver base legal aplicável e, quando exigido, consentimento específico.</li>
    </ul>
    <p>Aceitar os Termos não significa consentir com marketing, localização contínua ou publicidade personalizada. Essas escolhas são feitas separadamente em <a href="/configuracoes/privacidade">Configurações de privacidade</a>.</p>

    <h2>Compartilhamento</h2>
    <p>Podemos compartilhar dados estritamente necessários com provedores de:</p>
    <ul>
      <li>hospedagem e entrega da aplicação;</li>
      <li>banco de dados, autenticação e armazenamento;</li>
      <li>login Google, quando escolhido;</li>
      <li>pagamentos, quando ativados;</li>
      <li>e-mail transacional e suporte;</li>
      <li>monitoramento de erros, segurança e analytics autorizados;</li>
      <li>autoridades públicas, quando houver obrigação legal ou ordem válida.</li>
    </ul>
    <p>A lista atual de operadores, finalidade, país e política de privacidade deve ficar disponível nesta página e ser atualizada quando a arquitetura mudar.</p>

    <h2>Transferências internacionais</h2>
    <p>Alguns fornecedores podem processar dados fora do Brasil. A QuiPraia deve adotar mecanismo válido previsto na LGPD e na regulamentação da ANPD, avaliar fornecedores e informar os países ou regiões envolvidos.</p>

    <h2>Retenção</h2>
    <p>Os dados serão mantidos apenas pelo período necessário para cada finalidade, obrigação legal, prevenção de fraude e exercício regular de direitos.</p>
    <table>
      <thead><tr><th>Categoria</th><th>Regra proposta</th></tr></thead>
      <tbody>
        <tr><td>Conta e perfil</td><td>Até a exclusão da conta, ressalvadas obrigações legais</td></tr>
        <tr><td>Relatos públicos</td><td>Até exclusão pelo autor ou moderação; anonimizar quando necessário</td></tr>
        <tr><td>Favoritos</td><td>Até remoção ou exclusão da conta</td></tr>
        <tr><td>Aceites legais</td><td>Durante a relação e pelo prazo necessário à comprovação</td></tr>
        <tr><td>Logs de segurança</td><td>Prazo definido por finalidade e risco, com acesso restrito</td></tr>
        <tr><td>Registros de incidentes</td><td>No mínimo cinco anos conforme regulamentação da ANPD</td></tr>
        <tr><td>Assinatura e fiscal</td><td>Prazo exigido pela legislação aplicável</td></tr>
        <tr><td>Solicitações LGPD</td><td>Prazo necessário para comprovar atendimento</td></tr>
      </tbody>
    </table>
    <p>Os prazos definitivos devem ser aprovados antes da produção.</p>

    <h2>Seus direitos</h2>
    <p>Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio ou eliminação quando aplicável, portabilidade conforme regulamentação, informação sobre compartilhamentos, informação sobre consentimento, revogação de consentimento, oposição e revisão de decisões automatizadas quando cabível.</p>
    <p>Envie a solicitação em <a href="/privacidade/solicitacao">Central de privacidade</a> ou pelo e-mail <LegalPlaceholder>{LEGAL_CONTACT.emailPrivacidade}</LegalPlaceholder>. Podemos pedir confirmação de identidade proporcional ao risco. O atendimento é gratuito e gera protocolo.</p>

    <h2>Segurança</h2>
    <p>Adotamos controles técnicos e administrativos compatíveis com o risco. Nenhum sistema é totalmente imune. Quando um incidente puder causar risco ou dano relevante, serão adotadas as providências e comunicações exigidas pela legislação.</p>

    <h2>Crianças e adolescentes</h2>
    <p>A QuiPraia não é direcionada a crianças. A idade mínima operacional deve ser definida antes do lançamento comercial. Contas identificadas como pertencentes a crianças sem base válida devem ser bloqueadas e tratadas conforme orientação jurídica.</p>

    <h2>Atualizações</h2>
    <p>Mudanças relevantes serão comunicadas no produto ou pelo e-mail cadastrado. A versão, data e histórico dos documentos permanecem disponíveis.</p>

    <h2>Contato</h2>
    <p>Privacidade: <LegalPlaceholder>{LEGAL_CONTACT.emailPrivacidade}</LegalPlaceholder><br/>Suporte: <LegalPlaceholder>{LEGAL_CONTACT.emailSuporte}</LegalPlaceholder><br/>Controlador: <LegalPlaceholder>{LEGAL_CONTACT.controlador}</LegalPlaceholder>, <LegalPlaceholder>{LEGAL_CONTACT.endereco}</LegalPlaceholder></p>
  </LegalPage>;
}
