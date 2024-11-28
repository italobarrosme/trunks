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
  CASH = 'Dinheiro',
  DEBIT_CARD = 'Débito',
  CREDIT_CARD = 'Cartão de Crédito',
  BANK_TRANSFER = 'Transferência Bancária',
  BANK_SLIP = 'Boleto Bancário',
  PIX = 'PIX',
  PAYPAL = 'Paypal',
  BITCOIN = 'Bitcoin',
  CRYPTO = 'Criptomoeda',
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
