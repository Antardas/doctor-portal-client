// Appointment => AppointmentHeader
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import bg from '../../../images/bg.png'
import chair from '../../../images/chair.png'
import Calendar from '../../Shared/Calendar/Calendar';
const bannerBg = {
    // backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover'
}

const AppointmentHeader = ({date, setDate}) => {
    return (
        <Box style={bannerBg} sx={{ flexGrow: 1 }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} >
                        <Typography sx={{fontWeight: '600'}} variant='h2' component='h2'>
                            Appointment
                        </Typography>
                        <Calendar date={date} setDate={setDate}></Calendar>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <img src={chair} style={{width: '100%'}} alt="" />
                    </Grid>
                </Grid>
            </Container>
</Box>
    );
};

export default AppointmentHeader;