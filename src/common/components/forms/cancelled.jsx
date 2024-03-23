import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getParameterByName } from '../../../helpers/parameterHelpers';
import { useDeleteApplicationMutation } from '../../../store/application.slice'
import { closeDrawer, showModal } from '../../../store/app.slice';
import { useDispatch } from 'react-redux';

export default function CancellApplication({ selectedId, reqGetApplication }) {
    const [reCancell, resCancell] = useDeleteApplicationMutation()
    const [loading, setLoading] = useState(false)
    const email = getParameterByName('email');
    const token = getParameterByName('token');
    const dispatch = useDispatch()
    const cancell = () => {
        dispatch(closeDrawer({ drawerTitle: "" }))
    }

    useEffect(() => {
        if (resCancell.isSuccess) {
            setLoading(false)
            reqGetApplication({ email, token })
            dispatch(showModal({ message: resCancell.data?.message, status: 'success', }))
            dispatch(closeDrawer({ drawerTitle: "" }))
        }
        if (resCancell.isLoading) {
            setLoading(true)
        }
        if (resCancell.isError) {
            dispatch(closeDrawer({ drawerTitle: "" }))
            dispatch(showModal({ message: resCancell.data?.message, status: 'error', }))
        }
    }, [dispatch, email, token, reqGetApplication, resCancell])

    const update = () => {
        reCancell({ appId: selectedId, newstatus: "cancelled" })
    }

    return (
        <Box>
            <Typography sx={{ fontWeight: 'bold' }}>Are you sure you want to cancell this application?</Typography>
            <Box sx={{ marginTop: 3, display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                <Button onClick={update} variant="outlined">{loading ? "Updating.." : "Ok Proceed"}</Button>
                <Button onClick={cancell} sx={{ borderColor: 'red', color: 'red' }} variant="outlined">Cancell</Button>
            </Box>
        </Box>
    )
}