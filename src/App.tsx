import React, { ReactElement, FunctionComponent } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { WelcomeComponent } from './modules/welcome';
import { AnalyticsComponent } from './modules/analytics';
import { configureStore } from './store/configureStore';

export const App: FunctionComponent = (): ReactElement => {
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
                    <Switch>
                        <Route path="/" exact={true} component={WelcomeComponent} />
                        <Route path="/analytics" component={AnalyticsComponent} />
                    </Switch>
                </HashRouter>
            </Provider>
        </>
    );
};
