import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
    // const token = useSelector(state => state.token);

    return (
        <Route {...rest} render={props => (
            // token.isAuth ?
                <Component {...props} />
                // : <Redirect to="/404" />
        )} />
    )
}

export default PrivateRoute