import { IProcessState } from '../../interfaces/redux'

export type TLookupInputValue = string | string[] | null | undefined
export type TLookup = Record<string, object>
export enum ELabelType {
  pageable = 'pageable',
  paginalWithQuery = 'paginalWithQuery',
  enum = 'enum',
}
export interface ILookupConfig {
  /** Имя эндпоинта */
  endpointName: string
  /** Объект с параметрами для адресного шаблона */
  templateResolver?: object
  /** Текст для подписи селекта */
  label?: string
  /** Пресет конфигурации */
  type?: ELabelType
  /**
   * Объект с параметрами фильтрации запрашиваемого списка.
   * Включается в запрос разыменования начального значения
   */
  labelFilter?: object
  /**
   * Объект с параметрами фильтрации запрашиваемого списка.
   * Включается в запросы для получения списка опций
   */
  selectFilter?: object
  /**
   * Объект с параметрами фильтрации запрашиваемого списка.
   * Включается во все запросы
   * */
  filter?: object
  /** Путь до массива с данными в структуре ответа сервера */
  contentPath?: string
  /** Ключ, в который кладем вводимый пользователем поисковый запрос */
  selectSearchKey?: string
  /** Ключ, в который кладем массив разыменовываемых id (ids, uuids, ...) */
  labelIdsKey?: string
  /** Ключ, в котором находится значение выбираемой опции */
  optionValueKey?: string
  isMultiSelect?: boolean
  method?: string
  query?: object
  requestBody?: object
  /** Функция преобразования вернувшихся от сервера опций */
  responseOptionsTransform?: <T>(options: T[]) => T[]
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
  optionValueKey?: string
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
  mod?: string
  isReversed?: boolean
  isLoading: boolean // from connect
  options?: object[] // from connect
  loadedData: object[] // from connect
  currentOption: object // from connect
  onChange?(value: TLookupInputValue, currentOption?: object): void // from connect
  onLoadOptions?(text?: string): void // from connect
}
