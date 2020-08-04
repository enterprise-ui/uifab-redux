import { IProcessState } from '../../interfaces/redux'

export type TLookupInputValue = string | string[] | null | undefined
export type TLookup = Record<string, object>
export enum ELabelType {
  pageable = 'pageable',
  paginalWithQuery = 'paginalWithQuery',
  enum = 'enum',
}
export interface ILookupConfig {
  endpointName: string
  endpointBranch?: string
  templateResolver?: object
  label?: string
  type?: ELabelType
  labelFilter?: object
  selectFilter?: object
  filter?: object
  contentPath?: string
  viewField?: string
  valueField?: string
  selectKey?: string
  isMultiSelect?: boolean
  method?: string
  query?: object
  requestBody?: object
  selectFilterOptions?: <T>(options: T[]) => T[]
  selectRequestBuilder?(text: string, props?: object): object
  labelRequestBuilder?(values: string | string[], props?: object): object
}

export interface ILookupLoadQuery extends ILookupConfig {
  value?: string | string[]
}
export interface ILookupLoadResponse {
  value?: string | string[]
  requestBody: Record<string, string | undefined>
  endpointName: string
  lookupValue: TLookup
}
export interface ILookupLoadError {
  endpointName: string
  error: Error
}

export interface ILoadOptionsQuery extends ILookupConfig {
  text?: string
  name: string
}
export interface ILoadOptionsResponse {
  requestBody: Record<string, string | undefined>
  loadedData: object[]
  endpointName: string
  name: string
  options: object[]
}
export interface ILoadOptionsError {
  endpointName: string
  name: string
  error: Error
}

export interface IPushLookupItems {
  endpointName: string
  options: object[]
  selectKey?: string
}

export interface ILabelProps extends ILoadOptionsQuery {
  value: TLookupInputValue
  noLoad?: boolean
  mod?: string
  labelFilter?: object
  filter?: object
  lookupItem?: object // from connect
  lookupIsExist?: boolean // from connect
  process: IProcessState // from connect
  onLoadLookup(): void // from connect
}

export interface ISelectBaseProps extends ILoadOptionsQuery {
  value: TLookupInputValue
  placeholder?: string
  label?: string
  mod?: string
  isReversed?: boolean
  isLoading: boolean // from connect
  options?: object[] // from connect
  loadedData: object[] // from connect
  currentOption: object // from connect
  onChange?(value: TLookupInputValue, currentOption?: object): void // from connect
  onLoadOptions?(text?: string): void // from connect
}

export interface ISelectProps extends Partial<ILoadOptionsQuery> {
  value?: TLookupInputValue
  placeholder?: string
  label?: string
  mod?: string
  isReversed?: boolean
  onChange?(value: TLookupInputValue): void
}
