import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, IconButton, Typography, styled } from '@mui/material'
import { updateRequirements, useGetRequirementsMutation } from '../../store/upload.slice'
import { useEffect } from 'react'
import { getParameterByName } from '../../helpers/parameterHelpers'
import { useState } from 'react'
import { ImageConfig } from '../../constants/fileUpload'
import moment from 'moment'
import PageviewIcon from '@mui/icons-material/Pageview';
import AppDrawer from '../../common/components/popup/AppDrawer'
import { closeDrawer, openDrawer } from '../../store/app.slice'
import PdfViewer from '../../common/components/pdfViewer/'

const Item = styled(Box)(() => ({
    fontSize: 10,
    textAlign: 'left',
}));



export default function ViewRequirements() {
    const [reqRequirements, resRequirements] = useGetRequirementsMutation()
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const { upload, app } = useSelector((state) => ({
        upload: state.upload,
        app: state.app,
    }));



    const {
        dLicense, dLicenseExp, mpPermit, mpPermitExp, crRegister, crRegisterExp, orReciept, orRecieptExp, studentId, studentIdExp, employeeId, employeeIdExp } = upload

    const email = getParameterByName('email');
    const token = getParameterByName('token');

    const dispatch = useDispatch()

    useEffect(() => {
        reqRequirements({ email, token })
    }, [reqRequirements, email, token])

    useEffect(() => {
        if (resRequirements.isLoading) {
            setLoading(true)
        }
        if (resRequirements.isSuccess) {
            setLoading(false)
            dispatch(updateRequirements(resRequirements.data.requirements))
        }

    }, [dispatch, resRequirements])

    const handleShowRequirements = ({ data, title }) => {

        setContent(`${process.env.REACT_APP_ZEPNDS_URI}/api/client/${data}`)
        dispatch(openDrawer({
            drawerTitle: title
        }))
    }


    return (
        <Box sx={{ flexGrow: 1, margin: "20px 2px 0px 20px" }}>
            {loading ? <h1>Loading..</h1> : <Grid container>
                {dLicense !== null ?
                    <>
                        <Grid xs={10}>
                            <Item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <img style={{ width: 40, height: 50 }} src={ImageConfig[dLicense.split(".")[1]]} alt="images" />
                                <Box>
                                    <Typography sx={{ fontSize: 13, fontWeight: 'bolder' }} ml={2}>Driver's License</Typography>
                                    <Typography sx={{ fontSize: 12 }} ml={2}>Expiration Date: {moment(dLicenseExp).format("ll")}</Typography>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid xs={2}>
                            <IconButton aria-label="delete" size="large">
                                <PageviewIcon onClick={() => handleShowRequirements({ data: dLicense, title: "Driver's License" })} />
                            </IconButton>
                        </Grid>
                    </> : null
                }
                {mpPermit !== null ?
                    <>
                        <Grid xs={10} mt={2}>
                            <Item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <img style={{ width: 40, height: 50 }} src={ImageConfig[mpPermit.split(".")[1]]} alt="images" />
                                <Box>
                                    <Typography sx={{ fontSize: 13, fontWeight: 'bolder' }} ml={2}>Mayor's Permit</Typography>
                                    <Typography sx={{ fontSize: 12 }} ml={2}>Expiration Date: {moment(mpPermitExp).format("ll")}</Typography>

                                </Box>
                            </Item>
                        </Grid>
                        <Grid xs={2} mt={2}>
                            <IconButton aria-label="delete" size="large">
                                <PageviewIcon onClick={() => handleShowRequirements({ data: mpPermit, title: "Mayor's Permit" })} />
                            </IconButton>
                        </Grid>
                    </> : null
                }
                {orReciept !== null ?
                    <> <Grid xs={10} mt={2}>
                        <Item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img style={{ width: 40, height: 50 }} src={ImageConfig[orReciept.split(".")[1]]} alt="images" />
                            <Box>
                                <Typography sx={{ fontSize: 13, fontWeight: 'bolder' }} ml={2}>Official Reciept(Vehicle)</Typography>
                                <Typography sx={{ fontSize: 12 }} ml={2}>Expiration Date: {moment(orRecieptExp).format("ll")}</Typography>

                            </Box>
                        </Item>
                    </Grid>
                        <Grid xs={2} mt={2}>
                            <IconButton aria-label="delete" size="large">
                                <PageviewIcon onClick={() => handleShowRequirements({ data: orReciept, title: "Official Reciept(Vehicle)" })} />
                            </IconButton>
                        </Grid>
                    </> : null
                }
                {studentId !== null ?
                    <> <Grid xs={10} mt={2}>
                        <Item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img style={{ width: 40, height: 50 }} src={ImageConfig[studentId.split(".")[1]]} alt="images" />
                            <Box>
                                <Typography sx={{ fontSize: 13, fontWeight: 'bolder' }} ml={2}>Student ID</Typography>
                                <Typography sx={{ fontSize: 12 }} ml={2}>Expiration Date: {moment(studentIdExp).format("ll")}</Typography>

                            </Box>
                        </Item>
                    </Grid>
                        <Grid xs={2} mt={2}>
                            <IconButton aria-label="delete" size="large">
                                <PageviewIcon onClick={() => handleShowRequirements({ data: studentId, title: "Student ID" })} />
                            </IconButton>
                        </Grid>
                    </> : null
                }
                {crRegister !== null ?
                    <> <Grid xs={10} mt={2}>
                        <Item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img style={{ width: 40, height: 50 }} src={ImageConfig[crRegister.split(".")[1]]} alt="images" />
                            <Box>
                                <Typography sx={{ fontSize: 13, fontWeight: 'bolder' }} ml={2}>Certificate of Registration (Vehicle)</Typography>
                                <Typography sx={{ fontSize: 12 }} ml={2}>Expiration Date: {moment(crRegisterExp).format("ll")}</Typography>

                            </Box>
                        </Item>
                    </Grid>
                        <Grid xs={2} mt={2}>
                            <IconButton aria-label="delete" size="large">
                                <PageviewIcon onClick={() => handleShowRequirements({ data: crRegister, title: "Certificate of Registration (Vehicle)" })} />
                            </IconButton>
                        </Grid>
                    </> : null
                }
                {employeeId !== null ?
                    <> <Grid xs={10} mt={2}>
                        <Item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img style={{ width: 40, height: 50 }} src={ImageConfig[employeeId.split(".")[1]]} alt="images" />
                            <Box>
                                <Typography sx={{ fontSize: 13, fontWeight: 'bolder' }} ml={2}>Employee ID</Typography>
                                <Typography sx={{ fontSize: 12 }} ml={2}>Expiration Date: {moment(employeeIdExp).format("ll")}</Typography>

                            </Box>
                        </Item>
                    </Grid>
                        <Grid xs={2} mt={2}>
                            <IconButton aria-label="delete" size="large">
                                <PageviewIcon onClick={() => handleShowRequirements({ data: employeeId, title: "Employee ID" })} />
                            </IconButton>
                        </Grid>
                    </> : null
                }

            </Grid>}

            <AppDrawer
                content={<PdfViewer file={content} token={token} />}
                title={app.drawerTitle}
                open={app.showDrawer}
                onClose={() => dispatch(closeDrawer({ drawerTitle: "", pdfContent: "" }))}
            />
        </Box>
    )
}