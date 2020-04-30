import { combineReducers, createStore, applyMiddleware, Action, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga'

import { AnalyticsReducer } from '../modules/analytics';
import { AppState } from './types';
import { AnalyticsActionTypes } from '../modules/analytics/store/actionTypes';
import { rootSaga } from './rootSaga';

export function configureStore(): Store {
    const sagaMiddleware = createSagaMiddleware();

    const rootReducer = combineReducers({
        analyticsReducer: AnalyticsReducer
    });

    const store: Store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);
    return store;
}
