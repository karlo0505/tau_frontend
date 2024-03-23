import { useDispatch, useSelector } from "react-redux";
import { hideModalContent, showModal } from "../../../store/app.slice";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Base64 } from "../../../helpers/decodex";
import { usePutSingleApplicationMutation } from '../../../store/application.slice'
import { useEffect, useState } from "react";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 100,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: 1
}


export default function AppModal({ status }) {
    const [reqUpdate, { data, isSuccess, isLoading, isError }] = usePutSingleApplicationMutation()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { app } = useSelector((state) => ({
        app: state.app,
    }));
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            if (app.selectedEmail && app.selectedId) {
                navigate(`/singleapplication?id=${Base64.encode(app?.selectedId)}&email=${Base64.encode(app?.selectedEmail)}`)
                dispatch(hideModalContent({ title: '', content: null, selectedId: "" }))
            }
        }
        if (isLoading) {
            setLoading(true)
        }
        if (isError) {
            dispatch(showModal({ message: data.message, status: 'error', }))
        }
    }, [isSuccess, dispatch, app, navigate, isLoading, data, isError])

    const handleRedirect = () => {
        if (status === "approved") {
            navigate(`/singleapplication?id=${Base64.encode(app?.selectedId)}&email=${Base64.encode(app?.selectedEmail)}`)
            dispatch(hideModalContent({ title: '', content: null, selectedId: "" }))
        } else {
            return reqUpdate({ appId: app.selectedId, email: app.selectedEmail })
        }

    }

    return <Modal
        open={app.conditionalModal}
        onClose={() => dispatch(hideModalContent({ title: "", content: null, selectedId: "", selectedEmail: "" }))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box>
            <Box sx={style}>
                {app.content}
            </Box >
            <Box sx={style2}>
                <Button onClick={handleRedirect} variant="contained" sx={{ marginRight: 2 }}>
                    {loading ? <Box sx={{ display: 'flex' }}><CircularProgress /> <Typography>Generating pdf..</Typography>
                    </Box> : <Typography>Print ID</Typography>}</Button>
                <Button onClick={() => dispatch(hideModalContent({ title: "", content: null, selectedId: "", selectedEmail: "" }))}>Cancel</Button>
            </Box>
        </Box>
    </Modal>
}


