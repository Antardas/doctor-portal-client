// Appointment => AvailableAppointment => Booking

import { Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { cyan, blueGrey } from '@mui/material/colors';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ booking, date, setBookingSuccess }) => {
    const { name, time, space, price } = booking;
    const [bookingOpen, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => setBookingOpen(true);
    const handleBookingClose = () => setBookingOpen(false);
    return (
        <>
            <Grid item xs={12} sm={6} md={4} >
                <Paper elevatio={3} sx={{ py: 5 }}>
                    <Typography color={cyan['A400']} variant='h5' component='h5'>
                        {name}
                    </Typography>
                    <Typography sx={{ my: 1, fontWeight: 700 }} color={blueGrey[500]} variant="subtitle1" gutterBottom component="div">
                        {time}
                    </Typography>
                    <Typography sx={{ my: 1 }} variant='caption' component='div'>
                        {space} spaces available
                    </Typography>
                    <Button onClick={handleBookingOpen} variant='contained'>Book Appointment</Button>
                </Paper>
            </Grid>
            <BookingModal
                
                handleBookingClose={handleBookingClose}
                handleBookingOpen={handleBookingOpen}
                bookingOpen={bookingOpen}
                booking={booking}
                date={date}
                setBookingSuccess={setBookingSuccess}

            ></BookingModal></>
    );
};

export default Booking;