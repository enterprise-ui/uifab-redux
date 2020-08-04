import { combineReducers } from '@reduxjs/toolkit'
import { lookupReducer } from '../../lookup/redux/reducer'
import { createReducer } from 'typesafe-actions'

export type IState = Record<string, { endpoints: Record<string, string> }>

export const initialState = {
  orderStatuses: {
    endpoints: {
      getAll: 'http://localhost:8081/api/v1/omni-portal-api/orders/statuses',
    },
  },
}

export const rootReducer = combineReducers({
  config: createReducer<IState>(initialState),
  lookup: lookupReducer,
})

export type RootState = ReturnType<typeof rootReducer>
