import * as React from 'react';
import {  Grid } from '@mui/material';
import Calendar from '../../Shared/Calendar/Calendar'
import Appointments from '../Appointments/Appointments';
const DashboardHome = () => {
    let [date, setDate] = React.useState(new Date());

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Calendar
                        date={date}
                        setDate={setDate}
                    ></Calendar>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Appointments
                        date={date}>
                        
                        </Appointments>
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardHome;