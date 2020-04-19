import { DateWiseRecord } from '../components/Analytics/Analytics.types';
import { HistoricRecord } from '../api/HistoricDataAPI.types';
import { AnalyticsActionTypes } from './actionTypes';

export interface AnalyticsStore {
    apiSuccess: boolean;
    apiFailure: boolean;
    apiRequestInProgress: boolean;
    apiFailureMessage: string;
    records: DateWiseRecord[];
}

interface HistoricDataReuestBaseAction {
    type: AnalyticsActionTypes;
}

interface HistoricDataReuestInProgressType extends HistoricDataReuestBaseAction {
    type: AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_IN_PROGRESS;
    payload: undefined;
}

interface HistoricDataReuestSuccessType extends HistoricDataReuestBaseAction {
    type: AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_SUCCESS;
    payload: HistoricRecord[];
}

interface HistoricDataReuestErrorType extends HistoricDataReuestBaseAction {
    type: AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_FAILURE;
    payload: string;
}

export type HistoricDataReuestType = HistoricDataReuestInProgressType | HistoricDataReuestSuccessType | HistoricDataReuestErrorType;
