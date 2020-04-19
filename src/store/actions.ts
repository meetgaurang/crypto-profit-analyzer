import { AxiosError } from 'axios';
import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AnalyticsActionTypes } from './actionTypes';
import { HistoricRecord } from '../api/HistoricDataAPI.types';
import { HistoricDataAPI } from '../api/HistoricDataAPI';
import { HistoricDataReuestType, AnalyticsStore } from './types';

export function getHistoricDataReuestInProgress(): HistoricDataReuestType {
    return {
        type: AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_IN_PROGRESS,
        payload: undefined
    };
}

export function getHistoricDataReuestSuccess(response: HistoricRecord[]): HistoricDataReuestType {
    return {
        type: AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_SUCCESS,
        payload: response,
    };
}

export function getHistoricDataReuestError(errorMessage: string): HistoricDataReuestType {
    return {
        type: AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_FAILURE,
        payload: errorMessage,
    };
}

export function getHistoricData(): ThunkAction<void, AnalyticsStore, null, Action<AnalyticsActionTypes>> {
    return function (dispatch: Dispatch) {
        dispatch(getHistoricDataReuestInProgress());
        return HistoricDataAPI.getHistoricData()
            .then((response: HistoricRecord[]) => {
                dispatch(getHistoricDataReuestSuccess(response));
            })
            .catch((error: AxiosError) => {
                dispatch(getHistoricDataReuestError(error.message));
            });
    };
}
