import { LegalPage, LegalPlaceholder } from "../components/LegalPage";
import { LEGAL_CONTACT } from "../lib/legal";

export default function TermosPage() {
  return <LegalPage kicker="Documento legal" title="Termos de Uso da QuiPraia">
    <p>Ao criar uma conta, você concorda com estes Termos e declara que leu a <a href="/privacidade">Política de Privacidade</a>.</p>

    <h2>O serviço</h2>
    <p>A QuiPraia reúne previsões de ondas, maré, vento, informações de praias e relatos da comunidade. As informações são indicativas, podem conter atraso, indisponibilidade ou imprecisão e não substituem observação local, orientação profissional, sinalização oficial ou avaliação pessoal de segurança.</p>

    <h2>Conta</h2>
    <p>Você deve fornecer informações corretas, proteger suas credenciais e avisar sobre uso não autorizado. A conta é pessoal. Login pelo Google é opcional, pois também existe cadastro por e-mail e senha.</p>

    <h2>Uso permitido</h2>
    <p>Você concorda em não:</p>
    <ul>
      <li>atacar, testar vulnerabilidades ou contornar controles;</li>
      <li>coletar dados de outros usuários sem autorização;</li>
      <li>automatizar acesso de forma abusiva;</li>
      <li>publicar conteúdo ilegal, enganoso, discriminatório ou que exponha terceiros;</li>
      <li>anunciar sem autorização;</li>
      <li>manipular relatos, confirmações ou avaliações;</li>
      <li>copiar ou revender conteúdo, marca ou base de dados em desacordo com as licenças.</li>
    </ul>

    <h2>Conteúdo do usuário</h2>
    <p>Você mantém os direitos sobre o conteúdo que criar e concede à QuiPraia licença não exclusiva, gratuita e limitada ao funcionamento, divulgação e melhoria do serviço, enquanto o conteúdo permanecer publicado, respeitados seus direitos e a Política de Privacidade. Você declara ter autorização sobre fotos e informações enviadas.</p>
    <p>A QuiPraia pode moderar ou remover conteúdo que viole estes Termos ou as <a href="/diretrizes-da-comunidade">Diretrizes da Comunidade</a>, com registro da decisão e canal de contestação quando adequado.</p>

    <h2>Propriedade intelectual</h2>
    <p>A marca QuiPraia, interfaces, textos editoriais, software e elementos próprios são protegidos. Dados, mapas, fontes, fotos e serviços de terceiros seguem suas respectivas licenças e atribuições.</p>

    <h2>Planos</h2>
    <p>O plano Gratuito e o plano Colaborador possuem benefícios exibidos antes da contratação. O Colaborador custa R$ 9,90 por mês quando a cobrança estiver ativa. Preço, renovação, meios de pagamento e cancelamento são apresentados com clareza no checkout. Veja também <a href="/assinatura-e-cancelamento">Assinatura e cancelamento</a>.</p>

    <h2>Suspensão e encerramento</h2>
    <p>Podemos limitar ou suspender contas por risco de segurança, fraude ou violação destes Termos, observando proporcionalidade e legislação aplicável. Você pode solicitar a exclusão da sua conta pela <a href="/configuracoes/privacidade">Central de privacidade</a>. Determinados registros podem ser conservados quando houver obrigação legal ou exercício regular de direitos.</p>

    <h2>Limitação responsável</h2>
    <p>A QuiPraia não garante condições seguras para entrar no mar. Surf envolve riscos naturais, clima, correntes, animais, equipamentos e condições individuais. Consulte avisos oficiais, salva-vidas e condições locais. Veja <a href="/seguranca-e-previsoes">Segurança e previsões</a>. Nada nestes Termos exclui direitos ou responsabilidades que não possam ser afastados pela legislação brasileira.</p>

    <h2>Alterações e contato</h2>
    <p>Alterações relevantes serão comunicadas. Para suporte, use <LegalPlaceholder>{LEGAL_CONTACT.emailSuporte}</LegalPlaceholder>. Aplica-se a legislação brasileira, preservados o Código de Defesa do Consumidor e o foro de <LegalPlaceholder>{LEGAL_CONTACT.foro}</LegalPlaceholder>.</p>
  </LegalPage>;
}
