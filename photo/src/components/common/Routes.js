import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Scripts
import { getUserAuthStatus } from '../../actions/userActions';
import { connect } from 'react-redux';

// Components
import PrivateRoute from './PrivateRoute';

// Pages
import Index from '../pages/Index';
import RegisterUser from '../pages/user/RegisterUser';
import LoginUser from '../pages/user/LoginUser';
import AddAlbum from '../pages/album/AddAlbum';
import Gallery from '../pages/album/Gallery';

const Routes = ({ isLoading, success, getUserAuthStatus }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        console.log("Calling scripts now ...")
        setIsAuthenticated(localStorage.userToken !== ""); // I will add a test request to check when the token is expired or not
        console.log(getUserAuthStatus);
        if (localStorage.userToken && isAuthenticated) getUserAuthStatus(localStorage.userToken);
        if (!isLoading && !success && isAuthenticated) {
            localStorage.setItem("userToken", "");
            setIsAuthenticated(false);
            console.log(localStorage.userToken);
        }
    }, [getUserAuthStatus, success, isLoading, isAuthenticated]);

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/signup" component={RegisterUser} />
                    <Route exact path="/login" component={LoginUser} />
                    <PrivateRoute exact isAuthenticated={isAuthenticated} token={localStorage.userToken} path="/album/add" component={AddAlbum} />
                    <PrivateRoute exact isAuthenticated={isAuthenticated} token={localStorage.userToken} path="/" component={Index} />
                    <PrivateRoute exact isAuthenticated={isAuthenticated} token={localStorage.userToken} path="/gallery" component={Gallery} />
                </Switch>
            </Router>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    isLoading : state.user.isLoading,
    success : state.user.success
});

export default connect(mapStateToProps, {
    getUserAuthStatus
})(Routes);