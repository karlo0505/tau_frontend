import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import AppCard from '../cards/cards'
import AppDrawer from '../popup/AppDrawer'
import { closeDrawer } from '../../../store/app.slice'
import { useDispatch, useSelector } from 'react-redux'
import { openDrawer } from '../../../store/app.slice'
import { CancellApplication, NewApplicationForm } from '../forms'
import { RenewApplication } from '../forms'



export default function UserApplications({ data, reqGetApplication }) {
    const [actions, setActions] = useState("")
    const [selectedId, setSelectedId] = useState("")
    const [dateApplied, setDateApplied] = useState("")
    const { app } = useSelector((state) => ({
        app: state.app,
    }));
    const dispatch = useDispatch()


    const showApplicationDrawer = () => {
        setActions("newapplication")
        dispatch(openDrawer({ drawerTitle: "New Application" }))

    }

    const handleCancell = (id) => {
        setActions("cancelapplication")
        dispatch(openDrawer({ drawerTitle: "Cancell Application" }))
        setSelectedId(id)
    }

    const handleRenew = (id, applied) => {
        setActions("renewapplication")
        setSelectedId(id)
        setDateApplied(applied)
        dispatch(openDrawer({ drawerTitle: "Renew Application" }))

    }

    const forms = {
        newapplication: <NewApplicationForm reqGetApplication={reqGetApplication} />,
        renewapplication: <RenewApplication dateApplied={dateApplied} reqGetApplication={reqGetApplication} selectedId={selectedId} />,
        cancelapplication: <CancellApplication reqGetApplication={reqGetApplication} selectedId={selectedId} />
    }
    return (
        <Box>
            <Button onClick={showApplicationDrawer} fullWidth variant="outlined">New Application</Button>
            {data?.map(item => (
                <AppCard
                    key={item.applicationType}
                    applicationType={item.applicationType}
                    typeOfVehicle={item.typeOfVehicle}
                    plateNumber={item.plateNumber}
                    appStatus={item.appStatus}
                    dateapproved={item.dateapproved}
                    handleCancell={handleCancell}
                    handleRenew={handleRenew}
                    _id={item._id}
                    dateApplied={item.dateApplied}
                />
            ))}
            <AppDrawer
                content={forms[actions]}
                title={app.drawerTitle}
                open={app.showDrawer}
                onClose={() => dispatch(closeDrawer({ drawerTitle: "", pdfContent: "" }))}
            />
        </Box>
    )
}