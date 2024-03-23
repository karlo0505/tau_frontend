import React from 'react';
import { Box, Button, Typography } from '@mui/material';



export default function NotFound() {


    const handleRedirect = () => {
        window?.ReactNativeWebView?.postMessage('Logout');
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#038523',
                width: '100%'
            }}
        >
            <Typography style={{ color: 'white' }}>
                Something error
            </Typography>
            <Typography style={{ color: 'white' }}>
                There is a problem in our end
            </Typography>
            <Button onClick={handleRedirect} variant="outlined" color='secondary' >Login Again</Button>
        </Box>
    );
}