import { Grid } from '@mui/material';
import React from 'react';

const Doctor = ({ doctor }) => {
    const { _id, name, img } = doctor;


    return (
        
            <Grid  item xs={12} sm={6} md={4}>
                <div>
                    <img width='200px' src={`data:image/*;base64,${img}`} alt='doctor' />
                    <h3>{name}</h3>
                </div>
            </Grid>
        
    );
};

export default Doctor;