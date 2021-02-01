/* global fetch */

// import 'isomorphic-unfetch'
import { json2qs } from './json2qs'
// import convertToFormData from 'object-to-formdata'

const HOST = process.env.HOST || ''

console.log({ HOST })

const handleResponseFile = (response, file) => {
  return response.blob().then((/* blob */) => {
    const defaultFileName = typeof file === 'string' ? file : 'DownloadedFile'
    // const url = window.URL.createObjectURL(blob)
    const fileName = response.headers.get('Content-Disposition')
      ? response.headers.get('Content-Disposition').match(/filename=\"(.*)\"/)[1]
      : defaultFileName

    // console.log({ urlFile: url, response })
    const a = document.createElement('a')
    // a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()

    return response
  })
}

function handleResponse(response, file) {
  if (response.ok) {
    if (file) {
      return handleResponseFile(response, file)
    }

    if (response.status === 202) {
      return null
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json().then((json) => json)
    } else {
      return response.text().then(() => ({}))
    }
  } else {
    return response.json().then((json) => {
      return Promise.reject(
        Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText,
        })
      )
    })
  }
}

export interface IRequestParams {
  url: string
  host?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  type?: string
  headers?: object
  data?: object | string
  file?: boolean | string
  isNotAuthorized?: boolean
}
export type TRequest = (params: IRequestParams) => Promise<any>

export const request: TRequest = (params) => {
  const action: TRequest = (params) => {
    const method = params.method || 'GET'
    const isFormData = params.type === 'form-data'
    const isFormURLEncoded = params.type === 'form-urlencoded'

    let qs = ''
    let body = null
    const defaultHeaders = {
      Accept: 'application/json',
    }
    const userHeaders = params.headers || {}
    const headers = {
      ...defaultHeaders,
      ...userHeaders,
    }

    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }
    if (isFormURLEncoded) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    const data = params.data

    if (isFormData) {
      // body = convertToFormData(data)
    } else if (['GET'].indexOf(method) > -1) {
      // GET
      const query = json2qs(data)
      qs = query ? `?${query}` : ''
    } else {
      // POST or PUT
      body = isFormURLEncoded ? json2qs(data) : JSON.stringify(data)
    }

    const url = (params.host !== undefined ? params.host : HOST) + params.url + qs

    return fetch(url, { method, headers, body }).then((response) =>
      handleResponse(response, params.file)
    )
  }

  return action(params)
}

export const get: TRequest = (params) => request(Object.assign({ method: 'GET' }, params))
export const post: TRequest = (params) => request(Object.assign({ method: 'POST' }, params))
export const put: TRequest = (params) => request(Object.assign({ method: 'PUT' }, params))
export const del: TRequest = (params) => request(Object.assign({ method: 'DELETE' }, params))
export const patch: TRequest = (params) => request(Object.assign({ method: 'PATCH' }, params))
