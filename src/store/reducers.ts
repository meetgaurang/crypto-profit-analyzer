import { AnalyticsStore, HistoricDataReuestType } from './types';
import { ANALYTICS_ACTION_TYPES } from './actionTypes';
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
        case ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                apiSuccess: false,
                apiFailure: false,
                apiRequestInProgress: true,
                apiFailureMessage: '',
                records: [],
            };
        }
        case ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_FAILURE: {
            return {
                ...state,
                apiSuccess: false,
                apiFailure: true,
                apiRequestInProgress: false,
                apiFailureMessage: action.payload as string,
                records: [],
            };
        }
        case ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_SUCCESS: {
            const mapper = new AnalyticsMapper();
            return {
                ...state,
                apiSuccess: true,
                apiFailure: false,
                apiRequestInProgress: false,
                apiFailureMessage: '',
                records: mapper.mapResponse(action.payload as HistoricRecord[]),
            };
        }
        default:
            return state;
    }
};
