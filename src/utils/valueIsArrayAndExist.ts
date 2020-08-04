export const valueIsArrayAndExist = (value?: string | string[] | null): value is string[] => {
  if (!value) {
    return false
  }
  if (Array.isArray(value) && value.length) {
    return true
  }
  return false
}
