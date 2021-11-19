// Appointment => AvailableAppointment
import { Alert, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Booking from '../Booking/Booking';
const bookings = [
    {
        id: 1,
        name: 'Teeth Orthodonics',
        time: '08.00 AM - 09.00 AM',
        space: 10,
        price: 10
    },
    {
        id: 2,
        name: 'Cosmetic Dentistry',
        time: '09.00 AM - 10.00 AM',
        space: 8,
        price: 35
    },
    {
        id: 3,
        name: 'Teeth Cleaning',
        time: '10.00 AM - 11.00 AM',
        space: 9,
        price: 45
    },
    {
        id: 4,
        name: 'Cavity Protection',
        time: '11.00 AM - 12.00 PM',
        space: 5,
        price: 60
    },
    {
        id: 5,
        name: 'Pediatric Dental',
        time: '06.00 PM - 07.00 PM',
        space: 10,
        price: 55
    },
    {
        id: 6,
        name: 'Oral Surgery',
        time: '07.00 PM - 08.00 PM',
        space: 10,
        price: 40
    },
]
const AvailableAppointment = ({ date }) => {
    const [bookingSuccess, setBookingSuccess] = useState(false)
    return (
        <Container>
            <Typography variant='h4' sx={{ fontWeight: 600 }} component='h2'>
                Available Appiointment on {date}
            </Typography>
            {bookingSuccess && <Alert severity="success">This is a success alert — check it out!</Alert>}
            <Grid container spacing={2} sx={{ mt: 4 }}>

                {/* Show all services */}
                {
                    bookings.map(booking => <Booking key={booking.id} date={date} setBookingSuccess={setBookingSuccess} booking={booking}></Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointment;