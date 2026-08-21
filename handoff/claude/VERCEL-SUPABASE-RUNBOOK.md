# Runbook de publicação: Next.js, Supabase e Vercel

Este documento é o roteiro operacional para transformar a implementação atual em um sistema testável e publicá-lo com segurança. Não contém segredos.

## 1. Condição de entrada

Não publicar a implementação atual diretamente na Vercel. O repositório usa Vinext, Vite e um worker Cloudflare. Primeiro concluir a migração para Next.js nativo descrita no `MASTER-PROMPT.md`.

Critérios mínimos antes de conectar serviços externos:

- `npm run lint` sem erro;
- `npm run typecheck` sem erro;
- `npm test` sem erro;
- `npm run build` usando `next build`;
- `npm run start` servindo a aplicação compilada;
- nenhuma dependência de `vinext`, plugin Vite ou worker Cloudflare no runtime.

## 2. Segurança de credenciais

- Nunca gravar chaves, tokens ou senhas no repositório, documentação, prompt ou conversa.
- Usar `.env.local` apenas no computador local e garantir que esteja no `.gitignore`.
- Configurar variáveis da Vercel pelo painel ou CLI autenticada.
- A chave `service_role` nunca pode usar prefixo `NEXT_PUBLIC_` nem chegar ao navegador.
- O Claude deve pausar e pedir que o proprietário preencha qualquer campo sensível diretamente na interface oficial.

## 3. Preparar o Supabase

### Banco novo

1. Abrir o SQL Editor do projeto.
2. Executar `supabase/schema.sql` uma única vez.
3. Conferir tabelas, funções, índices, triggers e políticas RLS criadas.
4. Aplicar o seed geográfico aprovado.

### Banco que já recebeu o schema inicial

Executar as migrações na ordem numérica:

1. `supabase/migrations/002_*.sql`
2. `supabase/migrations/003_*.sql`
3. `supabase/migrations/004_*.sql`

Nunca reaplicar o schema integral sobre um banco existente sem revisar efeitos e criar backup.

### Autenticação

Ativar:

- e-mail e senha;
- Google OAuth;
- confirmação de e-mail em produção;
- recuperação de senha;
- proteção contra abuso disponível no plano.

Não ativar Apple.

No Google Cloud, usar como callback do provedor:

```text
https://<PROJECT_REF>.supabase.co/auth/v1/callback
```

Em Supabase Auth, cadastrar URLs autorizadas do aplicativo:

```text
http://localhost:3000/auth/callback
https://<PREVIEW_EXATO>.vercel.app/auth/callback
https://<DOMINIO_OFICIAL>/auth/callback
```

Evitar curingas amplos em produção. Cada preview usado para autenticação deve ser cadastrado de forma controlada.

