import { combineReducers, createStore, applyMiddleware, Action } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';
import { AppState } from './types';
import { AnalyticsActionTypes } from './actionTypes';

export function configureStore() {
    const rootReducer = combineReducers({
        analyticsReducer: reducers,
    });

    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, Action<AnalyticsActionTypes>>)));
}
