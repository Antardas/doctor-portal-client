import { Button, Container, Grid, TextField, Typography, CircularProgress, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginImg from '../../../images/login.png'



const Register = () => {
    // all stuff in usefirebase hooks
    const {
        user,
        registerWithEmailPassword,
        error,
        isLoading,
    } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_url = location?.state?.from || '/';
    const [registerData, setRegisterData] = useState({});
    const handleSubmit = e => {
        if (registerData.password !== registerData.password2) {
            alert(`Password didn't match`);
            return
        }
        registerWithEmailPassword(registerData.email, registerData.password, registerData.name, location, history);
        e.preventDefault();
    }
    // get field value
    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...registerData };
        newLoginData[field] = value;
        setRegisterData(newLoginData)
    }


    return (
        <Container>
            {!isLoading && <Grid container spacing={2} >
                <Grid item xs={12} md={6} sx={{ my: '10rem' }}>
                    <Typography variant='body1' gutterBottom>Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            required
                            type="text"
                            name="name"
                            id="standard-basic name"
                            label="name"
                            variant="standard"
                            onBlur={handleOnBlur}
                        />
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
                            type="number"
                            name="number"
                            id="standard-basic number"
                            label="number"
                            variant="standard"
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            required
                            type="password"
                            name="password2"
                            id="standard-basic re-typePassword"
                            label="re-type password"
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
                        <Button variant='contained' type='submit' sx={{ width: '75%', m: 1 }}>Register</Button>
                        <NavLink to={{ pathname: '/login', state: { from: redirect_url } }}><Button variant='text' type='submit' >Already Register?  please Login</Button>
                        </NavLink>
                    </form>
                </Grid>
                <Grid item xs={12} sx={{ mt: '7.2rem' }} md={6}>
                    <img style={{ height: '30rem' }} src={loginImg} alt="" />
                </Grid>
            </Grid>}
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

export default Register;