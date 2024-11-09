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
  PAYPAL = 'Paypal',
  PIX = 'PIX',
  BITCOIN = 'Bitcoin',
  CRYPTO = 'Criptomoeda',
  OTHER = 'Outro',
}

export enum TRANSACTION_CATEGORY_TRANSLATION {
  HOUSING = 'Moradia',
  FOOD = 'Alimentação',
  TRANSPORT = 'Transporte',
  SHOPPING = 'Compras',
  ENTERTAINMENT = 'Entretenimento',
  UTILITY = 'Utilidades',
  RENT = 'Aluguel',
  MORTGAGE = 'Hipoteca',
  INSURANCE = 'Seguro',
  TAXES = 'Impostos',
  HEALTH = 'Saúde',
  EDUCATION = 'Educação',
  INVESTMENT = 'Investimento',
  OTHER = 'Outro',
}
