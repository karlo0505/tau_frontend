import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { DLicense, MpPermit, ORRecpt, CRReciept, StudentId, EmployeeId } from './index'
import { usePutRequirementsMutation } from '../../../store/upload.slice'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer, showModal } from '../../../store/app.slice'
import { getParameterByName } from '../../../helpers/parameterHelpers'

const formType = [
    {
        name: "Driver's License", value: "dLicense",
    },
    {
        name: "Mayor's Permit", value: "mpPermit",
    },
    {
        name: "Official Receipt", value: "orReciept",
    },
    {
        name: "Certificate of Registration", value: "crRegister"
    },
    {
        name: "Employee Id", value: "employeeId",
    },
    {
        name: "Student ID", value: "studentId"
    }
]

export default function AddRequirements({ reqGetApplication }) {
    const { applications } = useSelector((state) => ({
        applications: state.applications,
    }));
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("")
    const [reqAddRequirements, resAddRequirements] = usePutRequirementsMutation()
    const dlRef = useRef()
    const mpRef = useRef()
    const orRef = useRef()
    const crRef = useRef()
    const empRef = useRef()
    const studRef = useRef()

    const handleChange = (event) => {
        setType(event.target.value);
    };
    const email = getParameterByName("email")
    const token = getParameterByName("token")
    const dispatch = useDispatch()

    useEffect(() => {
        if (resAddRequirements.isSuccess) {
            setLoading(false)
            dispatch(closeDrawer({ drawerTitle: "" }))
            dispatch(showModal({ message: resAddRequirements?.data?.message, status: 'success', }))
            reqGetApplication({ email, token })
        }
        if (resAddRequirements.isLoading) {
            setLoading(true)
        }
        if (resAddRequirements.isError) {
            dispatch(closeDrawer({ drawerTitle: "" }))
            dispatch(showModal({ message: resAddRequirements.data?.message, status: 'error', }))

        }
    }, [dispatch, resAddRequirements, email, token, reqGetApplication])

    const functionGetForm = () => {
        if (type === "dLicense") {
            return <DLicense reference={dlRef} singleFile={true} reqAddRequirements={reqAddRequirements} type={type} />
        }
        if (type === "mpPermit") {
            return <MpPermit reference={mpRef} singleFile={true} reqAddRequirements={reqAddRequirements} type={type} />
        }
        if (type === "orReciept") {
            return <ORRecpt reference={orRef} singleFile={true} reqAddRequirements={reqAddRequirements} type={type} />
        }
        if (type === "crRegister") {
            return <CRReciept reference={crRef} singleFile={true} reqAddRequirements={reqAddRequirements} type={type} />
        }
        if (type === "employeeId") {
            return <EmployeeId reference={empRef} singleFile={true} reqAddRequirements={reqAddRequirements} type={type} />
        }
        if (type === "studentId") {
            return <StudentId reference={studRef} singleFile={true} reqAddRequirements={reqAddRequirements} type={type} />
        }
    }

    const handleNewRequirements = () => {
        const { profile } = applications
        const { requirements } = profile


        switch (type) {
            case "dLicense":
                if (requirements.dLicense && requirements.dLicense !== null) {
                    return dispatch(showModal({ message: "Driver's License is already exist", status: 'error', }))
                }
                return dlRef.current.submitForm()
            case "mpPermit":
                if (requirements.mpPermit && requirements.mpPermit !== null) {
                    return dispatch(showModal({ message: "Mayor's Permit is already exist", status: 'error', }))
                }
                return mpRef.current.submitForm()
            case "orReciept":
                if (requirements.orReciept && requirements.orReciept !== null) {
                    return dispatch(showModal({ message: "Official receipt is already exist", status: 'error', }))
                }
                return orRef.current.submitForm()
            case "crRegister":
                if (requirements.crRegister && requirements.crRegister !== null) {
                    return dispatch(showModal({ message: "Certificate of registration is already exist", status: 'error', }))
                }
                return crRef.current.submitForm()
            case "employeeId":
                if (requirements.employeeId && requirements.employeeId !== null) {
                    return dispatch(showModal({ message: "Employee id is already exist", status: 'error', }))
                }
                return empRef.current.submitForm()
            case "studentId":
                if (requirements.studentId && requirements.studentId !== null) {
                    return dispatch(showModal({ message: "Student id is already exist", status: 'error', }))
                }
                return studRef.current.submitForm()
            default:
                return null
        }
    }

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Requirement Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Select Requirement Type"
                    onChange={handleChange}
                >
                    {formType.map(item => (
                        <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                    ))}


                </Select>
            </FormControl>
            {functionGetForm()}
            <Button fullWidth onClick={handleNewRequirements} sx={{ margin: '20px 0px' }} variant='contained'>{loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress /><Typography>saving now..</Typography>
            </Box> : 'Save'}</Button>
        </Box>
    )
}