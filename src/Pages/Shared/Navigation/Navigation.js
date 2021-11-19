import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


const Navigation = () => {
    const { user,
        logOut,
    } = useAuth();
    const history = useHistory();
    return (

        <Box sx={{ flexGrow: 1, mb: '15px' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Doctors Portal
                    </Typography>

                    {/* show user name or image  */}
                    {
                        user?.displayName && [<Typography variant='button' key={0}>{user.displayName}</Typography>, <img key={1} style={{ height: '35px', margin: '0 10px', borderRadius: '50%' }} src={user.photoURL} alt="user" />]

                    }
                    <Link style={{ color: 'white' }} to='/appointment'> <Button color='inherit'>Appointment</Button></Link>
                    {
                        user?.email ? <Box>
                            <Link style={{ color: 'white' }} to='/dashboard'> <Button color='inherit'>DashBoard</Button></Link>
                            <Button onClick={() => logOut(history)} color="inherit">Logout</Button>
                        </Box>
                            :
                            <Link to='/login'><Button color="inherit">Login</Button></Link>

                    }
                </Toolbar>
            </AppBar>

        </Box>

    );
};

export default Navigation;