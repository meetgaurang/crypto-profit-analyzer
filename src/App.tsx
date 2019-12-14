import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Welcome } from './components/Welcome/Welcome';
import Analytics from './components/Analytics/Analytics';
import { configureStore } from './store/configureStore';

export class App extends React.Component {
    render() {
        const store = configureStore();
        return (
            <>
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route 
                                path="/"
                                exact={true}
                                component={Welcome}
                            />
                            <Route 
                                path="/analytics"
                                component={Analytics}
                            />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </>
        );
    }
}
