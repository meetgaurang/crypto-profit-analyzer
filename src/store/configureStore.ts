import { combineReducers, createStore, applyMiddleware, Action, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AnalyticsReducer } from '../modules/analytics';
import { AppState } from './types';
import { AnalyticsActionTypes } from '../modules/analytics/store/actionTypes';

export function configureStore(): Store {
    const rootReducer = combineReducers({
        analyticsReducer: AnalyticsReducer
    });

    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, Action<AnalyticsActionTypes>>))
    );
}
