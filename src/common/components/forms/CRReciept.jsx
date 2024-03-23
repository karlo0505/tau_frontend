import React, { useEffect, useImperativeHandle } from "react";
import {
  Box,
  FormLabel,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  deleteFiles,
  showLoading,
  uploadFiles,
  usePostUploadImagesMutation,
} from "../../../store/upload.slice";
import uploadImage from "../../../assets/images/cloud-upload.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { ImageConfig } from "../../../constants/fileUpload";
import { useForm } from "react-hook-form";
import { _ } from "../../../helpers/errorHerlper";
import { showModal } from "../../../store/app.slice";
import { crRegisterSchema } from "../../../schema/file";
import { getParameterByName } from "../../../helpers/parameterHelpers";

const Label = styled(FormLabel)({
  position: "relative",
  display: "flex",
  gap: "10px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  padding: "20px",
  borderRadius: "10px",
  border: "2px dashed #555",
  color: "#444",
  cursor: "pointer",
  transition: "background .2s ease-in-out",
  margin: "20px 0px",
});

const CRReciept = ({
  reference,
  setActiveStep,
  activeStep,
  singleFile,
  type,
  reqAddRequirements,
}) => {
  const { upload } = useSelector((state) => ({
    upload: state.upload,
  }));
  const [reqUpload, resUpload] = usePostUploadImagesMutation();
  const dispatch = useDispatch();
  const email = getParameterByName("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(crRegisterSchema),
  });

  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (Object.keys(files).length > 0) {
      var formData = new FormData();
      for (const key of Object.keys(files)) {
        formData.append("images", files[key]);
      }
      reqUpload(formData);
    }
    return;
  };

  useEffect(() => {
    if (resUpload.isSuccess) {
      dispatch(showLoading(false));
      dispatch(
        uploadFiles({
          crRegister: {
            name: resUpload?.data?.image,
            origin: resUpload?.data?.origin,
            type: resUpload?.data?.origin.split(".")[1],
          },
        })
      );
    }
    if (resUpload.isError) {
      dispatch(showLoading(false));
      dispatch(
        showModal({ message: resUpload?.error?.data?.message, status: "error" })
      );
    }
    if (resUpload.isLoading) {
      dispatch(showLoading(true));
    }
  }, [resUpload, dispatch]);

  const fileSingleRemove = () => {
    dispatch(deleteFiles({ crRegister: null }));
  };

  useEffect(() => {
    if (!_.isEmpty(errors)) {
      Object.values(errors).map((item) =>
        dispatch(showModal({ message: item.message, status: "error" }))
      );
    }
  }, [errors, dispatch]);

  const onSubmit = (data) => {
    if (singleFile) {
      reqAddRequirements({
        email,
        requirements: upload.crRegister.name,
        requirementExp: data.crRegisterExp,
        type,
      });
    } else {
      setActiveStep(activeStep + 1);
      dispatch(uploadFiles(data));
    }
  };

  useImperativeHandle(reference, () => ({
    submitForm() {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <Box sx={{ margin: "20px 0px" }}>
      <FormLabel>Vehicle certificate of registration Expiration Date</FormLabel>
      <TextField
        {...register("crRegisterExp")}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
      <Label>
        {upload.loading ? (
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="success" />{" "}
            <Typography>Uploading</Typography>{" "}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: 50, height: 50 }}
              src={uploadImage}
              alt="upload"
            />
            <Typography variant="body1">Select image file to upload</Typography>
            <input
              onChange={handleChange}
              hidden
              accept="image/*"
              type="file"
            />
          </Box>
        )}
      </Label>
      <Box>
        {upload.crRegister !== null && (
          <Box
            sx={{
              position: "relative",
              backgroundColor: "#f5f8ff",
              borderRadius: 1.5,
              p: 0.5,
              marginBottom: 5,
            }}
          >
            <Box display="flex" sx={{ width: "100%" }}>
              <img
                src={ImageConfig[upload?.crRegister?.type]}
                alt="upload"
                style={{
                  height: "2.4rem",
                  objectFit: "contain",
                }}
              />
              <Box sx={{ ml: 1 }}>
                <Typography sx={{ fontSize: 10 }}>
                  {upload.crRegister.origin}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={fileSingleRemove}
              sx={{
                color: "#df2c0e",
                position: "absolute",
                right: "0.5rem",
                top: "60%",
                transform: "translateY(-50%)",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CRReciept;
