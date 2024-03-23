import {
  Box,
  Divider,
  SwipeableDrawer,
  Typography,
  Button,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../store/app.slice";

export default function AppDrawer({
  open,
  title,
  type,
  dividerStyle,
  content,
  withYesButton,
  yesLabel,
  onClickYes,
  withNoButton,
  noLabel,
  onClickNo,
  variant,
  onClose,
  contentBoxStyle,
  disableBtn,
  ...props
}) {
  const dispatch = useDispatch();
  return (
    <SwipeableDrawer
      open={open}
      onClose={() => (onClose ? onClose() : dispatch(closeDrawer()))}
      onOpen={() => {}}
      anchor="bottom"
      disableDiscovery
      disableSwipeToOpen
      sx={{
        "& .MuiDrawer-paper": { borderRadius: "8px 8px 0px 0px", ...props },
        mt: "50px",
      }}
    >
      <Box>
        <Box
          sx={{
            width: "40px",
            height: "4px",
            bgcolor: "grey.200",
            mx: "auto",
            mt: "12px",
          }}
          borderRadius="4px"
        />
        <Box
          {...{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          {...{ height: "40px", px: "24px", my: "8px", gap: "8px" }}
        >
          <Typography variant="h5">{title ?? title}</Typography>
          {!disableBtn && (
            <Button
              variant="h6-allcaps"
              onClick={() => (onClose ? onClose() : dispatch(closeDrawer()))}
            >
              CLOSE
            </Button>
          )}
        </Box>
        <Divider />
        {content ? (
          <Box p="24px" sx={{ ...contentBoxStyle }}>
            {content}
          </Box>
        ) : (
          <Box p="24px">
            {content}
            {(withYesButton || yesLabel || onClickYes) && (
              <Button
                onClick={() => {
                  onClickYes?.();
                  dispatch(closeDrawer());
                }}
                variant="contained"
                sx={{ width: "100%", mt: "16px" }}
              >
                {yesLabel ?? "OKAY"}
              </Button>
            )}
            {(withNoButton || noLabel || onClickNo || type === "edit") && (
              <Button
                variant="text"
                sx={{ color: "common.black", mt: "16px", mx: "auto" }}
                onClick={() => {
                  onClickNo?.();
                  dispatch(closeDrawer());
                }}
              >
                cancel
              </Button>
            )}
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  );
}
