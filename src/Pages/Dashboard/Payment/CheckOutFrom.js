import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Alert } from '@mui/material'
import { styled } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import React, { useEffect, useState } from 'react';
const stripePromise = loadStripe('pk_test_51Jw2ruGEUQ8mwr9RgiVp3d2n7ztO9cIgPHJrCsmhzAeusSsDlhMi7MnaoOtWOiRVEfhyQqgxpAd1nWbdijJegkLs00w5gK2JAI');



const CheckOutFrom = ({ appointment }) => {
    const { price, email, phone, pataitentName, _id } = appointment;
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        fetch(`http://localhost:5000/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price })
        }).then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecrect)
            });

    }, [price])



    const handleSubmit = async (event) => {
        setProcessing(true);
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        console.log(paymentMethod);


        if (error) {
            setError(error.message);
            console.log('[error]', error);
        } else {
            setError('');
            paymentMethod.billing_details.email = email;
            paymentMethod.billing_details.phone = phone;
            // console.log('[PaymentMethod]', paymentMethod);
        }
        console.log(clientSecret, '[clientSecrte]');
        // Payment Intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: pataitentName,
                        email: "deyapurba4444@gmail.com"
                    },
                },
            },
        );

        if (intentError) {
            setError(intentError.message);
        } else {
            setError('');
            console.log(paymentIntent);
            setProcessing(false);

            // Save to databse 
            const url = `http://localhost:5000/appointments/${_id}`;
            const payment = {
                amount: paymentIntent.amount,
                transection: paymentIntent.id,
                currency: paymentIntent.currency,
                last4: paymentMethod.card.last4,
                billing_details: paymentMethod.billing_details
}
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payment)
                
            }).then(res => res.json())
                .then(data => console.log(data));
        }
    };
    return (
        <div>
            {
                error ? <Alert severity="error">{error}</Alert> : null
            }
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    processing ? <CircularProgress/> : <Button variant='contained' type="submit" disabled={!stripe}>
                        
                            Pay ${price}
                        
                    </Button>
                }
            </form>
        </div>
    );
};

export default CheckOutFrom;