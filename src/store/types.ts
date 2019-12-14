import { IDateWiseRecord } from "../components/Analytics/Analytics.types";

export interface IAnalyticsStore {
    apiSuccess: boolean,
    apiFailure: boolean,
    apiRequestInProgress: boolean,
    records: IDateWiseRecord[];
}
