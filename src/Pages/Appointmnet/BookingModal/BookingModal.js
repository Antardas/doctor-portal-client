// Appointment => AvailableAppointment => Booking => BookingModal

import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({ handleBookingClose, bookingOpen, booking, date, setBookingSuccess }) => {
    const { name, time, price } = booking;

    const { user } = useAuth();

    // Set user booking detail
    const initialBookingInfo = { pataitentName: user?.displayName, email: user?.email, phone: '', price }
    const [bookingInfo, setBookinInfo] = useState(initialBookingInfo);
    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookinInfo(newInfo);
    }
    const handleBookingSubmit = e => {
        // Store data
        const appointment = {
            ...bookingInfo,
            time,
            serviceName: name,
            date
        };
        // send to the server 
        fetch('http://localhost:5000/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)
        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookingSuccess(true);
                    handleBookingClose();
                    Swal.fire({
                        title: 'Success',
                        text: 'Your appointment has been booked',
                        icon: 'success',
                    });

                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Something went wrong',
                        icon: 'error',
                    });
                }
            });
        console.log(appointment)
        e.preventDefault();
    }
    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={bookingOpen}
                onClose={handleBookingClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={bookingOpen}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {name}
                        </Typography>
                        <form onSubmit={handleBookingSubmit}>
                            <TextField
                                disabled
                                sx={{ width: '90%', mx: 'auto', my: 1 }}
                                id="outlined-size-small"
                                defaultValue={time}
                                size="small"
                            />
                            <TextField

                                sx={{ width: '90%', mx: 'auto', my: 1 }}
                                id="outlined-size-small"
                                defaultValue={user.displayName}
                                size="small"
                                name='pataitentName'
                                onBlur={handleOnBlur}
                            />
                            <TextField

                                sx={{ width: '90%', mx: 'auto', my: 1 }}
                                id="outlined-size-small"
                                defaultValue={user.email}
                                size="small"
                                name='email'
                                onBlur={handleOnBlur}
                            />
                            <TextField

                                sx={{ width: '90%', mx: 'auto', my: 1 }}
                                id="outlined-size-small"
                                size="small"
                                name="phone"
                                onBlur={handleOnBlur}
                            />
                            <TextField
                                disabled
                                sx={{ width: '90%', mx: 'auto', my: 1 }}
                                id="outlined-size-small"
                                defaultValue={date}
                                size="small"
                            />

                            <Button variant='contained' sx={{ display: 'block', mx: 'auto' }} type='submit'>Submit</Button>

                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>

    );
};

export default BookingModal;