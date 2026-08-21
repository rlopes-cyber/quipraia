import { LegalPage } from "../components/LegalPage";

export default function AssinaturaPage() {
  return <LegalPage kicker="Documento legal" title="Assinatura, cancelamento e arrependimento">
    <p>Antes da contratação do plano Colaborador, mostramos:</p>
    <ul>
      <li>preço total de R$ 9,90 por mês;</li>
      <li>recorrência mensal e renovação automática;</li>
      <li>benefícios e limitações do plano;</li>
      <li>forma de pagamento;</li>
      <li>condições de cancelamento;</li>
      <li>identificação e contato do fornecedor;</li>
      <li>resumo contratual antes da confirmação.</li>
    </ul>

    <h2>Cancelamento</h2>
    <p>O cancelamento fica disponível diretamente na conta, sem fluxo artificialmente difícil. Informamos quando o acesso termina e enviamos confirmação por e-mail.</p>

    <h2>Arrependimento e reembolso</h2>
    <p>O exercício do direito de arrependimento em contratação online é tratado conforme a legislação consumerista aplicável. Reembolso, estorno e efeitos sobre benefícios já usados serão descritos antes da cobrança real.</p>

    <blockquote>O pagamento ainda não está ativo neste preview. A cobrança real só será ligada depois que os fluxos de checkout, webhooks, suporte e estes textos forem testados e autorizados pelo responsável pelo produto.</blockquote>
  </LegalPage>;
}
