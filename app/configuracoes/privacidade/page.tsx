import { LegalPage } from "../../components/LegalPage";
import { PrivacySettings } from "../../components/PrivacySettings";

export default function ConfiguracoesPrivacidadePage() {
  return <LegalPage kicker="Central de privacidade" title="Configurações de privacidade">
    <PrivacySettings />
  </LegalPage>;
}
