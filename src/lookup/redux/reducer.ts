import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import get from 'lodash/get'
import { reduceLookup } from '../utils/reduceLookup'
// import {
//   ILoadOptionsQuery,
//   ILoadOptionsResponse,
//   ILoadOptionsError,
//   ILookupLoadQuery,
//   ILookupLoadResponse,
//   ILookupLoadError,
//   IPushLookupItems,
// } from '../interfaces/lookup'

type Action = ActionType<typeof actions>

export interface IState {
  error?: Error
}

export const initialState = {
  error: undefined,
}

export const lookupReducer = createReducer<IState, Action>(initialState)
  //pushLookupItems
  .handleAction(actions.pushLookupItems, (state, action) => {
    const { endpointName, options, selectKey } = action.payload

    return {
      ...state,
      [endpointName]: {
        ...state[endpointName],
        items: {
          ...get(state, `${endpointName}.items`, {}),
          ...reduceLookup(options, selectKey),
        },
      },
    }
  })
  //loadLookup
  .handleAction(actions.loadLookup.request, (state, action) => {
    const { endpointName } = action.payload
    return {
      ...state,
      [endpointName]: {
        ...state[endpointName],
        process: {
          isLoading: true,
        },
      },
    }
  })
  .handleAction(actions.loadLookup.success, (state, action) => {
    const { endpointName, lookupValue } = action.payload

    return {
      ...state,
      [endpointName]: {
        ...state[endpointName],
        process: {
          isLoading: false,
          isLoaded: true,
        },
        items: {
          ...get(state, `${endpointName}.items`, {}),
          ...lookupValue,
        },
      },
    }
  })
  .handleAction(actions.loadLookup.failure, (state, action) => {
    const { endpointName, error } = action.payload

    return {
      ...state,
      [endpointName]: {
        ...state[endpointName],
        error,
        process: {},
      },
    }
  })
  //loadOptions
  .handleAction(actions.loadOptions.request, (state, action) => {
    const { endpointName, name } = action.payload

    return {
      ...state,
      [endpointName]: {
        ...state[endpointName],
        [name]: {
          ...get(state, `${endpointName}.${name}`, {}),
          process: {
            isLoading: true,
          },
        },
      },
    }
  })
  .handleAction(actions.loadOptions.success, (state, action) => {
    const { endpointName, name, options, loadedData, requestBody } = action.payload

    return {
      ...state,
      [endpointName]: {
        ...state[endpointName],
        [name]: {
          ...get(state, `${endpointName}.${name}`, {}),
          requestBody,
          options,
          loadedData,
          process: {
            isLoading: false,
            isLoaded: true,
          },
        },
      },
    }
  })
  .handleAction(actions.loadOptions.failure, (state, action) => {
    const { endpointName, name, error } = action.payload

    return {
      ...state,
      [endpointName]: {
        ...state[endpointName],
        [name]: {
          error,
          process: {},
        },
      },
    }
  })

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// export interface IState {
//   id: string
//   text: string
//   completed: boolean
// }

// const todosSlice = createSlice({
//   name: 'lookup',
//   initialState: [] as IState[],
//   reducers: {
//     pushLookupItems(state, action: PayloadAction<IPushLookupItems>) {
//       const { endpointName, options, selectKey } = action.payload

//       state[endpointName].items = {
//         ...get(state, `${endpointName}.items`, {}),
//         ...reduceLookup(options, selectKey),
//       }
//     },
//   },
// })

// export const { addTodo, toggleTodo } = todosSlice.actions

// export const { reducer: todosReducer } = todosSlice
