import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import doctor from '../../../images/doctor.png'
import bg from '../../../images/appointment-bg.png';
import {teal } from '@mui/material/colors';


const appointMentBg = {
    marginTop: 150,
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left',
    backgroundColor: 'rgba(28, 31, 32, 0.9)',
    backgroundBlendMode: 'darken, luminosity'
}
const AppointmentBanner = () => {
    return (

        <Box style={appointMentBg} sx={{ flexGrow: 1, }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <img style={{ width: 400, marginTop: '-110px' }} src={doctor} alt="" />
                    </Grid>
                    <Grid sx={{ textAlign: 'left', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} color={teal[50]} item xs={12} md={6}>
                        <Box>
                            <Typography color={teal['A400']} sx={{ mb: 5 }} variant='h5' component='h6'>
                                Appointment
                            </Typography>
                            <Typography sx={{ mb: 3 }} variant='h4' component='h4'>
                                Make an Appointment Today
                            </Typography>
                            <Typography sx={{ mb: 5 }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quis assumenda eveniet quod impedit. Vero eligendi optio reprehenderit, deserunt, dicta possimus, cum rerum eum sapiente molestiae incidunt ipsum omnis magni!
                            </Typography>
                            <Button variant='contained'>Learn More</Button>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>

    );
};

export default AppointmentBanner;