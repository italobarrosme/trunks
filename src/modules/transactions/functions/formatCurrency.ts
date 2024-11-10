export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatCurrencyStrigToDecimal = (value: string): number => {
  return parseFloat(value.replace('R$', '').replace(',', '.'))
}