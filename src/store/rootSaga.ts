import { all } from 'redux-saga/effects';
import { historicDataActionWatcher } from '../modules/analytics/store/sagas';

export function* rootSaga() {
    yield all([
      historicDataActionWatcher()
    ])
}