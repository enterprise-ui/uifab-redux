import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware,
})

sagaMiddleware.run(rootSaga)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const { rootReducer: newRootReducer } = require('./rootReducer')
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch
