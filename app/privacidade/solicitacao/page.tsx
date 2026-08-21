import { LegalPage } from "../../components/LegalPage";
import { PrivacyRequestForm } from "../../components/PrivacyRequestForm";

export default function SolicitacaoPage() {
  return <LegalPage kicker="Central de privacidade" title="Solicitar direitos sobre meus dados">
    <p>Use este canal para exercer seus direitos como titular de dados: confirmação de tratamento, acesso, correção, portabilidade, eliminação e demais direitos previstos na LGPD.</p>
    <PrivacyRequestForm />
  </LegalPage>;
}
