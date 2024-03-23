import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Avatar, Box, Typography } from "@mui/material";
// import { DisconnectSocketServer } from "../../communication/socketConnection";
import { useNavigate } from "react-router-dom";

export default function AccountSettings() {
  const navigate = useNavigate();

  function handleLogout(popup) {
    // DisconnectSocketServer();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
    popup.close();
  }

  // function myAccount(popup) {
  //   popup.close();
  // }

  const userInfo = JSON.parse(localStorage.getItem("user"));

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          {userInfo ? (
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Typography>
                {userInfo?.email.split("@")[0].toUpperCase()}
              </Typography>
              <Avatar
                sx={{ cursor: "pointer", marginLeft: 2 }}
                src={`${process.env.REACT_APP_ZEPNDS_URI}/api/client/${userInfo?.avatar}`}
                {...bindTrigger(popupState)}
              />
            </Box>
          ) : (
            <Avatar
              sx={{ cursor: "pointer", marginLeft: 4 }}
              {...bindTrigger(popupState)}
            >
              N
            </Avatar>
          )}
          <Menu {...bindMenu(popupState)}>
            {/* <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={() => myAccount(popupState)}>
              My account
            </MenuItem> */}
            <MenuItem onClick={() => handleLogout(popupState)}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
