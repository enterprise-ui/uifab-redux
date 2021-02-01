import * as qs from 'qs'

export function json2qs(obj) {
  return qs.stringify(obj, { allowDots: true })
}
