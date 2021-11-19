// Appointment(parentComponents)
import React from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import AppointmentHeader from '../AppointmentHeader/AppointmentHeader';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const Appointmnet = () => {
    const [date, setDate] = React.useState(new Date());

    return (
        <div>
            <Navigation></Navigation>
            <AppointmentHeader data={date} setDate={setDate}></AppointmentHeader>
            <AvailableAppointment date={date.toLocaleDateString()}></AvailableAppointment>
        </div>
    );
};

export default Appointmnet;