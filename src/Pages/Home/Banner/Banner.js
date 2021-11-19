import { Box } from '@mui/system';
import React from 'react';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png'
import { Button, Container, Grid, Typography } from '@mui/material';

// Banner Background Style 

const bannerBg = {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
}
const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 450
}
const Banner = () => {
    return (
        <Box style={bannerBg} sx={{ flexGrow: 1 }}>
            <Container>
                <Grid style={verticalCenter} container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Typography variant='h3' sx={{ fontWeight: 500, textAlign: 'left' }}>
                            Your New Smile
                            <br />
                            Starts Here
                        </Typography>
                        <Typography sx={{ color: 'gray', fontSize: 14 }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum earum corporis vero dolore libero repudiandae eligendi facilis maxime? Veritatis aliquam exercitationem aliquid architecto officiis eveniet, ea alias nisi laborum molestias. Quaerat, doloribus! Tempora quam ipsam ex voluptas unde. Unde suscipit hic rerum. Molestias reiciendis beatae quae, ab saepe vero pariatur?
                        </Typography>
                        <Button variant='contained' >Get Appoinment</Button>
                    </Grid>
                    <Grid style={verticalCenter} item xs={12} md={7}>
                        <img src={chair} style={{ height: '20rem', width: 'auto' }} alt="" />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Banner;