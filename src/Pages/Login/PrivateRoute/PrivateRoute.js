import { CircularProgress } from '@mui/material';
import React from 'react';
import { Route, Redirect, } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    if (isLoading === true) {
        return <CircularProgress />
    }
    console.log(isLoading, 'check is Loading', rest)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user?.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;