import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import Index from '../pages/Index';
import RegisterUser from '../pages/user/RegisterUser';
import LoginUser from '../pages/user/LoginUser';

function Routes(props) {
    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/signup" component={RegisterUser} />
                    <Route exact path="/login" component={LoginUser} />
                </Switch>
            </Router>
        </Fragment>
    );
}

export default Routes;