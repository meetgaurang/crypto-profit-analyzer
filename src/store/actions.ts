import { ANALYTICS_ACTION_TYPES } from './actionTypes';
import { HistoricRecord } from '../api/HistoricDataAPI.types';
import { HistoricDataAPI } from '../api/HistoricDataAPI';

export function getHistoricDataReuestInProgress(): any {
    return {
        type: ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_IN_PROGRESS,
    };
}

export function getHistoricDataReuestSuccess(response: HistoricRecord[]): any {
    return {
        type: ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_SUCCESS,
        payload: response,
    };
}

export function getHistoricDataReuestError(error: any): any {
    return {
        type: ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_FAILURE,
        payload: error,
    };
}

export function getHistoricData(): any {
    return function (dispatch: any) {
        dispatch(getHistoricDataReuestInProgress());
        return HistoricDataAPI.getHistoricData()
            .then((response: any) => {
                dispatch(getHistoricDataReuestSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getHistoricDataReuestError(error));
            });
    };
}
