# Checklist final de engenharia

Nenhum item pode ser marcado sem evidência verificável.

## Runtime e migração

- [ ] Scripts usam `next dev`, `next build` e `next start`.
- [ ] Vinext, Vite e Cloudflare foram removidos do runtime.
- [ ] `next-env.d.ts` é o arquivo padrão do Next.js.
- [ ] MapLibre funciona sem importação Vite `?worker&url`.
- [ ] Middleware/proxy protege rotas sem loop de redirecionamento.
- [ ] Build nativo do Next.js termina sem erro.

## Marca e interface

- [ ] Logo oficial vem de `public/brand/final/`.
- [ ] Sora e Inter estão carregadas corretamente.
- [ ] Cores 3C usam os tokens aprovados.
- [ ] Ícones canônicos mantêm traço, proporção e coral de destaque.
- [ ] Nenhuma onda genérica, pin genérico ou clipart foi introduzido.
- [ ] Fotos das praias têm licença e crédito documentados.
- [ ] Preço Colaborador é R$ 9,90 por mês.
- [ ] Não há login Apple.
- [ ] Não há travessão no conteúdo visível.

## Supabase e autenticação

- [ ] Cadastro por Google funciona.
- [ ] Cadastro por e-mail e senha funciona.
- [ ] Confirmação de e-mail funciona em produção.
- [ ] Recuperação de senha funciona.
- [ ] Logout encerra a sessão.
- [ ] Perfil persiste no banco.
- [ ] Admin depende de papel seguro, não de e-mail no frontend.
- [ ] Chave `service_role` não chega ao navegador.
- [ ] RLS foi testada com dois usuários e um admin.

## Produto e dados

- [ ] Dez praias têm coordenadas e ordem geográfica revisadas.
- [ ] Open-Meteo é consultado no servidor e possui cache.
- [ ] Origem e horário de atualização aparecem no produto.
- [ ] Dados ausentes não são substituídos por números inventados.
- [ ] Maré, ondas e vento têm gráficos e informações específicas.
- [ ] Mapa e lista permanecem sincronizados.
- [ ] Favoritos persistem.
- [ ] Comunidade permite criar, confirmar e denunciar relatos.
- [ ] Perfil permite edição, exportação e exclusão de conta.
- [ ] Admin permite moderação e auditoria.

## Legal e LGPD

- [ ] Dados reais do controlador substituíram todos os placeholders.
- [ ] Política de Privacidade foi revisada por responsável qualificado.
- [ ] Termos de Uso foram revisados por responsável qualificado.
- [ ] Política de Cookies reflete os cookies realmente usados.
- [ ] Cookies não essenciais ficam bloqueados até uma escolha válida.
- [ ] Usuário pode recusar cookies não essenciais com a mesma facilidade de aceitar.
- [ ] Aceite registra documento, versão, horário e usuário.
- [ ] Cadastro exige aceite dos Termos e da Política de Privacidade.
- [ ] Consentimentos opcionais são separados do aceite obrigatório.
- [ ] Canal de direitos do titular está publicado e funcional.
- [ ] Solicitações geram protocolo e trilha administrativa.
- [ ] Exclusão e exportação respeitam autenticação reforçada.
- [ ] Matriz de retenção foi configurada.
- [ ] Procedimento de incidente foi documentado.
- [ ] Regras da comunidade e política de anúncios estão publicadas.
- [ ] Aviso de previsão e segurança aparece em pontos relevantes.
- [ ] Fluxo de assinatura exibe preço, renovação e cancelamento.

## Acessibilidade

- [ ] Contraste atende WCAG 2.1 AA.
- [ ] Navegação por teclado funciona.
- [ ] Foco é visível.
- [ ] Alvos de toque têm pelo menos 44 por 44 px.
- [ ] Gráficos possuem resumo ou tabela acessível.
- [ ] Mapa possui lista alternativa sincronizada.
- [ ] Erros de formulário são anunciados e ficam junto ao campo.
- [ ] Movimento reduzido é respeitado.

## Qualidade

- [ ] `npm run lint` passou.
- [ ] `npm run typecheck` passou.
- [ ] `npm test` passou.
- [ ] `npm run build` passou.
- [ ] Testes de autenticação passaram.
- [ ] Testes de RLS passaram.
- [ ] Testes de rotas protegidas passaram.
- [ ] Testes de estados vazio, loading, erro e offline passaram.
- [ ] Auditoria de dependências não apresenta vulnerabilidade crítica.
- [ ] Nenhuma credencial está no Git.

## Vercel Preview

- [ ] Projeto foi importado como Next.js.
- [ ] Variáveis foram separadas por ambiente.
- [ ] Preview possui callback Supabase autorizado.
- [ ] Build e logs de runtime foram revisados.
- [ ] Fluxo completo foi testado em desktop.
- [ ] Fluxo completo foi testado em celular real.
- [ ] Métricas básicas e monitoramento estão ativos.

## Bloqueios de produção

- [ ] Domínio e DNS foram aprovados.
- [ ] Dados empresariais e canal jurídico estão definidos.
- [ ] Licenças de fontes, fotos, ícones, mapas e APIs foram validadas.
- [ ] Política de backup e restauração foi testada.
- [ ] Plano de resposta a incidentes possui responsável.
- [ ] Cobrança real está desativada até a revisão comercial e jurídica.
- [ ] Proprietário aprovou explicitamente a promoção para produção.

## Relatório final

- [ ] URL do preview informada.
- [ ] Branch e commit informados.
- [ ] Evidências de testes anexadas.
- [ ] Migrações e variáveis necessárias listadas sem valores secretos.
- [ ] Pendências e riscos descritos com responsável e próximo passo.
