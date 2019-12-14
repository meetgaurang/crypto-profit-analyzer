import { ANALYTICS_ACTION_TYPES } from "./actionTypes";
import { IHistoricDataAPIResponse } from "../api/HistoricDataAPI.types";
import { HistoricDataAPI } from "../api/HistoricDataAPI";

export function getHistoricDataReuestInProgress(): any {
    return {
        type: ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_IN_PROGRESS,
    }
}

export function getHistoricData(): any {
    return function(dispatch: any) {
        dispatch(getHistoricDataReuestInProgress());
        return HistoricDataAPI.getMockedHistoricData()
            .then((response: IHistoricDataAPIResponse) => {
                dispatch(getHistoricDataReuestSuccess(response));
            })
            .catch(error => {
                dispatch(getHistoricDataReuestError(error));
            });
    }
}

export function getHistoricDataReuestSuccess(response: IHistoricDataAPIResponse): any {
    return {
        type: ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_SUCCESS,
        payload: response
    }
}

export function getHistoricDataReuestError(error: any): any {
    return {
        type: ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_FAILURE,
        payload: error 
    }
}