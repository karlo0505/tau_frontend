import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, showModal } from "../../../store/app.slice";
import { usePutApplicationMutation } from '../../../store/application.slice'
import moment from "moment";
import { getParameterByName } from "../../../helpers/parameterHelpers";

export default function RenewApplication({ selectedId, reqGetApplication, dateApplied }) {
    const [reqRenew, resRenew] = usePutApplicationMutation()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { applications } = useSelector((state) => ({
        applications: state.applications,
    }));
    const email = getParameterByName('email');
    const token = getParameterByName('token');

    const cancell = () => {
        dispatch(closeDrawer({ drawerTitle: "" }))
    }

    useEffect(() => {
        if (resRenew.isSuccess) {
            setLoading(false)
            reqGetApplication({ email, token })
            dispatch(showModal({ message: resRenew.data?.message, status: 'success', }))
            dispatch(closeDrawer({ drawerTitle: "" }))
        }
        if (resRenew.isLoading) {
            setLoading(true)
        }
        if (resRenew.isError) {
            dispatch(closeDrawer({ drawerTitle: "" }))
            dispatch(showModal({ message: resRenew.data?.message, status: 'error', }))
        }
    }, [dispatch, resRenew, email, token, reqGetApplication])

    const update = () => {
        const currentDate = moment(new Date()).format("YYYY-MM-DD")
        const expDate = moment(new Date(dateApplied)).add(1, 'year').format("YYYY-MM-DD")
        if (currentDate < expDate) {
            return dispatch(showModal({ message: "Your application is yet not expired", status: 'error', }))
        }
        if (applications?.profile?.requirements?.mpPermitExp) {
            const expDate = moment(new Date(applications?.profile?.requirements?.mpPermitExp)).add(1, 'year').format("YYYY-MM-DD")
            if (moment(currentDate).isAfter(expDate)) {
                return dispatch(showModal({ message: "Your mayor's permit is expired please update new one", status: 'error', }))
            }
        }
        if (applications?.profile?.requirements?.dLicenseExp) {
            const expDate = moment(new Date(applications?.profile?.requirements?.dLicenseExp)).add(1, 'year').format("YYYY-MM-DD")
            if (moment(currentDate).isAfter(expDate)) {
                return dispatch(showModal({ message: "Your driver's license is expired please update new one", status: 'error', }))
            }
        }
        if (applications?.profile?.requirements?.studentIdExp) {
            const expDate = moment(new Date(applications?.profile?.requirements?.studentIdExp)).add(1, 'year').format("YYYY-MM-DD")

            if (moment(currentDate).isAfter(expDate)) {
                return dispatch(showModal({ message: "Your Student ID is expired please update new one", status: 'error', }))
            }
        }
        if (applications?.profile?.requirements?.orReciept) {
            const expDate = moment(new Date(applications?.profile?.requirements?.orReciept)).add(1, 'year').format("YYYY-MM-DD")
            if (moment(currentDate).isAfter(expDate)) {
                return dispatch(showModal({ message: "Your vehicle official reciept is expired please update new one", status: 'error', }))
            }
        }
        if (applications?.profile?.requirements?.employeeIdExp) {
            const expDate = moment(new Date(applications?.profile?.requirements?.employeeIdExp)).add(1, 'year').format("YYYY-MM-DD")
            if (moment(currentDate).isAfter(expDate)) {
                return dispatch(showModal({ message: "Your employee id is expired please update new one", status: 'error', }))
            }
        }
        if (applications?.profile?.requirements?.crRegisterExp) {

            const expDate = moment(new Date(applications?.profile?.requirements?.crRegisterExp)).add(1, 'year').format("YYYY-MM-DD")
            if (moment(currentDate).isAfter(expDate)) {
                return dispatch(showModal({ message: "Your certificate of registeration of your vehicle is expired please update new one", status: 'error', }))
            }
        }


        reqRenew({ appId: selectedId, newstatus: "renewal" })
    }

    return (
        <Box sx={{ margin: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Are you sure do you want to renew this application?</Typography>
            <Box sx={{ marginTop: 3, display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                <Button onClick={update} variant="outlined">{loading ? "Updating.." : "Ok Proceed"}</Button>
                <Button onClick={cancell} sx={{ borderColor: 'red', color: 'red' }} variant="outlined">Cancell</Button>
            </Box>
        </Box>
    )
}