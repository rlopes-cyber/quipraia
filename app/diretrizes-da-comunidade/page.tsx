import { LegalPage } from "../components/LegalPage";

export default function DiretrizesPage() {
  return <LegalPage kicker="Documento legal" title="Diretrizes da Comunidade">
    <p>Relatos devem ajudar outros surfistas com informação atual e respeitosa.</p>

    <h2>Permitido</h2>
    <ul>
      <li>relatar condições observadas;</li>
      <li>publicar foto própria ou autorizada;</li>
      <li>confirmar ou contestar informação de boa-fé;</li>
      <li>discordar sem atacar pessoas.</li>
    </ul>

    <h2>Proibido</h2>
    <ul>
      <li>assédio, discriminação, ameaça ou incentivo à violência;</li>
      <li>exposição de dados pessoais ou localização precisa de terceiros;</li>
      <li>conteúdo sexual, ilegal ou exploração de menores;</li>
      <li>spam, propaganda não autorizada e manipulação coordenada;</li>
      <li>informação deliberadamente falsa sobre risco ou condições;</li>
      <li>foto sem direitos ou que viole privacidade.</li>
    </ul>

    <h2>Moderação</h2>
    <p>Usuários podem denunciar relatos. A moderação registra motivo, responsável, horário e decisão. Reincidência pode levar a restrição ou suspensão. Há canal de contestação disponível para quem discordar de uma decisão de moderação.</p>
  </LegalPage>;
}
