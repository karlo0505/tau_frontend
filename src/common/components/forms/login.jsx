import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Container, Typography } from "@mui/material";
import tauLogo from "../../../assets/images/tau.png";
import {
  updateAuth,
  usePostLoginUserMutation,
} from "../../../store/auth.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import Copyright from "../../layouts/copyRigths";
import { useForm } from "react-hook-form";
import { userSchema } from "../../../schema/user";
import { useDispatch } from "react-redux";
import { showModal } from "../../../store/app.slice";
import { useNavigate } from "react-router-dom";
import { _ } from "../../../helpers/errorHerlper";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const dispatch = useDispatch();
  const [reqLogin, { isSuccess, isLoading, isError, data, error }] =
    usePostLoginUserMutation();

  const onSubmit = (data) => {
    reqLogin(data);
  };

  useEffect(() => {
    if (!_.isEmpty(errors)) {
      Object.values(errors).map((item) =>
        dispatch(showModal({ message: item.message, status: "error" }))
      );
    }
  }, [errors, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      dispatch(updateAuth(data.token));
      localStorage.setItem("accessToken", JSON.stringify(data.token));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.userInfo, role: data.role })
      );
      if (data.role === "admin") {
        navigate("/");
      } else {
        navigate("/checkid");
      }
    }
    if (isError) {
      setLoading(false);
      dispatch(showModal({ message: error?.data.message, status: "error" }));
    }
    if (isLoading) {
      setLoading(true);
    }
  }, [isSuccess, data, isError, dispatch, error, navigate, isLoading]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "150px", height: "150px" }}
          src={tauLogo}
          alt="logo"
        />
        <Typography component="h1" variant="h5">
          Electronic Vehicle Pass
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            {...register("email")}
            autoFocus
          />
          <TextField
            margin="normal"
            {...register("password")}
            required
            fullWidth
            type="password"
            label="Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress /> <Typography>Signing in..</Typography>
              </Box>
            ) : (
              <Typography>Sign in</Typography>
            )}
          </Button>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
}
