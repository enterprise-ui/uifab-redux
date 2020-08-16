import * as actions from './redux/actions'
import { ELabelType, ILookupConfig, ILoadOptionsQuery, IPushLookupItems } from './interfaces/lookup'
import { PayloadAction } from 'typesafe-actions'

export interface ISelectDucksParams extends ILookupConfig {
  optionValueKey: string
}
type TActions = typeof actions
export interface ISelectActions extends TActions {
  onLoadOptions: (
    props: ILoadOptionsQuery
  ) => PayloadAction<'LOOKUP/LOAD_OPTIONS', ILoadOptionsQuery>
  pushItems: (currentOption: object) => PayloadAction<'LOOKUP/PUSH_LOOKUP_ITEMS', IPushLookupItems>
}

const presets: Record<ELabelType, Partial<ILookupConfig>> = {
  pageable: {
    method: 'post',
    contentPath: 'content',
    optionValueKey: 'id',
  },
  paginalWithQuery: {
    method: 'post',
    query: {
      page: 0,
      size: 100,
    },
  },
  enum: {
    method: 'get',
    optionValueKey: 'key',
  },
}

export const selectDucks = (
  params: ILookupConfig
): {
  selectConfig: ISelectDucksParams
  selectActions: ISelectActions
} => {
  const selectConfig: ISelectDucksParams = Object.assign({}, presets[params.type || ''], params)

  const onLoadOptions = (props: ILoadOptionsQuery) =>
    actions.loadOptions.request({
      ...selectConfig,
      ...props,
    })

  const pushItems = (currentOption) =>
    actions.pushLookupItems({
      endpointName: selectConfig.endpointName,
      options: selectConfig.isMultiSelect ? currentOption : [currentOption],
      optionValueKey: selectConfig.optionValueKey,
    })

  return {
    selectConfig,
    selectActions: {
      ...actions,
      onLoadOptions,
      pushItems,
    },
  }
}
