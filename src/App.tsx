import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Welcome } from './components/Welcome/Welcome';
import Analytics from './components/Analytics/Analytics';
import { configureStore } from './store/configureStore';

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
                    <BrowserRouter basename="/crypto">
                        <Switch>
                            <Route path="/" exact={true} component={Welcome} />
                            <Route path="/analytics" component={Analytics} />
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </>
        );
    }
}
