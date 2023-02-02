import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

function PublicRoute({ component: Component, restricted, ...rest }) {
    // const auth = useSelector(state => state.auth);
    return (
        <Route {...rest} render={props => (
            // auth.isAuthenticated && restricted ?
                // <Redirect to="/transaction" /> :
                <Component {...props} />
        )
        } />
    )
}

export default PublicRoute