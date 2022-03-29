import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import PrivateRoute from './PrivateRoute';

// Pages
import Index from '../pages/Index';
import RegisterUser from '../pages/user/RegisterUser';
import LoginUser from '../pages/user/LoginUser';
import AddAlbum from '../pages/album/AddAlbum';

function Routes() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        setIsAuthenticated(sessionStorage.userToken !== ""); // I will add a test request to check when the token is expired or not
    }, []);

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/signup" component={RegisterUser} />
                    <Route exact path="/login" component={LoginUser} />
                    <PrivateRoute exact isAuthenticated={isAuthenticated} token={sessionStorage.userToken} path="/album/add" component={AddAlbum} />
                    <PrivateRoute exact isAuthenticated={isAuthenticated} token={sessionStorage.userToken} path="/" component={Index} />
                </Switch>
            </Router>
        </Fragment>
    );
}

export default Routes;