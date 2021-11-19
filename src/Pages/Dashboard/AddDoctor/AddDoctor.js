import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, styled } from '@mui/system';
import { Button, Input } from '@mui/material';
import Swal from 'sweetalert2';

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [img, setImg] = useState(null);
    console.log(name, email);

    const handleSubmit = (e) => {
        console.log('name, email');

        if (!img) { return };
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('img', img);
        fetch('http://localhost:5000/addDoctors', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Doctor added successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        // window.location.reload();
                        setName('');
                        setEmail('');
                        setImg(null);
                        console.log(name, email);
                    });

                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Something went wrong',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            })
        e.preventDefault();
    }




    return (
        <div>
            <h3>Add a doctor</h3>
            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <TextField id="Name" label="Name" variant="standard"
                        sx={{ width: '25rem', mt: 2 }}
                        onBlur={e => setName(e.target.value)}
                        defaultValue={name}
                    />
                    <TextField id="Email" type='email' label="Email" variant="standard"
                        sx={{ width: '25rem', mt: 2 }}
                        onBlur={e => setEmail(e.target.value)}
                        defaultValue={email}
                    />

                    <Input accept="image/*" type="file"
                        onChange={e => setImg(e.target.files[0])}
                        defaultValue={img}
                    />
                    <br />
                    <Button variant="contained" type='submit'>
                        Add Doctor
                    </Button>

                </Box>
            </form>

        </div>
    );
};

export default AddDoctor