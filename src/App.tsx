import React, { Suspense, lazy } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Welcome } from './components/Welcome/Welcome';
import { configureStore } from './store/configureStore';

const Analytics = lazy(() => import('./components/Analytics/Analytics'));

export class App extends React.Component {
    render() {
        const store = configureStore();
        return (
            <>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">Crypto Price Analytics</Typography>
                    </Toolbar>
                </AppBar>
                <Provider store={store}>
                    <HashRouter>
                        <Suspense fallback={<div> Loading.. </div>}>
                            <Switch>
                                <Route path="/" exact={true} component={Welcome} />
                                <Route path="/analytics" component={Analytics} />
                            </Switch>
                        </Suspense>
                    </HashRouter>
                </Provider>
            </>
        );
    }
}
