# Estado atual da implementação

Atualizado em 21 de agosto de 2026.

## Funcional no repositório

- Hotsite, login, cadastro, recuperação de senha e nova senha.
- Login por Google ou e-mail e senha via Supabase.
- Proteção de rotas e verificação da função `admin` no servidor.
- Home autenticada e páginas de praia com previsão real da Open-Meteo.
- Gráficos de nível do mar, ondas e vento com fallback demonstrativo.
- Mapa MapLibre com tiles OpenStreetMap, coordenadas reais, atribuição e lista seletora.
- Dez praias de Salvador com fotos editoriais.
- Perfil editável, alertas e até cinco praias favoritas.
- Comunidade com relatos, confirmações e persistência.
- Admin com estatísticas, moderação, praias, anúncios e saúde das fontes.
- Página de planos, valor Colaborador de R$ 9,90 e lista de interesse.
- Schema Supabase completo e migrações incrementais.
- Oito testes de jornada, compilação e auditoria de dependências.

## Modo demonstração

Sem variáveis do Supabase, o produto abre com dados locais para avaliação. Nenhuma credencial administrativa falsa é necessária. Com as variáveis configuradas, as rotas internas exigem login e o admin exige `profiles.role = 'admin'`.

## Dependências externas do responsável

1. Criar o projeto Supabase e executar `supabase/schema.sql`.
2. Configurar Google OAuth no Google Cloud e no Supabase.
3. Definir as variáveis descritas em `.env.example`.
4. Criar a conta no provedor de pagamentos escolhido.
5. Definir licença comercial para previsão, hospedagem e tiles antes de monetizar.
6. Fornecer domínio e e-mails reais de suporte, privacidade e anúncios.

## Ordem restante para lançamento público

1. Validar login e banco no projeto Supabase real.
2. Substituir ou licenciar as fotos editoriais definitivas.
3. Criar Termos de Uso e Política de Privacidade.
4. Escolher o provedor de pagamentos e implementar checkout e webhook.
5. Configurar SMTP transacional.
6. Executar testes de RLS no banco real e testes em celulares físicos.
7. Publicar preview na Vercel e validar o domínio.
8. Ativar monetização somente após revisar licenças comerciais.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm test
```

O desenvolvimento local usa `http://localhost:3001` quando essa porta está livre.
