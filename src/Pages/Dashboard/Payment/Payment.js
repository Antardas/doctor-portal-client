import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutFrom from './CheckOutFrom';
import { Alert, CircularProgress } from '@mui/material';
const stripePromise = loadStripe('pk_test_51Jw2ruGEUQ8mwr9RgiVp3d2n7ztO9cIgPHJrCsmhzAeusSsDlhMi7MnaoOtWOiRVEfhyQqgxpAd1nWbdijJegkLs00w5gK2JAI')
const Payment = () => {
    // get id from url
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState([]);
    console.log(appointmentId);
    console.log(appointment);
    useEffect(() => {
        const url = `http://localhost:5000/appointment/${appointmentId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setAppointment(data));

    }, [appointmentId]);
    console.log(appointment);
    return (
        <div>
            Payment coming soon: {appointment.serviceName}
            <h4>Pay: {appointment.price}</h4>
            {
                appointment?.price ? <Elements stripe={stripePromise}>
                <CheckOutFrom
                appointment={appointment}
                />
            </Elements> : (<CircularProgress/>)
            }
        </div>
    );
};

export default Payment;