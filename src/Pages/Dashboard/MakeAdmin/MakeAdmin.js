import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { Alert, Button, Typography } from '@mui/material';
import useAuth from '../../../hooks/useAuth';


const MakeAdmin = () => {
    const [email, setEmail] = useState({});
    const [success, setSuccess] = useState(false);
    const {token} = useAuth()
    const handleOnBlur = (e) => {
        setEmail(e.target.value);
    }
    const handleAdminSunmit = (e) => {
        const user = {email}
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                    setEmail('');
                }
            });
        e.preventDefault();
    }
    return (
        <Box>
            <Typography variant='h3' component='h3'>
                Make An Admin
            </Typography>
            <form onSubmit={handleAdminSunmit}>
                <TextField
                    id="outlined-textarea"
                    label="Email"
                    placeholder="Your Email"
                    onBlur={handleOnBlur}
                    type="email"
                />
                <br />
                <Button sx={{ my: 2 }} type="submit" variant='contained'>Add Admin</Button>
            </form>
                {success && <Alert severity="success">This is a success alert — check it out!</Alert>}
        </Box>
    );
};

export default MakeAdmin;