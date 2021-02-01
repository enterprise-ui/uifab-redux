import template from 'url-template'
import get from 'lodash/get'
import * as api from '../../utils/api'
import { getType } from 'typesafe-actions'
import { select, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { loadOptions, loadLookup } from './actions'
import { json2qs } from '../../utils/json2qs'
import { reduceLookup } from '../utils/reduceLookup'

import {
  ILabelProps,
  ELabelType,
  ILoadOptionsQuery,
  ILookupLoadQuery,
  ISelectBaseProps,
} from '../interfaces/lookup'

const requestBuilders = {
  enum: {
    label: () => {},
    select: (text: string) => ({ q: text }),
  },
  pageable: {
    label: (value: string[], props: ILabelProps) => {
      const { labelIdsKey, filter, labelFilter } = props
      let newValue = value

      if (labelIdsKey === 'uuids' || labelIdsKey === 'ids') {
        newValue = Array.isArray(value) ? value : [value]
      }

      return {
        [String(labelIdsKey)]: newValue,
        pageSize: 50,
        pageNumber: 0,
        ...filter,
        ...labelFilter,
      }
    },
    select: (text: string, props: ISelectBaseProps) => {
      const { selectSearchKey, filter, selectFilter } = props

      return {
        [String(selectSearchKey)]: text,
        pageSize: 50,
        pageNumber: 0,
        ...filter,
        ...selectFilter,
      }
    },
  },
  paginalWithQuery: {
    label: (value: string[], props: ILabelProps) => {
      const { labelIdsKey, filter, labelFilter } = props
      let newValue = value

      if (labelIdsKey === 'uuids') {
        newValue = Array.isArray(value) ? value : [value]
      }

      return {
        [String(labelIdsKey)]: newValue,
        ...filter,
        ...labelFilter,
      }
    },
    select: (text: string, props: ISelectBaseProps) => {
      const { selectSearchKey, filter, selectFilter } = props

      return {
        [String(selectSearchKey)]: text,
        ...filter,
        ...selectFilter,
      }
    },
  },
}

function* getSelectRequestParams(payload: ILoadOptionsQuery) {
  const {
    endpointName,
    type,
    requestBody,
    selectRequestBuilder,
    templateResolver,
    text,
    ...otherProps
  } = payload

  const loadingNotNeeded = false

  const requestData =
    requestBody ||
    (selectRequestBuilder && text
      ? selectRequestBuilder(text, otherProps)
      : requestBuilders[String(type)].select(text, otherProps))

  const lookupUrl = yield select((state) => get(state, `restConfig.${endpointName}.getAll`, ''))
  const url = templateResolver ? template.parse(lookupUrl).expand(templateResolver) : lookupUrl

  return { requestData, url, isLoaded: loadingNotNeeded }
}
function* getLabelRequestParams(payload: ILookupLoadQuery) {
  const {
    endpointName,
    type,
    requestBody,
    selectRequestBuilder,
    labelRequestBuilder,
    templateResolver,
    value,
    ...otherProps
  } = payload

  let loadingNotNeeded = false

  const { isLoaded } = yield select((state) => get(state, `lookup.${endpointName}.process`, {}))

  if (type === ELabelType.enum && isLoaded) {
    loadingNotNeeded = true
  }

  const requestData =
    requestBody ||
    (labelRequestBuilder && value
      ? labelRequestBuilder(value, otherProps)
      : requestBuilders[String(type)].label(value, otherProps))

  const lookupUrl = yield select((state) => get(state, `restConfig.${endpointName}.getAll`, ''))
  const url = templateResolver ? template.parse(lookupUrl).expand(templateResolver) : lookupUrl

  return { requestData, url, isLoaded: loadingNotNeeded }
}

export function* loadSelectSaga(action: ReturnType<typeof loadOptions.request>) {
  const {
    endpointName,
    method,
    query,
    contentPath,
    name,
    responseOptionsTransform,
  } = action.payload

  try {
    const { requestData, url } = yield getSelectRequestParams(action.payload)
    const loadedData = yield api[method || 'get']({
      url: query ? `${url}?${json2qs(query)}` : url,
      data: requestData,
    })

    const options = contentPath ? get(loadedData, contentPath) : loadedData

    console.log('asyncSelect loaded', {
      options: responseOptionsTransform ? responseOptionsTransform(options) : options,
      loadedData,
      name: endpointName,
      requestBody: requestData,
    })

    yield put(
      loadOptions.success({
        options: responseOptionsTransform ? responseOptionsTransform(options) : options,
        loadedData,
        endpointName,
        name,
        requestBody: requestData,
      })
    )
  } catch (error) {
    yield put(loadOptions.failure({ endpointName, name, error }))
  }
}

export function* loadLabelSaga(action: ReturnType<typeof loadLookup.request>) {
  const { endpointName, method, query, contentPath, optionValueKey, value } = action.payload

  try {
    const { requestData, url, isLoaded } = yield getLabelRequestParams(action.payload)

    if (!isLoaded) {
      const loadedData = yield api[method || 'get']({
        url: query ? `${url}?${json2qs(query)}` : url,
        data: requestData,
      })

      const lookupValue = reduceLookup(
        contentPath ? get(loadedData, contentPath) : loadedData,
        optionValueKey
      )

      console.log('Label loaded', {
        lookupValue,
        loadedData,
        endpointName,
        requestBody: requestData,
      })
      yield put(
        loadLookup.success({
          value, // Для поиска момента завершения саги
          lookupValue,
          endpointName,
          requestBody: requestData,
        })
      )
    } else {
      yield put(
        loadLookup.success({
          lookupValue: {},
          endpointName,
          requestBody: requestData,
        })
      )
    }
  } catch (error) {
    console.log({ endpointName, error })
    yield put(loadLookup.failure({ endpointName, error }))
  }
}

export const lookupSagas = [
  takeLatest(getType(loadOptions.request), loadSelectSaga),
  takeEvery(getType(loadLookup.request), loadLabelSaga),
]
