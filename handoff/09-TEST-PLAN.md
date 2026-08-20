# Plano de testes do MVP

## Autenticação

- Cadastro por Google cria perfil e direciona ao onboarding.
- Cadastro por e-mail exige confirmação conforme configuração.
- E-mail duplicado produz mensagem clara.
- Login incorreto não informa se a conta existe.
- Recuperação e redefinição funcionam.
- Logout encerra sessão; rota autenticada redireciona.
- Usuário comum recebe 403/redirect ao tentar `/admin`.

## Previsão

- Séries são ordenadas por timezone `America/Bahia`.
- Um horário selecionado atualiza maré, ondas e vento.
- Valores nulos não viram zero.
- Direções em graus geram rótulos cardeais corretos.
- Unidade métrica aparece em todos os valores.
- Falha da API preserva último conjunto válido.
- Dado com mais de 120 minutos entra em estado atrasado.

## Mapa

- Ordem costeira e coordenadas das praias são verificadas.
- Flamengo, Stella Maris e Itapuã não se sobrepõem incorretamente.
- Seleção por marcador atualiza resumo e URL.
- Lista alternativa funciona sem WebGL/GPS.
- Atribuição do mapa permanece visível.

## Comunidade

- Somente autenticado publica/confirmar/denuncia.
- Relato respeita 240 caracteres.
- Foto inválida ou grande é recusada com orientação.
- Falha preserva rascunho.
- Autor não confirma o próprio relato.
- Conteúdo rejeitado deixa de aparecer publicamente.

## Planos e publicidade

- Gratuito vê slots de anúncio; Colaborador não.
- Webhook duplicado não duplica assinatura.
- Cancelamento mantém acesso até o fim do período quando aplicável.
- Preço exibido é R$ 9,90/mês em todas as telas.
- Campanha fora do período não aparece.
- Clique/impressão não armazena localização individual desnecessária.

## Visual e acessibilidade

- Testes em 375, 768, 1280 e 1440 px.
- Navegação completa por teclado.
- Foco sempre visível.
- Sem overflow horizontal não intencional.
- `prefers-reduced-motion` desativa animações não essenciais.
- Lighthouse e axe sem violações críticas.
- Regressão visual compara hotsite, auth, home, praia, mapa, admin e estados.

## Dados e segurança

- RLS impede leitura/alteração de dados de outro usuário.
- Chave de serviço não aparece no bundle.
- Uploads usam bucket e políticas corretas.
- Admin é protegido no servidor, não somente escondido no menu.
- Logs não registram token, senha ou conteúdo sensível.

