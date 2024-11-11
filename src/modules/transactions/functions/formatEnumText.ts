export const formatEnumText = <T extends object>(
  enumObj: T,
  key: keyof T
): string => {
  return enumObj[key] as string
}
