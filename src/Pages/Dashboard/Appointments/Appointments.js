import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Appointments = ({ date }) => {
    console.log(date)
    const { user, token } = useAuth();
    console.log(user.email, 'email')
    const [appointments, setAppointments] = useState([]);
    console.log(appointments)
    useEffect(() => {
        console.log('calling appointmenst')
        const url = `http://localhost:5000/appointments?email=${user.email}&date=${date}`
        fetch(url, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setAppointments(data));
    }, [date])
    if (!appointments.length) return <h1>No appointments</h1>
    console.log(appointments.map(appointment => appointment))
    return (
        <div>
            <h2>Appointments {appointments.length}</h2>

            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pataitent Name</TableCell>
                            <TableCell align="right">Service Name</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Payment</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.pataitentName}
                                </TableCell>
                                <TableCell align="right">{row.serviceName}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row?.payment ? 'Paid'
                                    : 
                                    <Link to={`/dashboard/payment/${row._id}`}><Button>Pay</Button></Link>
                                    }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> 
        </div>
    )
};

export default Appointments;