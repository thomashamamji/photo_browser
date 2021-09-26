import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import Index from '../pages/Index';

function Routes(props) {
    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/" component={Index} />
                </Switch>
            </Router>
        </Fragment>
    );
}

export default Routes;