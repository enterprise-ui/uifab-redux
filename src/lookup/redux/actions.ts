import { createAsyncAction, createAction } from 'typesafe-actions'
import {
  ILoadOptionsQuery,
  ILoadOptionsResponse,
  ILoadOptionsError,
  ILookupLoadQuery,
  ILookupLoadResponse,
  ILookupLoadError,
  IPushLookupItems,
} from '../interfaces/lookup'

export const loadOptions = createAsyncAction(
  'LOOKUP/LOAD_OPTIONS',
  'LOOKUP/LOAD_OPTIONS_SUCCESS',
  'LOOKUP/LOAD_OPTIONS_FAILURE'
)<ILoadOptionsQuery, ILoadOptionsResponse, ILoadOptionsError>()

export const loadLookup = createAsyncAction(
  'LOOKUP/LOAD',
  'LOOKUP/LOAD_SUCCESS',
  'LOOKUP/LOAD_FAILURE'
)<ILookupLoadQuery, ILookupLoadResponse, ILookupLoadError>()

export const pushLookupItems = createAction('LOOKUP/PUSH_LOOKUP_ITEMS')<IPushLookupItems>()
