import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { closeDrawer } from '../../../store/app.slice'

export default function DeleteRequirements({ requirements, handleDelete }) {
    const dispatch = useDispatch()
    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold' }}>Are you sure you want to delete this {requirements.title}</Typography>
            <Box sx={{ display: 'flex', justifyContent: "space-between", m: '20px 0px' }}>
                <Button variant='contained' onClick={handleDelete}>Yes</Button>
                <Button onClick={() => dispatch(closeDrawer({ drawerTitle: "" }))}>Cancel</Button>
            </Box >
        </Box >
    )
}