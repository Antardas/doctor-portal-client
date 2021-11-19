import { Alert, AlertTitle, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import loginImg from '../../../images/login.png'
import useAuth from '../../../hooks/useAuth';
import gIcon from '../../../images/g-icon.svg'


const Login = () => {
    // All functions and variables are taken from Firebase
    const {
        user,
        error,
        isLoading,
        signInUser,
        SignInWithGoogle
    } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_url = location?.state?.from || '/';
    const [loginData, setLoginData] = useState({});
    
    // Submit user input data & login existing user
    const handleSubmit = e => {
        signInUser(loginData.email, loginData.password, location, history)
        e.preventDefault();
    }
    // get field value
    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    return (
        <Container>
            {<Grid container spacing={2} >
                <Grid item xs={12} md={6} sx={{ mt: '10rem' }}>
                    <Typography variant='body1' gutterBottom>Login</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            required
                            type="email"
                            name="email"
                            id="standard-basic email"
                            label="email"
                            variant="standard"
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            required
                            type="password"
                            id="standard-basic pass"
                            label="password"
                            variant="standard"
                            name="password"
                            onBlur={handleOnBlur}
                        />
                        <br />
                        <Button variant='contained' type='submit' sx={{ width: '75%', m: 1 }}>Login</Button>
                        <NavLink to={{ pathname: '/register', state: { from: redirect_url}}}><Button variant='text' type='submit' >New User? please resiter</Button>
                        </NavLink>
                    </form>
                    <Button onClick={() => SignInWithGoogle(location, history)} variant='outlined'><img src={gIcon} alt='google logo'/></Button>
                </Grid>
                <Grid item xs={12} sx={{ mt: '7.2rem' }} md={6}>
                    <img style={{ height: '30rem' }} src={loginImg} alt="" />
                </Grid>
            </Grid>
            
            }
            {
                isLoading && <CircularProgress />
            }
            {
                user?.email && <Alert sx={{ position: 'absolute', top: '10rem', left: 0, width: '20rem', right: 0, mx: 'auto' }} severity="success">
                    User created Successfully
                </Alert>
            }
            {
                error && <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            }
        </Container>
    );
};

export default Login;