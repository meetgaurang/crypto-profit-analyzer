import { DateWiseRecord } from '../components/Analytics/Analytics.types';
import { HistoricRecord } from '../api/HistoricDataAPI.types';

export interface AnalyticsStore {
    apiSuccess: boolean;
    apiFailure: boolean;
    apiRequestInProgress: boolean;
    apiFailureMessage: string;
    records: DateWiseRecord[];
}

interface HistoricDataReuestInProgressType {
    type: string;
    payload: undefined;
}

interface HistoricDataReuestSuccessType {
    type: string;
    payload: HistoricRecord[];
}

interface HistoricDataReuestErrorType {
    type: string;
    payload: string;
}

export type HistoricDataReuestType = HistoricDataReuestInProgressType | HistoricDataReuestSuccessType | HistoricDataReuestErrorType;
