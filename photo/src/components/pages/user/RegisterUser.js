import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userRegistration } from '../../../actions/userActions';

function RegisterUser({ userRegistration, isLoading, success, history }) {
    const [data, setData] = useState({
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        confirmPassword : ""
    });
    const [errors, setErrors] = useState({
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        confirmPassword : ""
    });
    const [error, setError] = useState(null);

    function checkFields (fields) {
        if (!fields.firstname) {
            setErrors({
                ...errors,
                firstname : "Field is empty"
            });
        }

        if (!fields.lastname) {
            setErrors({
                ...errors,
                lastname : "Field is empty"
            });
        }

        if (!fields.email) {
            setErrors({
                ...errors,
                email : "Field is empty"
            });
        }

        if (!fields.password) {
            setErrors({
                ...errors,
                password : "Field is empty"
            });
        }

        if (!fields.confirmPassword) {
            setErrors({
                ...errors,
                confirmPassword : "Field is empty"
            });
        }

        if (fields.firstname && fields.lastname && fields.email && fields.password && fields.confirmPassword) {
            if (fields.password === fields.confirmPassword) {
                setError(false);
            }

            else {
                setErrors({ ...errors, confirmPassword : "Passwords didn't match." });
            }
        }

        else setError(true);
    }

    function onSubmit (e) {
        e.preventDefault();
        checkFields(data);
        if (error === false) userRegistration(data);
    }

    useEffect(() => {
        if (!isLoading && success) history.push("/");
    }, [isLoading, errors, error]);

    return (
        <>
            {!isLoading && success === false ? (
                <p className="text-danger">
                    There was an error on your account creation
                </p>
            ) : null}
            <h1 className="text-center">
                Sign Up
            </h1>
            <div className="container">
                <form onSubmit={onSubmit}>
                    <div className="row p-2">
                        <div className="col-sm">
                            <input id="firstname" placeholder='Firstname' type="text" className="validate" value={data.firstname} onChange={e => setData({ ...data, firstname : e.target.value })} />
                            <label htmlFor="firstname">Firstname</label>
                            {error && errors.firstname ? (
                            <p className="text-danger">{errors.firstname}</p>
                        ) : null}
                        </div>
                        <div className="col-sm">
                            <input id="lastname" placeholder='Lastname' type="text" className="validate" value={data.lastname} onChange={e => setData({ ...data, lastname : e.target.value })} />
                            <label htmlFor="lastname">Lastname</label>
                            {error && errors.lastname ? (
                            <p className="text-danger">{errors.lastname}</p>
                        ) : null}
                        </div>
                    </div>
                    <div className="row p-2">
                        <input id="email" placeholder="E-mail" type="text" className="validate" value={data.email} onChange={e => setData({ ...data,  email : e.target.value })} />
                        <label htmlFor="email">E-mail</label>
                        {error && errors.email ? (
                            <p className="text-danger">{errors.email}</p>
                        ) : null}
                    </div>
                    <div className="row p-2">
                        <input id="password" placeholder="Password" type="password" className="validate" value={data.password} onChange={e => setData({ ...data, password : e.target.value })} />
                        <label htmlFor="password">Password</label>
                        {error && errors.password ? (
                            <p className="text-danger">{errors.password}</p>
                        ) : null}
                    </div>
                    <div className="row p-2">
                        <input id="password-confirm" placeholder="Confirm password" type="password" className="validate" value={data.confirmPassword} onChange={e => setData({ ...data, confirmPassword : e.target.value })} />
                        <label htmlFor="password-confirm">Confirm password</label>
                        {error && errors.confirmPassword ? (
                            <p className="text-danger">{errors.confirmPassword}</p>
                        ) : null}
                    </div>
                    <div className="row p-2">
                        <button className="btn waves-effect waves-light" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    success : state.user.success,
    isLoading : state.user.isLoading
});

export default connect(mapStateToProps, {
    userRegistration
})(RegisterUser);