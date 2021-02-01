import { TLookup } from '../interfaces/lookup'

export const reduceLookup = (lookup: Record<string, any>[], optionValueKey?: string): TLookup => {
  console.log('reduceLookup func', { lookup, optionValueKey })
  return lookup.reduce((result, item) => {
    result[item[optionValueKey || 'id']] = item
    return result
  }, {})
}
