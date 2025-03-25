import * as React from 'react';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Rate = () => {
    const [rate, setRate] = useState(0)
    const navigate = useNavigate();
    return (<>
        <Typography component="legend">how was your expirience?</Typography>
        <Rating
            name="simple-uncontrolled"
            onChange={(event, newValue) => {
                setRate(newValue)
                Swal.fire("thank you for sharing!");
                navigate('/products')
            }}

        /></>)
}

export default Rate;