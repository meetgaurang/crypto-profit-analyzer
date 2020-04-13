import { DateWiseRecord } from '../components/Analytics/Analytics.types';

export interface AnalyticsStore {
    apiSuccess: boolean;
    apiFailure: boolean;
    apiRequestInProgress: boolean;
    records: DateWiseRecord[];
}
