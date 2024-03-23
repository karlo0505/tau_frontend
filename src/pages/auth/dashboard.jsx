import { Avatar, Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TauLogo from "../../assets/images/tau.png";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ProfileDetails from "../../common/components/tabs";
import {
  updateProfile,
  useGetUserApplicationMutation,
} from "../../store/application.slice";
import { getParameterByName } from "../../helpers/parameterHelpers";
import { useDispatch, useSelector } from "react-redux";

export default function UserDashbaord() {
  const { applications } = useSelector((state) => ({
    applications: state.applications,
  }));
  const [loading, setLoading] = useState(false);
  const [reqGetApplication, resGetApplication] =
    useGetUserApplicationMutation();
  const dispatch = useDispatch();
  const email = getParameterByName("email");
  const token = getParameterByName("token");
  useEffect(() => {
    reqGetApplication({ email, token });
    localStorage.setItem("accessToken", JSON.stringify(token));
  }, [email, token, reqGetApplication]);

  useEffect(() => {
    if (resGetApplication.isSuccess) {
      setLoading(false);
      dispatch(
        updateProfile({
          applications: resGetApplication.data.applications,
          userInfo: resGetApplication.data.userInfo,
          requirements: resGetApplication.data.requirements,
          users: resGetApplication.data.users,
        })
      );
    }
    if (resGetApplication.isLoading) {
      setLoading(true);
    }
    if (resGetApplication.isError) {
      setLoading(false);
    }
  }, [dispatch, resGetApplication]);

  return (
    <Stack sx={{ backgroundColor: "#F5F5F5", width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", margin: 2 }}>
        <Avatar sx={{ width: "50px", height: "50px" }} src={TauLogo} />
        <Typography
          component="span"
          sx={{
            fontWeight: "bolder",
            fontSize: 28,
            fontFamily: "Sans-serif",
            marginLeft: 1,
            color: "#339933",
          }}
        >
          E-Gate Pass
        </Typography>
      </Box>
      <Box sx={{ margin: "5px 20px", display: "flex", alignItems: "center" }}>
        <Box>
          {loading ? (
            <Skeleton animation="wave" />
          ) : (
            <Typography sx={{ fontWeight: "bold", fontSize: 18.2 }}>
              {applications?.profile?.userInfo?.name}
            </Typography>
          )}
          <Box>
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <ManageAccountsIcon sx={{ color: "#038523" }} />
              <Typography
                sx={{ fontWeight: "bold", fontSize: 14, color: "#038523" }}
              >
                Profile Details
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ margin: "15px 2px" }}>
              <Grid xs={8}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    width: 250,
                  }}
                >
                  <Box sx={{ marginRight: 7 }}>
                    <Box sx={{ width: 90 }}>
                      <Typography sx={{ fontSize: 10 }}>
                        Email Address
                      </Typography>
                      {loading ? (
                        <Skeleton animation="wave" />
                      ) : (
                        <Typography
                          sx={{ fontSize: 12, width: 20, fontWeight: 600 }}
                        >
                          {applications?.profile?.userInfo?.email}
                        </Typography>
                      )}
                      <Typography sx={{ fontSize: 10, marginTop: 1 }}>
                        Mobile no.
                      </Typography>
                      {loading ? (
                        <Skeleton animation="wave" />
                      ) : (
                        <Typography
                          sx={{ fontSize: 12, width: 20, fontWeight: 600 }}
                        >
                          +63{applications?.profile?.users?.mobile}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {loading ? (
          <Skeleton
            variant="circular"
            sx={{
              width: 130,
              height: 130,
              position: "absolute",
              left: "59%",
              zIndex: 1000,
            }}
          />
        ) : (
          <Avatar
            srcSet=""
            sx={{
              width: 130,
              height: 130,
              position: "absolute",
              left: "59%",
              zIndex: 1000,
            }}
            src={`${process.env.REACT_APP_ZEPNDS_URI}/api/client/${applications?.profile?.userInfo?.avatar}`}
          />
        )}
      </Box>
      <ProfileDetails
        reqGetApplication={reqGetApplication}
        loadingData={loading}
      />
    </Stack>
  );
}
