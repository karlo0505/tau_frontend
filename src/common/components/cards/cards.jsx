import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { apptype } from '../../../constants/fileUpload';
import { Box, Chip, IconButton, Paper } from '@mui/material';
import { choiceType } from '../../../constants/applications';
import moment from 'moment';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelIcon from '@mui/icons-material/Cancel';

export default function AppCard({ applicationType, typeOfVehicle, dateApplied, appStatus, plateNumber, dateapproved, handleCancell, handleRenew, _id }) {
    const status = {
        "cancelled": <Chip label="Cancelled" size="small" variant="outlined" color="success" />,
        "pending": <Chip label="Pending" size="small" variant="outlined" color="success" />,
        "approved": <Chip label="Approved" size="small" variant="outlined" color="success" />
    }

    const validatedData = {
        "cancelled": null,
        "pending": null,
        "approved": <Typography sx={{ fontSize: 10, fontWeight: 600 }}>Valid until: {moment(dateapproved).add(1, 'y').format('ll')}</Typography>
    }

    const cancelled = {
        "cancelled": true,
        "pending": false,
        "approved": true
    }

    const checkStatus = {
        "cancelled": true,
        "pending": true,
        "approved": false
    }


    return (
        <Card style={{ marginTop: 20, width: '100%' }}>
            <Paper elevation={3}  >
                <Box display="inline-flex" alignItems="center" padding={2}>
                    <img width={70} height={70} src={apptype[applicationType]} alt="images" />
                    <Box sx={{ marginLeft: 2 }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>{choiceType[applicationType]}</Typography>
                        <Typography sx={{ fontSize: 10, marginTop: '-2px', textTransform: 'capitalize' }}>Plate Number: +{plateNumber}</Typography>
                        <Typography sx={{ fontSize: 10, marginTop: '-3px', textTransform: 'capitalize' }}>Type of Vehicle: {typeOfVehicle}</Typography>
                        {validatedData[appStatus]}
                        {status[appStatus]}
                    </Box>
                    <Box display="inline-flex" alignItems="center">
                        <IconButton disabled={checkStatus[appStatus]} color="primary" onClick={() => handleRenew(_id, dateApplied)} aria-label="upload picture" component="label">
                            <RefreshIcon />
                        </IconButton>
                        <IconButton disabled={cancelled[appStatus]} onClick={() => handleCancell(_id)} color="primary" aria-label="upload picture" component="label">
                            <CancelIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper >
        </Card >
    )
}