import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, styled } from "@mui/material";
import {
  updateRequirements,
  useGetRequirementsMutation,
} from "../../store/upload.slice";
import { useEffect } from "react";
import { getParameterByName } from "../../helpers/parameterHelpers";
import { useState } from "react";
import { ImageConfig } from "../../constants/fileUpload";
import moment from "moment";

import PdfViewer from "../../common/components/pdfViewer/";
import AuthDashboard from "../../common/layouts/AuthDashboard";
import { useNavigate } from "react-router-dom";

const Item = styled(Box)(() => ({
  fontSize: 10,
  textAlign: "left",
}));

export default function AdminViewRequirements() {
  const [reqRequirements, resRequirements] = useGetRequirementsMutation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { upload } = useSelector((state) => ({
    upload: state.upload,
    app: state.app,
  }));

  const {
    dLicense,
    dLicenseExp,
    mpPermit,
    mpPermitExp,
    crRegister,
    crRegisterExp,
    orReciept,
    orRecieptExp,
    studentId,
    studentIdExp,
    employeeId,
    employeeIdExp,
  } = upload;

  const email = getParameterByName("email");
  const token = getParameterByName("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storageUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storageUser && storageUser.role === "guard") {
      navigate("/checkId");
    }
  }, [navigate, storageUser]);

  useEffect(() => {
    reqRequirements({ email, token });
  }, [reqRequirements, email, token]);

  useEffect(() => {
    if (resRequirements.isLoading) {
      setLoading(true);
    }
    if (resRequirements.isSuccess) {
      setLoading(false);
      dispatch(updateRequirements(resRequirements.data.requirements));
    }
  }, [dispatch, resRequirements]);

  function viewFiles(content) {
    const type = content.split(".")[1];
    const URL = `${process.env.REACT_APP_ZEPNDS_URI}/api/client/${content}`;

    switch (type) {
      case "jpg":
        return <img width="100%" height="100%" src={URL} alt="file" />;
      case "jpeg":
        return <img width="100%" height="100%" src={URL} alt="file" />;
      case "png":
        return <img width="100%" height="100%" src={URL} alt="file" />;
      case "PDF":
        return <PdfViewer file={URL} token={token} />;
      default:
        return (
          <Box>
            <Typography variant="h6">Please select one requirement</Typography>
          </Box>
        );
    }
  }

  const handleViewFunction = (data) => {
    setContent(data);
  };

  return (
    <AuthDashboard>
      <Grid container spacing={2}>
        <Grid item xs={3} {...{ borderRight: "1px solid black" }}>
          <Box sx={{ flexGrow: 1, margin: "20px 2px 0px 20px" }}>
            {loading ? (
              <h1>Loading..</h1>
            ) : (
              <Grid container>
                {dLicense !== null ? (
                  <Grid xs={10}>
                    <Item
                      onClick={() => handleViewFunction(dLicense)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: 40, height: 50 }}
                        src={ImageConfig[dLicense.split(".")[1]]}
                        alt="images"
                      />
                      <Box>
                        <Typography
                          sx={{ fontSize: 13, fontWeight: "bolder" }}
                          ml={2}
                        >
                          Driver's License
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} ml={2}>
                          Expiration Date: {moment(dLicenseExp).format("ll")}
                        </Typography>
                      </Box>
                    </Item>
                  </Grid>
                ) : null}
                {mpPermit !== null ? (
                  <Grid xs={10} mt={2}>
                    <Item
                      onClick={() => handleViewFunction(mpPermit)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: 40, height: 50 }}
                        src={ImageConfig[mpPermit.split(".")[1]]}
                        alt="images"
                      />
                      <Box>
                        <Typography
                          sx={{ fontSize: 13, fontWeight: "bolder" }}
                          ml={2}
                        >
                          Mayor's Permit
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} ml={2}>
                          Expiration Date: {moment(mpPermitExp).format("ll")}
                        </Typography>
                      </Box>
                    </Item>
                  </Grid>
                ) : null}
                {orReciept !== null ? (
                  <Grid xs={10} mt={2}>
                    <Item
                      onClick={() => handleViewFunction(orReciept)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: 40, height: 50 }}
                        src={ImageConfig[orReciept.split(".")[1]]}
                        alt="images"
                      />
                      <Box>
                        <Typography
                          sx={{ fontSize: 13, fontWeight: "bolder" }}
                          ml={2}
                        >
                          Official Reciept(Vehicle)
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} ml={2}>
                          Expiration Date: {moment(orRecieptExp).format("ll")}
                        </Typography>
                      </Box>
                    </Item>
                  </Grid>
                ) : null}
                {studentId !== null ? (
                  <Grid xs={10} mt={2}>
                    <Item
                      onClick={() => handleViewFunction(studentId)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: 40, height: 50 }}
                        src={ImageConfig[studentId.split(".")[1]]}
                        alt="images"
                      />
                      <Box>
                        <Typography
                          sx={{ fontSize: 13, fontWeight: "bolder" }}
                          ml={2}
                        >
                          Student ID
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} ml={2}>
                          Expiration Date: {moment(studentIdExp).format("ll")}
                        </Typography>
                      </Box>
                    </Item>
                  </Grid>
                ) : null}
                {crRegister !== null ? (
                  <Grid xs={10} mt={2}>
                    <Item
                      onClick={() => handleViewFunction(crRegister)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: 40, height: 50 }}
                        src={ImageConfig[crRegister.split(".")[1]]}
                        alt="images"
                      />
                      <Box>
                        <Typography
                          sx={{ fontSize: 13, fontWeight: "bolder" }}
                          ml={2}
                        >
                          Certificate of Registration (Vehicle)
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} ml={2}>
                          Expiration Date: {moment(crRegisterExp).format("ll")}
                        </Typography>
                      </Box>
                    </Item>
                  </Grid>
                ) : null}
                {employeeId !== null ? (
                  <Grid xs={10} mt={2}>
                    <Item
                      onClick={() => handleViewFunction(employeeId)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        cursor: "pointer",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{ width: 40, height: 50 }}
                        src={ImageConfig[employeeId.split(".")[1]]}
                        alt="images"
                      />
                      <Box>
                        <Typography
                          sx={{ fontSize: 13, fontWeight: "bolder" }}
                          ml={2}
                        >
                          Employee ID
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} ml={2}>
                          Expiration Date: {moment(employeeIdExp).format("ll")}
                        </Typography>
                      </Box>
                    </Item>
                  </Grid>
                ) : null}
              </Grid>
            )}
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box {...{ m: 2 }}>{viewFiles(content)}</Box>
        </Grid>
      </Grid>
    </AuthDashboard>
  );
}
