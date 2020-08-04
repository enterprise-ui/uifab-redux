import { TLookup } from '../interfaces/lookup'

export const reduceLookup = (lookup: Record<string, any>[], selectKey?: string): TLookup => {
  console.log('reduceLookup func', { lookup, selectKey })
  return lookup.reduce((result, item) => {
    result[item[selectKey || 'id']] = item
    return result
  }, {})
}
