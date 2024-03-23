import React, { useEffect, useState } from "react";
import AuthDashboard from "../../common/layouts/AuthDashboard";
import { getParameterByName } from "../../helpers/parameterHelpers";
import { Base64 } from "../../helpers/decodex";
import {
  updateSingleApp,
  useGetSingleApplicationMutation,
} from "../../store/application.slice";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../store/upload.slice";
import { showModal } from "../../store/app.slice";
import { Box, Skeleton } from "@mui/material";
import RenderPDF from "../../common/components/pdfViewer/renderPdf";
import { useNavigate } from "react-router-dom";

export default function SingleApplication() {
  const [reqSingleApp, { data, isError, isSuccess, isLoading }] =
    useGetSingleApplicationMutation();
  const [loading, setLoading] = useState(false);
  const id = getParameterByName("id");
  const email = getParameterByName("email");
  const { user } = useSelector((state) => ({
    user: state.user,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const decodedId = Base64.decode(id);
  const decodedEmail = Base64.decode(email);
  const storageUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storageUser && storageUser.role === "guard") {
      navigate("/checkId");
    }
  }, [storageUser, navigate]);

  useEffect(() => {
    reqSingleApp({
      appId: decodedId,
      email: decodedEmail,
      token:
        user.token === null
          ? JSON.parse(window.localStorage.getItem("accessToken"))
          : user.token,
    });
  }, [reqSingleApp, decodedId, decodedEmail, user]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSingleApp(data));
      setLoading(false);
    }
    if (isLoading) {
      setLoading(true);
    }
    if (isError) {
      dispatch(showLoading(false));
      dispatch(
        showModal({ message: data?.error?.data?.message, status: "error" })
      );
    }
  }, [isSuccess, data, dispatch, isLoading, isError]);

  return (
    <AuthDashboard>
      <Box>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
          </Box>
        ) : (
          <RenderPDF id={decodedId} />
        )}
      </Box>
    </AuthDashboard>
  );
}
