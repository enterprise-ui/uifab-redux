import * as actions from './redux/actions'

import { ILookupLoadQuery, ILookupConfig, ELabelType } from './interfaces/lookup'
import { PayloadAction } from 'typesafe-actions'

export interface ILabelDucksParams extends ILookupConfig {}

type TActions = typeof actions

export interface ILabelActions extends TActions {
  onLoadLookup: (props?: ILookupLoadQuery) => PayloadAction<'LOOKUP/LOAD', ILookupLoadQuery>
}
const presets: Record<ELabelType, Partial<ILookupConfig>> = {
  pageable: {
    method: 'post',
    contentPath: 'content',
    optionValueKey: 'id',
    labelIdsKey: 'uuids',
  },
  paginalWithQuery: {
    method: 'post',
    query: {
      page: 0,
      size: 100,
    },
    labelIdsKey: 'uuids',
  },
  enum: {
    method: 'get',
    optionValueKey: 'key',
  },
}

export const labelDucks = (
  params: ILookupConfig
): {
  labelConfig: ILabelDucksParams
  labelActions: ILabelActions
} => {
  const labelConfig = Object.assign({}, params.type ? presets[params.type] : {}, params)

  const onLoadLookup = (props?: ILookupLoadQuery) =>
    actions.loadLookup.request({ ...labelConfig, ...props })

  return {
    labelConfig,
    labelActions: {
      ...actions,
      onLoadLookup,
    },
  }
}
