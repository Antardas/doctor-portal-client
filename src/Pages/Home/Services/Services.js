import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';
import Service from '../Service/Service';
import { Container, Typography } from '@mui/material';

const Services = () => {
    const services = [
        {
            name: 'Flouride Treatment',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corporis facilis ad nisi unde. Impedit, omnis nisi veritatis quis deleniti voluptatibus at voluptates illo repudiandae voluptas autem modi dolorem totam incidunt exercitationem',
            img: fluoride
        },
        {
            name: 'Cavity Filling',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corporis facilis ad nisi unde. Impedit, omnis nisi veritatis quis deleniti voluptatibus at voluptates illo repudiandae voluptas autem modi dolorem totam incidunt exercitationem',
            img: cavity
        },
        {
            name: 'Teath whitening',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corporis facilis ad nisi unde. Impedit, omnis nisi veritatis quis deleniti voluptatibus at voluptates illo repudiandae voluptas autem modi dolorem totam incidunt exercitationem',
            img: whitening
        }
    ]
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{color: 'success.main', fontWeight: 600}} variant="h5" component="h5">
                    Our Services
                </Typography>
                <Typography variant='h3' component='h3' sx={{ mb: 8, mt:2 }}>
                    Servics we Provide
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {services.map((service, index) => (
                        <Service key={index} service={service}></Service>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;