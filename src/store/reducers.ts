import { AnalyticsStore, HistoricDataReuestType } from './types';
import { AnalyticsActionTypes } from './actionTypes';
import { AnalyticsMapper } from '../components/Analytics/Analytics.mapper';
import { HistoricRecord } from '../api/HistoricDataAPI.types';

const initialState: AnalyticsStore = {
    apiSuccess: false,
    apiFailure: false,
    apiRequestInProgress: false,
    apiFailureMessage: '',
    records: [],
};

export const reducers = (state = initialState, action: HistoricDataReuestType) => {
    switch (action.type) {
        case AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                apiSuccess: false,
                apiFailure: false,
                apiRequestInProgress: true,
                apiFailureMessage: '',
                records: [],
            };
        }
        case AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_FAILURE: {
            return {
                ...state,
                apiSuccess: false,
                apiFailure: true,
                apiRequestInProgress: false,
                apiFailureMessage: action.payload,
                records: [],
            };
        }
        case AnalyticsActionTypes.GET_HISTORIC_DATA_REQUEST_SUCCESS: {
            const mapper = new AnalyticsMapper();
            return {
                ...state,
                apiSuccess: true,
                apiFailure: false,
                apiRequestInProgress: false,
                apiFailureMessage: '',
                records: mapper.mapResponse(action.payload),
            };
        }
        default:
            return state;
    }
};
