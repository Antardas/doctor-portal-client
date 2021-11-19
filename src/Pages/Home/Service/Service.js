import React from 'react';
import Grid from '@mui/material/Grid';
import {  Card,  CardContent, CardMedia, Typography } from '@mui/material';

const Service = ({ service }) => {
    const { description, img } = service;
    return (
        <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ minWidth: 275, border: 0, boxShadow: 0 }}>
                <CardMedia
                    component="img"
                    style={{ width: 'auto', height: '80', margin: '0 auto' }}
                    image={img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        Normal Header
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Service;