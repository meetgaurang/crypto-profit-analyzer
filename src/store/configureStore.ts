import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';

export function configureStore() {
    const rootReducer = combineReducers({
        reducers
    });

    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}

