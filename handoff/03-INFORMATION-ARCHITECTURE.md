# Arquitetura de informação e fluxos

## Rotas públicas

- `/`: hotsite.
- `/entrar`: Google ou e-mail/senha.
- `/criar-conta`: Google ou cadastro tradicional.
- `/recuperar-senha` e `/redefinir-senha`.
- `/termos` e `/privacidade`.

## Rotas autenticadas

- `/app`: home “Qual praia hoje?”.
- `/app/mapa`: mapa de sessões.
- `/app/praias/[slug]`: detalhe da praia.
- `/app/comparar?praias=`: comparação de até três praias.
- `/app/comunidade`: relatos recentes e filtros.
- `/app/perfil`: conta, nível, favoritos, alertas e plano.
- `/app/planos`: Gratuito versus Colaborador.

## Rotas administrativas

- `/admin`: visão geral.
- `/admin/praias`: cadastro e publicação.
- `/admin/usuarios`: usuários, função e plano.
- `/admin/relatos`: moderação.
- `/admin/anuncios`: campanhas e posições.
- `/admin/integracoes`: saúde das APIs e sincronizações.
- `/admin/auditoria`: ações administrativas.

## Fluxo de aquisição

`Hotsite → Criar conta → Google OU e-mail/senha → confirmar e-mail quando necessário → onboarding → Home`

## Fluxo principal

`Home → escolher praia → selecionar horário → analisar maré/ondas/vento → consultar relatos → favoritar ou relatar condição`

## Fluxo do mapa

O mapa abre em Salvador, mostra praias por coordenada e condição atual. Selecionar um marcador abre um resumo lateral/inferior; “Abrir praia” leva ao detalhe. Localização é opcional e a cidade pode ser selecionada manualmente.

## Fluxo comunitário

`Relatar condição → praia → condição/lotação → foto opcional → texto até 240 caracteres → publicar → moderação automática/manual → comunidade`

## Fluxo do plano

`Perfil/Planos → escolher Colaborador R$ 9,90 → checkout hospedado → webhook confirma → entitlement atualizado → recibo/portal de cobrança`

## Navegação

- Mobile: barra inferior com Hoje, Mapa, Comparar, Comunidade e Perfil.
- Desktop: sidebar persistente com as mesmas áreas.
- Admin: sidebar própria; nunca misturar navegação de usuário e administração.