### Variáveis de ambiente

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAP_TILE_URL=
```

`NEXT_PUBLIC_MAP_TILE_URL` é opcional. Se ausente, usar a configuração de mapa aprovada para testes, respeitando licença e política de uso do provedor.

### Usuário administrador

1. Criar uma conta normal por Google ou e-mail e senha.
2. Obter o UUID em Supabase Auth.
3. Promover esse UUID pela tabela ou função administrativa prevista no schema.
4. Não codificar e-mail administrativo no frontend.
5. Não usar a senha de demonstração antiga em produção.

## 4. Validar RLS e isolamento

Criar dois usuários comuns e um administrador de teste. Verificar:

- usuário A não lê nem altera dados privados do usuário B;
- cada usuário edita apenas o próprio perfil;
- favoritos, relatos e confirmações respeitam autoria;
- funções administrativas recusam usuários comuns;
- operações públicas expõem apenas os campos previstos;
- exclusão de conta remove ou anonimiza o que estiver definido na política de retenção;
- Storage aplica restrições equivalentes às tabelas.

Falha em qualquer teste RLS bloqueia publicação.

## 5. Dados de previsão e mapa

- Manter Open-Meteo apenas como fonte inicial e identificar a origem no produto.
- Guardar horário de atualização e exibir estado atrasado ou indisponível.
- Fazer cache no servidor para não disparar chamadas por usuário.
- Tratar falhas sem inventar valores.
- Confirmar termos de uso e atribuição do mapa antes de monetizar.
- Não usar fotos, ícones ou fontes sem licença compatível com uso comercial.

## 6. Conectar à Vercel

Fluxo recomendado:

1. Subir o repositório para um repositório Git privado.
2. Importar o projeto na Vercel.
3. Confirmar framework Next.js e diretório raiz correto.
4. Não configurar exportação estática.
5. Inserir variáveis separadamente em Development, Preview e Production.
6. Criar primeiro um Preview Deployment.
7. Revisar logs de build e runtime.
8. Testar o preview completo antes de qualquer promoção.

O ambiente de produção só pode ser publicado após aprovação explícita do proprietário.

## 7. Roteiro de teste do preview

Testar em desktop e celular real:

1. Hotsite carrega com marca e imagens corretas.
2. Cadastro por e-mail e senha funciona.
3. Login pelo Google retorna ao callback correto.
4. Confirmação e recuperação de senha funcionam.
5. Usuário sem sessão não acessa páginas protegidas.
6. Home apresenta dados, atualização e tratamento de erro.
7. Praia apresenta ondas, período, direção, energia, maré e vento.
8. Mapa mostra praias nas coordenadas corretas e lista sincronizada.
9. Favoritar persiste após novo login.
10. Perfil pode ser editado e excluído.
11. Comunidade cria, confirma e denuncia relatos conforme regras.
12. Admin exige papel administrativo.
13. Plano Colaborador mostra R$ 9,90 e não simula pagamento real.
14. Banner de cookies permite aceitar, recusar e configurar.
15. Páginas legais estão acessíveis no rodapé e cadastro.
16. Solicitação LGPD funciona e gera protocolo.

## 8. Monetização

O MVP pode mostrar o plano, mas não deve confirmar assinatura sem integração real. Para cobrar:

- criar produto e preço recorrente no Stripe;
- usar Checkout hospedado;
- verificar webhooks e idempotência;
- manter situação da assinatura no banco;
- oferecer cancelamento na área do usuário;
- exibir preço, periodicidade, renovação, benefícios e condições antes da compra;
- revisar documentos legais com profissional qualificado antes da ativação.

## 9. Publicidade

Antes de veicular anúncios pagos:

- identificar claramente conteúdo publicitário;
- registrar anunciante, campanha, período e destino;
- impedir categorias proibidas ou incompatíveis com o público;
- usar métricas agregadas sempre que possível;
- solicitar consentimento antes de cookies de segmentação;
- manter o mote “Anuncie aqui. Fortaleça o movimento surf.”

## 10. Logs, incidentes e recuperação

- Ativar logs de erro sem gravar senha, token, conteúdo privado ou dado excessivo.
- Manter inventário de serviços e responsáveis.
- Criar backup antes de migrações destrutivas.
- Registrar incidentes de segurança por no mínimo cinco anos.
- Avaliar risco e, quando aplicável, comunicar ANPD e titulares no prazo regulamentar.
- Documentar decisão, contenção, correção e prevenção.

## 11. Rollback

Se o preview falhar, corrigir sem promover. Se produção apresentar regressão:

1. interromper mudanças de banco que agravem o incidente;
2. reverter para o deployment estável pela Vercel;
3. preservar logs;
4. avaliar integridade do banco;
5. comunicar usuários quando necessário;
6. corrigir em preview antes de nova promoção.

## 12. Entrega final do Claude

O relatório deve conter:

- URL do preview;
- commit e branch publicados;
- comandos executados e resultados;
- variáveis exigidas, somente os nomes;
- migrações aplicadas;
- testes de RLS realizados;
- pendências de licença, jurídico e pagamento;
- riscos conhecidos;
- instruções exatas para aprovar produção.
