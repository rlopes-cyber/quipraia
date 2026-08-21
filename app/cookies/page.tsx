import { LegalPage } from "../components/LegalPage";

export default function CookiesPage() {
  return <LegalPage kicker="Documento legal" title="Política de Cookies da QuiPraia">
    <p>Cookies e tecnologias semelhantes podem ser usados para manter a sessão, proteger a conta, lembrar preferências, medir desempenho e, futuramente, operar publicidade.</p>

    <table>
      <thead><tr><th>Categoria</th><th>Comportamento</th></tr></thead>
      <tbody>
        <tr><td>Necessários</td><td>Ativos para autenticação, segurança e funções solicitadas</td></tr>
        <tr><td>Preferências</td><td>Ativos somente com base legal adequada e escolha configurável</td></tr>
        <tr><td>Analytics</td><td>Bloqueados até consentimento, quando este for a base usada</td></tr>
        <tr><td>Publicidade</td><td>Bloqueados até consentimento específico; sem caixa pré-marcada</td></tr>
      </tbody>
    </table>

    <p>O banner de cookies oferece &quot;Aceitar opcionais&quot;, &quot;Recusar opcionais&quot; e &quot;Configurar&quot; com destaque equivalente. Fechar o banner não equivale a consentimento. A escolha pode ser alterada a qualquer momento em <a href="/configuracoes/privacidade">Configurações de privacidade</a>.</p>

    <h2>Inventário de cookies</h2>
    <p>Esta seção deve ser mantida com nome, fornecedor, finalidade, categoria, duração e domínio, gerados a partir do produto real, à medida que integrações de analytics e publicidade forem ativadas. No estado atual do preview, a QuiPraia usa apenas cookies necessários de sessão (autenticação Supabase) e uma marca de preferência de cookies salva no navegador.</p>
  </LegalPage>;
}
