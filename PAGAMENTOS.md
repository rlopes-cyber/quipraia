# Pagamentos do plano Colaborador

O produto e o banco estão preparados para o plano Colaborador de R$ 9,90 por mês. A cobrança ainda não está ativa porque depende da escolha e da abertura de uma conta em um provedor de pagamentos.

## O que já está pronto

- Plano Gratuito e plano Colaborador apresentados no hotsite e na página de planos.
- Tabela `subscriptions` independente de provedor.
- Estados de assinatura para ativação, atraso e cancelamento.
- Lista de interesse persistida para usuários autenticados.
- Campo `plan` protegido no perfil. O navegador não pode transformar um usuário em Colaborador.

## O que falta para cobrar

1. Escolher Stripe ou um provedor brasileiro com Pix e cartão recorrente.
2. Criar a conta comercial e concluir a verificação cadastral.
3. Criar o preço mensal de R$ 9,90 no painel do provedor.
4. Cadastrar as chaves apenas na Vercel.
5. Implementar checkout e webhook assinado para atualizar `subscriptions` e `profiles.plan`.
6. Testar pagamento, renovação, atraso, cancelamento e reembolso no ambiente de testes.

## Regra de segurança

O acesso Colaborador só deve ser liberado depois de um webhook assinado pelo provedor. O retorno visual do checkout não é prova de pagamento. Chaves secretas nunca devem usar o prefixo `NEXT_PUBLIC_`.

## Caminho sugerido

Para validar rapidamente uma assinatura internacional, Stripe Checkout reduz a implementação e transfere o formulário de pagamento ao provedor. Para priorizar Pix e operação brasileira, a comparação com Mercado Pago ou Asaas deve considerar recorrência, tarifa, conciliação e experiência de cancelamento antes da escolha.
