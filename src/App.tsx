import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Welcome } from './components/Welcome/Welcome';
import Analytics from './components/Analytics/Analytics';
import { configureStore } from './store/configureStore';
import { UserContext } from './utils/UserContext';

export class App extends React.Component {
    render() {
        const store = configureStore();
        return (
            <UserContext.Provider value={{
                id: '1234',
                name: 'Heer Patel'
            }}>
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
                            <Route path="/" exact={true} component={Welcome} />
                            <Route path="/analytics" component={Analytics} />
                        </Switch>
                    </HashRouter>
                </Provider>
            </UserContext.Provider>
        );
    }
}
