// Função para transformar o enum em um array de opções
export const getEnumOptions = <T extends object>(
  enumObj: T
): { value: keyof T; label: string }[] => {
  return Object.entries(enumObj).map(([key, value]) => ({
    value: key as keyof T,
    label: value as string,
  }))
}
