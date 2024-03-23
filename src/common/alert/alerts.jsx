import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/app.slice';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Alerts() {
    const dispatch = useDispatch()
    const { app } = useSelector((state) => ({
        app: state.app,
    }));


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeModal({ message: "", status: "", }))
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={app.openModal} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={app.status} sx={{ width: '100%' }}>
                    {app.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}