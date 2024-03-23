import { SwipeableDrawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showPrintDrawer } from "../../../store/app.slice";

export default function PrintDrawer({ children }) {
  const { app } = useSelector((state) => ({
    app: state.app,
  }));
  const dispatch = useDispatch();
  const { openprintdrawer } = app;

  const actionDrawer = () => {
    if (openprintdrawer) {
      dispatch(showPrintDrawer(false));
    } else {
      dispatch(showPrintDrawer(true));
    }
  };

  return (
    <SwipeableDrawer
      open={openprintdrawer}
      onClose={actionDrawer}
      onOpen={actionDrawer}
      anchor="right"
    >
      {children}
    </SwipeableDrawer>
  );
}
