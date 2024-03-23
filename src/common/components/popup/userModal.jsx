import { useDispatch, useSelector } from "react-redux";
import { hideDeleteModal } from "../../../store/app.slice";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";





export default function UserModal({ handleSubmit, loading, type, mobile }) {
    const dispatch = useDispatch()
    const { app } = useSelector((state) => ({
        app: state.app,
    }));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: mobile ? 200 : 400,
        height: 100,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const style2 = {
        position: 'absolute',
        top: '50%',
        left: mobile ? '29%' : '50%',
        marginTop: 1
    }


    return <Modal
        open={app.deleteModal}
        onClose={() => dispatch(hideDeleteModal({ title: "", content: null, selectedId: "", selectedEmail: "" }))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        size="m"
    >
        <Box>
            <Box sx={style}>
                {app.content}
            </Box >
            <Box sx={style2}>
                <Button onClick={handleSubmit} variant="contained" sx={{ marginRight: 2 }}>{loading ? <Box sx={{ display: 'flex' }}>
                    <CircularProgress /> <Typography>In progress</Typography>
                </Box> : <Typography>{type}</Typography>}</Button>
                <Button onClick={() => dispatch(hideDeleteModal({ title: "", content: null, selectedId: "", selectedEmail: "" }))}>Cancel</Button>
            </Box>
        </Box>
    </Modal>
}


