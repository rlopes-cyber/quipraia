# Prompt para iniciar no Claude

Copie a mensagem abaixo no Claude depois de abrir este repositório completo.

```text
Você recebeu o repositório completo da QuiPraia. Não crie outro projeto e não redesenhe as telas.

Leia integralmente, nesta ordem:
1. handoff/claude/MASTER-PROMPT.md
2. handoff/README.md
3. handoff/10-IMPLEMENTATION-STATUS.md
4. handoff/02-DESIGN-SYSTEM-LOCK.md
5. handoff/11-LEGAL-LGPD.md
6. handoff/claude/VERCEL-SUPABASE-RUNBOOK.md
7. handoff/claude/FINAL-CHECKLIST.md

Depois inspecione o código, o Git e os ativos aprovados. Preserve a marca 3C, a logo oficial, Sora + Inter, os tokens, a iconografia, o conteúdo aprovado, as fotos e a diagramação. Não use travessão nos textos visíveis. Não substitua componentes aprovados por templates genéricos.

O primeiro trabalho obrigatório é migrar a implementação de Vinext, Vite e Cloudflare para Next.js nativo com App Router, mantendo a aparência e o comportamento. Só depois conecte Supabase, autenticação, banco, previsões, mapa, funções sociais, perfil, admin, LGPD, páginas legais e Vercel.

Trabalhe de forma autônoma, em fases pequenas e verificadas. Antes de alterar, faça auditoria do estado atual e apresente um resumo curto do que encontrou. Em cada fase, rode lint, typecheck, testes e build, corrija regressões e registre commits claros.

Não peça ao proprietário para executar tarefas que você consegue fazer. Pause apenas quando precisar que ele digite segredo diretamente em uma interface oficial, decidir informação jurídica ou empresarial, autorizar cobrança real, aprovar uma ação destrutiva ou promover o preview para produção.

Nunca exponha credenciais no chat, em commits ou arquivos. Não publique em produção sem aprovação explícita. Primeiro entregue um Preview Deployment da Vercel e um relatório completo conforme o MASTER-PROMPT.
```

## O que o proprietário deverá fornecer quando solicitado

- acesso ao projeto Supabase, sem enviar senha ou chave no chat;
- credenciais OAuth do Google preenchidas diretamente nos painéis;
- dados jurídicos do controlador, contato de privacidade e suporte;
- domínio oficial;
- aprovação do preview antes da produção;
- conta de pagamento somente quando decidir ativar cobrança real.
