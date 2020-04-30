import { put, call, all, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { getHistoricDataReuestInProgress, getHistoricDataReuestSuccess, getHistoricDataReuestError } from './actions';
import { HistoricDataAPI } from '../api/HistoricDataAPI';
import { HistoricRecord } from '../api/HistoricDataAPI.types';
import { AnalyticsActionTypes } from './actionTypes';

function* getHistoricData() {
    yield put(getHistoricDataReuestInProgress());
    try {
        const response: HistoricRecord[] = call(HistoricDataAPI.getHistoricData);
        yield put(getHistoricDataReuestSuccess(response));
    }
    catch(error: AxiosError) {
        yield put((getHistoricDataReuestError(error.message)));
    }
}

export function* historicDataActionWatcher () {
    yield all([
        takeLatest(AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_IN_PROGRESS, getHistoricData)
    ])
}