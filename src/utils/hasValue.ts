/** Возвращает true, если value содержит значение. */
export function hasValue(value): boolean {
  return value !== null && value !== undefined && value !== ''
}
