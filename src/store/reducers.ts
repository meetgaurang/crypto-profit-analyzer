import { AnalyticsStore } from './types';
import { ANALYTICS_ACTION_TYPES } from './actionTypes';
import { AnalyticsMapper } from '../components/Analytics/Analytics.mapper';

const initialState: AnalyticsStore = {
    apiSuccess: false,
    apiFailure: false,
    apiRequestInProgress: false,
    records: [],
};

export const reducers = (state = initialState, action: any) => {
    switch (action.type) {
        case ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                apiSuccess: false,
                apiFailure: false,
                apiRequestInProgress: true,
                records: [],
            };
        }
        case ANALYTICS_ACTION_TYPES.GET_HISTORIC_DATA_REQUEST_FAILURE: {
            return {
                ...state,
                apiSuccess: false,
                apiFailure: true,
                apiRequestInProgress: false,
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
                records: mapper.mapResponse(action.payload),
            };
        }
        default:
            return state;
    }
};
