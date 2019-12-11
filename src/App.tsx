import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Welcome } from './components/Welcome/Welcome';
import { Analytics } from './components/Analytics/Analytics';

export class App extends React.Component {
    render() {
        return (
            <>
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
            </>
        );
    }
}
