export const COLUMN_HEADERS_TABLE = [
  'Nome',
  'Tipo',
  'Categoria',
  'Método de pagamento',
  'Data',
  'Valor',
  'Ações',
]

export enum PAYMENT_METHOD_TRANSLATION {
  PIX = 'PIX',
  CREDIT_CARD = 'Cartão de Crédito',
  BANK_SLIP = 'Boleto Bancário',
  PAYPAL = 'Paypal',
  BITCOIN = 'Bitcoin',
  CRYPTO = 'Criptomoeda',
  DEBIT_CARD = 'Débito',
  BANK_TRANSFER = 'Transferência Bancária',
  CASH = 'Dinheiro',
  OTHER = 'Outro',
}

export enum TRANSACTION_CATEGORY_TRANSLATION {
  SALARY = 'Salário',
  CRYPTO = 'Criptomoeda',
  FREELANCE = 'Freelance',
  BONUS = 'Bônus',
  HOUSING = 'Moradia',
  FOOD = 'Alimentação',
  TRANSPORT = 'Transporte',
  SHOPPING = 'Compras',
  ENTERTAINMENT = 'Entretenimento',
  UTILITY = 'Utilidades',
  INSURANCE = 'Seguro',
  TAXES = 'Impostos',
  HEALTH = 'Saúde',
  EDUCATION = 'Educação',
  OTHER = 'Outro',
}

export enum TRANSACTION_TYPE_TRANSLATION {
  INCOME = 'Ganho',
  EXPENSE = 'Despesa',
  RECURRING_EXPENSE = 'Despesa Recorrente',
  INVESTMENT = 'Investimento',
}

export enum TRANSACTION_STATUS_TRANSLATION {
  PENDING = 'Pendente',
  PAID = 'Pago',
  CANCELED = 'Cancelado',
  OVERDUE = 'Atrasado',
}
