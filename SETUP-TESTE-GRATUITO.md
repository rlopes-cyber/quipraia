# QuiPraia: configuração gratuita para teste

O projeto já funciona localmente em modo de demonstração. Para testar cadastro, login e interação entre usuários com dados persistentes, conecte um projeto gratuito do Supabase.

## 1. Criar o banco

1. Crie um projeto no Supabase.
2. Abra o SQL Editor.
3. Execute o arquivo `supabase/schema.sql`.
4. Em Authentication, habilite Email e Google.

O banco inclui perfis, praias favoritas, relatos e confirmações. As políticas RLS impedem que um usuário altere dados pertencentes a outro.

Se o banco já foi criado com uma versão anterior, execute apenas os arquivos novos da pasta `supabase/migrations`, seguindo a ordem numérica. A migração 002 aplica o limite de cinco praias favoritas, a 003 prepara a operação administrativa e a 004 cria a fundação do plano Colaborador.

## 2. Configurar o Google

1. Crie credenciais OAuth no Google Cloud Console.
2. No Google, use como URI autorizada a URL do Supabase no formato `https://SEU-PROJETO.supabase.co/auth/v1/callback`.
3. Informe Client ID e Client Secret apenas no painel do Supabase.
4. No Supabase, configure `http://localhost:3001/auth/callback` e a URL de produção em Redirect URLs.

O usuário poderá entrar pelo Google ou criar conta com e-mail e senha.

## 3. Variáveis locais

Copie `.env.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica-anon
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAP_TILE_URL=https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

A chave pública anon pode ser usada no navegador porque a proteção real está nas políticas RLS. Nunca exponha a service role key.

`NEXT_PUBLIC_MAP_TILE_URL` é opcional. O valor padrão usa o mapa público do OpenStreetMap apenas para visualização interativa normal no piloto. A atribuição permanece visível e o projeto não implementa download offline ou pré-carregamento. Para uma operação com tráfego comercial, substitua essa URL por um provedor de tiles com garantia e limites adequados.

## 4. Rodar o teste

```bash
npm install
npm run dev
```

Abra `http://localhost:3001`. Sem as variáveis, o sistema mantém o modo de demonstração. Com as variáveis, login por Google e e-mail usam o Supabase.

Rotas internas como `/app`, `/mapa`, `/comparar`, `/comunidade`, `/perfil` e `/praias` passam a exigir uma sessão válida. O painel `/admin` também exige que o perfil tenha a função `admin`.

## 5. Definir o administrador

Depois de criar sua conta normalmente, execute no SQL Editor, substituindo o e-mail:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'seu-email@exemplo.com');
```

Não crie senha administrativa no código e não exponha a chave `service_role` no navegador.

## 6. Publicar na Vercel

Cadastre as mesmas três variáveis nas configurações do projeto na Vercel. Troque `NEXT_PUBLIC_SITE_URL` pelo domínio final e inclua essa URL nas URLs permitidas do Supabase e do Google.

## Limite desta etapa

A interface já está pronta e a previsão da Open-Meteo já é consultada pelo endpoint `/api/forecast`. Com o Supabase configurado, perfil, favoritos, relatos e confirmações usam o banco. Sem configuração, essas telas preservam dados demonstrativos para avaliação visual. Pagamento e cobrança de R$ 9,90 ficam para a etapa seguinte, pois exigem uma conta em um provedor de pagamentos.
