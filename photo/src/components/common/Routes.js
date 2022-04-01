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
        setIsAuthenticated(sessionStorage.userToken !== ""); // I will add a test request to check when the token is expired or not
        console.log(getUserAuthStatus);
        if (sessionStorage.userToken && isAuthenticated) getUserAuthStatus(sessionStorage.userToken);
        if (!isLoading && !success && isAuthenticated) {
            sessionStorage.setItem("userToken", "");
            setIsAuthenticated(false);
            console.log(sessionStorage.userToken);
        }
    }, [success, isLoading, isAuthenticated]);

    return (
        <Fragment>
            <Router>
                <Switch>
                    <Route exact path="/signup" component={RegisterUser} />
                    <Route exact path="/login" component={LoginUser} />
                    <PrivateRoute exact isAuthenticated={isAuthenticated} token={sessionStorage.userToken} path="/album/add" component={AddAlbum} />
                    <PrivateRoute exact isAuthenticated={isAuthenticated} token={sessionStorage.userToken} path="/" component={Index} />
                    <PrivateRoute exact isAuthenticated={isAuthenticated} token={sessionStorage.userToken} path="/gallery" component={Gallery} />
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