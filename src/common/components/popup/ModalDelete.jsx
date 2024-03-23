import { useDispatch, useSelector } from "react-redux";
import { hideDeleteModal } from "../../../store/app.slice";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";


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
    gap: 2,
    marginTop: 1,
    width: '100px',
    display: 'flex',
    alignItems: 'center'
}


export default function AppModalDelete({
    reqDelete, deletedId, loading, user
}) {
    const dispatch = useDispatch()
    const { app } = useSelector((state) => ({
        app: state.app,
    }));


    const handleRedirect = () => {
        reqDelete({ deletedId, token: JSON.parse(localStorage.getItem("accessToken")) })

    }

    return <Modal
        open={app.deleteModal}
        onClose={() => dispatch(hideDeleteModal({ title: "", content: null, selectedId: "", selectedEmail: "" }))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box>
            <Box sx={style}>
                {app.content}
            </Box >
            <Box sx={style2}>
                <Button onClick={handleRedirect} variant="contained">{loading ? <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress /> <Typography>Deleting</Typography>
                </Box> : <Typography sx={{ margin: '0px 10px' }}>Delete</Typography>}</Button>
                <Button onClick={() => dispatch(hideDeleteModal({ title: "", content: null, selectedId: "", selectedEmail: "" }))}>Cancel</Button>
            </Box>
        </Box>
    </Modal>
}


