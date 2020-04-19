import { AxiosError } from 'axios';
import { AnalyticsActionTypes } from './actionTypes';
import { HistoricRecord } from '../api/HistoricDataAPI.types';
import { HistoricDataAPI } from '../api/HistoricDataAPI';
import { HistoricDataReuestType } from './types';

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

export function getHistoricData(): any {
    return function (dispatch: any) {
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
