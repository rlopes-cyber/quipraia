import { LegalPage } from "../components/LegalPage";

export default function PoliticaAnunciosPage() {
  return <LegalPage kicker="Documento legal" title="Política de Anúncios">
    <ul>
      <li>Todo anúncio é identificado como &quot;Publicidade&quot; ou &quot;Anúncio&quot;.</li>
      <li>Anúncio não se confunde com recomendação editorial ou condição da praia.</li>
      <li>Não aceitamos conteúdo ilegal, enganoso, discriminatório, predatório ou incompatível com o público.</li>
      <li>Não aceitamos publicidade de aposta, tabaco, arma ou produto ilícito.</li>
      <li>O anunciante deve possuir os direitos sobre textos, marcas e imagens usados.</li>
      <li>Há canal de denúncia de anúncio disponível.</li>
      <li>Publicidade comportamental depende de base legal e da configuração de cookies do usuário em <a href="/configuracoes/privacidade">Configurações de privacidade</a>.</li>
    </ul>
    <p>O módulo institucional de anúncios usa o texto: &quot;Anuncie aqui. Fortaleça o movimento surf.&quot;</p>
  </LegalPage>;
}
