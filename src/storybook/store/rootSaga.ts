import { all } from 'redux-saga/effects'
import { lookupSagas } from '../../lookup/redux/sagas'

export function* rootSaga() {
  yield all([...lookupSagas])
}
