import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import PrivateRoute from './PrivateRoute';

// Pages
import Index from '../pages/Index';
import RegisterUser from '../pages/user/RegisterUser';
import LoginUser from '../pages/user/LoginUser';

function Routes() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        setIsAuthenticated(sessionStorage.userToken !== ""); // I will add a test request to check when the token is expired or not
    });

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route path="/signup" component={RegisterUser} />
                    <Route path="/login" component={LoginUser} />
                    <PrivateRoute isAuthenticated={isAuthenticated} token={sessionStorage.userToken} path="/" component={Index} />
                </Switch>
            </Router>
        </Fragment>
    );
}

export default Routes;