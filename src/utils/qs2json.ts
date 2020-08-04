import * as qs from 'qs'

export function qs2json(queryString: string) {
  let rest = queryString
  const index = queryString.indexOf('?')
  const hashPos = queryString.indexOf('#')

  if (hashPos >= 0) {
    rest = rest.slice(0, hashPos)
  }
  if (index === -1 && queryString.substr(0, 1) === '/') {
    return {}
  } else if (index >= 0) {
    rest = rest.substr(index + 1)
  }

  return qs.parse(rest, { allowDots: true })
}
