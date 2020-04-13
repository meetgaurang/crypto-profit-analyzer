import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';

export function configureStore() {
    const rootReducer = combineReducers({
        analyticsReducer: reducers,
    });

    const myCustomMiddleware = (store: any) => {
        return (next: any) => {
            return (action: any) => {
                console.log('[Middleware] Action to be dispatched ', action);
                const result = next(action);
                console.log('[Middleware] next state ', store.getState());
                return result;
            };
        };
    };

    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, myCustomMiddleware)));
}
