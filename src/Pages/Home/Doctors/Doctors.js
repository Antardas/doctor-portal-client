import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { teal } from '@mui/material/colors';
import Doctor from './Doctor';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data));
    }, []);
    return (
        <div>
            <Typography color={teal[400]} variant='h3' component='h3'>
                Our Doctors
            </Typography>
            <Grid container spacing={2}>
                {
                    doctors.map(doctor => <Doctor key={doctor._id} doctor={doctor} />)
                }
            </Grid>

        </div>
    );
};

export default Doctors;