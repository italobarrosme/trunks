export const formatTranslation = <T>(key: keyof T, enumObject: T): string => {
  return String(enumObject[key] ?? 'Chave não encontrada')
}
