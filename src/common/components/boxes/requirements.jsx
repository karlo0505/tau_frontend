import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ImageConfig } from "../../../constants/fileUpload";
import moment from "moment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PdfViewer from "../pdfViewer";
import AppDrawer from "../popup/AppDrawer";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, openDrawer, showModal } from "../../../store/app.slice";
import { getParameterByName } from "../../../helpers/parameterHelpers";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteRequirementsMutation } from "../../../store/upload.slice";
import { AddRequirements, DeleteRequirements } from "../forms";

export default function UserRequirements({ data, reqGetApplication }) {
  const [actions, setActions] = useState("");
  const [content, setContent] = useState("");
  const [reqDelete, resDelete] = useDeleteRequirementsMutation();
  const [requirements, setRequirements] = useState({});
  const { app } = useSelector((state) => ({
    app: state.app,
  }));

  const token = getParameterByName("token");
  const email = getParameterByName("email");

  const dispatch = useDispatch();

  const handleViewFile = ({ data, title }) => {
    setContent(data);
    dispatch(
      openDrawer({
        drawerTitle: title,
      })
    );
    setActions("viewFile");
  };

  useEffect(() => {
    if (resDelete.isSuccess) {
      dispatch(closeDrawer({ drawerTitle: "" }));
      dispatch(
        showModal({ message: resDelete.data.message, status: "success" })
      );
      reqGetApplication({ email, token });
    }
  }, [resDelete, email, token, reqGetApplication, dispatch]);

  const handleDeleteRequirements = ({ title, params }) => {
    dispatch(
      openDrawer({
        drawerTitle: title,
      })
    );
    setActions("deleteFile");
    setRequirements({
      title,
      params,
    });
  };

  const handleDelete = () => {
    reqDelete({ email, requirements: requirements.params });
  };

  const handleAddRequirements = ({ title }) => {
    dispatch(
      openDrawer({
        drawerTitle: title,
      })
    );
    setActions("addFile");
  };

  function viewFiles(file) {
    return <img width="100%" height="100%" src={file} alt="file" />;
  }

  const viewfiles = {
    viewFile: viewFiles(content),
    deleteFile: (
      <DeleteRequirements
        handleDelete={handleDelete}
        requirements={requirements}
      />
    ),
    addFile: <AddRequirements reqGetApplication={reqGetApplication} />,
  };

  return (
    <Stack>
      <Box>
        <Button
          onClick={() => handleAddRequirements({ title: "New Requirements" })}
          fullWidth
          variant="outlined"
        >
          Upload new{" "}
        </Button>
        {data?.dLicense ? (
          <Paper
            elevation={2}
            sx={{ display: "flex", alignItems: "center", marginTop: 3 }}
          >
            <img
              width={40}
              src={ImageConfig[data?.dLicense.split(".")[1]]}
              alt="pdf"
              style={{ padding: 10 }}
            />
            <Box sx={{ width: "210px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Driver's License
              </Typography>
              <Typography sx={{ fontSize: "11px" }}>
                Expiration Date:{" "}
                {moment(data?.dLicenseExp).add(1, "year").format("ll")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() =>
                  handleViewFile({
                    data: data?.dLicense,
                    title: "Driver's license",
                  })
                }
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <RemoveRedEyeIcon />
              </IconButton>

              <IconButton
                onClick={() =>
                  handleDeleteRequirements({
                    title: "Delete Driver's License",
                    params: "dLicense",
                  })
                }
                color="danger"
                aria-label="upload picture"
                component="label"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          </Paper>
        ) : null}
        {data?.mpPermit ? (
          <Paper
            elevation={3}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <img
              width={40}
              src={ImageConfig[data?.mpPermit.split(".")[1]]}
              alt="pdf"
              style={{ padding: 10 }}
            />
            <Box sx={{ width: "210px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Mayor's Permit
              </Typography>
              <Typography sx={{ fontSize: "11px" }}>
                Expiration Date:{" "}
                {moment(data?.mpPermitExp).add(1, "y").format("ll")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() =>
                  handleViewFile({
                    data: data?.mpPermit,
                    title: "Mayor's Permit",
                  })
                }
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <RemoveRedEyeIcon />
              </IconButton>

              <IconButton
                onClick={() =>
                  handleDeleteRequirements({
                    title: "Mayor's Permit",
                    params: "mpPermit",
                  })
                }
                color="danger"
                aria-label="upload picture"
                component="label"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          </Paper>
        ) : null}
        {data?.crRegister ? (
          <Paper
            elevation={3}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <img
              width={40}
              src={ImageConfig[data?.crRegister.split(".")[1]]}
              alt="pdf"
              style={{ padding: 10 }}
            />
            <Box sx={{ width: "210px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Certificate of Registration(Vehicle)
              </Typography>
              <Typography sx={{ fontSize: "11px" }}>
                Expiration Date:{" "}
                {moment(data?.crRegisterExp).add(1, "y").format("ll")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() =>
                  handleViewFile({
                    data: data?.crRegister,
                    title: "Certificate of Registration(Vehicle)",
                  })
                }
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <RemoveRedEyeIcon />
              </IconButton>

              <IconButton
                onClick={() =>
                  handleDeleteRequirements({
                    title: "Certificate of Registration(Vehicle)",
                    params: "crRegister",
                  })
                }
                color="danger"
                aria-label="upload picture"
                component="label"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          </Paper>
        ) : null}
        {data?.orReciept ? (
          <Paper
            elevation={3}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <img
              width={40}
              src={ImageConfig[data?.orReciept.split(".")[1]]}
              alt="pdf"
              style={{ padding: 10 }}
            />
            <Box sx={{ width: "210px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Official Receipt(Vehicle)
              </Typography>
              <Typography sx={{ fontSize: "11px" }}>
                Expiration Date:{" "}
                {moment(data?.orRecieptExp).add(1, "y").format("ll")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() =>
                  handleViewFile({
                    data: data?.orReciept,
                    title: "Official Reciept(Vehicle)",
                  })
                }
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <RemoveRedEyeIcon />
              </IconButton>

              <IconButton
                onClick={() =>
                  handleDeleteRequirements({
                    title: "Official Reciept(Vehicle)",
                    params: "orReciept",
                  })
                }
                color="danger"
                aria-label="upload picture"
                component="label"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          </Paper>
        ) : null}
        {data?.studentId ? (
          <Paper
            elevation={3}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <img
              width={40}
              src={ImageConfig[data?.studentId.split(".")[1]]}
              alt="pdf"
              style={{ padding: 10 }}
            />
            <Box sx={{ width: "210px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Student ID
              </Typography>
              <Typography sx={{ fontSize: "11px" }}>
                Expiration Date:{" "}
                {moment(data?.studentIdExp).add(1, "y").format("ll")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() =>
                  handleViewFile({ data: data?.studentId, title: "Student ID" })
                }
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <RemoveRedEyeIcon />
              </IconButton>

              <IconButton
                onClick={() =>
                  handleDeleteRequirements({
                    title: "Student ID",
                    params: "studentId",
                  })
                }
                color="danger"
                aria-label="upload picture"
                component="label"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          </Paper>
        ) : null}
        {data?.employeeId ? (
          <Paper
            elevation={3}
            sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
          >
            <img
              width={40}
              src={ImageConfig[data?.employeeId.split(".")[1]]}
              alt="pdf"
              style={{ padding: 10 }}
            />
            <Box sx={{ width: "210px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Employee ID
              </Typography>
              <Typography sx={{ fontSize: "11px" }}>
                Expiration Date:{" "}
                {moment(data?.employeeIdExp).add(1, "y").format("ll")}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() =>
                  handleViewFile({
                    data: data?.employeeId,
                    title: "Employee ID",
                  })
                }
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <RemoveRedEyeIcon />
              </IconButton>

              <IconButton
                onClick={() =>
                  handleDeleteRequirements({
                    title: "Employee ID",
                    params: "employeeId",
                  })
                }
                color="danger"
                aria-label="delete picture"
                component="label"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          </Paper>
        ) : null}
      </Box>
      <AppDrawer
        content={viewfiles[actions]}
        title={app.drawerTitle}
        open={app.showDrawer}
        onClose={() =>
          dispatch(closeDrawer({ drawerTitle: "", pdfContent: "" }))
        }
      />
    </Stack>
  );
}
