import React, { useState, useEffect } from 'react';
import { userLogin } from '../../../actions/userActions';
import { connect } from 'react-redux';

function LoginUser({ isLoading, success, history, userLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        email : "",
        password : ""
    });

    function onSubmit (e) {
        e.preventDefault();
        if (email && password) {
            // Log In (backend)
            userLogin({
                email,
                password
            });
        }
    }

    useEffect(() => {
        if (!isLoading && success) {
            history.push("/");
        }
    }, [error, isLoading, success, email, password]);

    return (
        <>
            <h1 className="text-center">Log In</h1>
            {
                !isLoading && success === false ? (
                    <p className="text-danger">
                        An error occured during the Log In process. Be sure to enter the correct credentials.
                    </p>
                ) : null
            }
            <div className="container">
                <form onSubmit={onSubmit}>
                    <div className="row p-2">
                        <input id="email" placeholder="E-mail" type="text" className="validate" value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="email">E-mail</label>
                    </div>
                    <div className="row p-2">
                        <input id="password" placeholder="Password" type="text" className="validate" value={password} onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="row p-2">
                        <button className="btn waves-effect waves-light">Log In</button>
                    </div>
                </form>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    isLoading : state.user.isLoading,
    success : state.user.success
});

export default connect(mapStateToProps, {
    userLogin
})(LoginUser);