import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { applicationSchema } from "../../../schema/application";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, showModal } from "../../../store/app.slice";
import { _, paymentHelper } from "../../../helpers/errorHerlper";
import { getParameterByName } from "../../../helpers/parameterHelpers";
import moment from "moment/moment";
import {
  updatePaymentData,
  usePostApplicationMutation,
} from "../../../store/application.slice";
import { useNavigate } from "react-router-dom";

const appType = [
  { name: "Employee", value: "employee" },
  { name: "Student", value: "student" },
  { name: "Public Utility Driver", value: "publicvehicle" },
  { name: "Others", value: "others" },
];

const vhTpe = [
  { value: "motorcycle", name: "Motorycyle" },
  { value: "tricycle", name: "Tricycle" },
  { value: "4wheels", name: "4 or more wheeled vehicle" },
];

export default function NewApplicationForm() {
  const [reqApplication, { data, isSuccess, isError, isLoading }] =
    usePostApplicationMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applicationSchema),
    defaultValues: {
      applicationType: "",
    },
  });

  const email = getParameterByName("email");
  const token = getParameterByName("token");

  const { applications } = useSelector((state) => ({
    applications: state.applications,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      //   dispatch(showModal({ message: data.message, status: "success" }));
      dispatch(closeDrawer({ drawerTitle: "" }));
      dispatch(updatePaymentData(null));
      navigate(
        `/renewcreateapp?email=${email}&token=${token}&appId=${data.newapp._id}`
      );
    }
    if (isError) {
      setLoading(false);
      dispatch(showModal({ message: data.message, status: "error" }));
    }
    if (isLoading) {
      setLoading(true);
    }
  }, [isSuccess, dispatch, data, isError, isLoading, email, token, navigate]);

  const applicationType = watch("applicationType");
  const typeOfVehicle = watch("typeOfVehicle");

  const onSubmit = (data) => {
    const { profile } = applications;
    const { requirements } = profile;

    if (applicationType === "student") {
      if (requirements.studentId === null) {
        return dispatch(
          showModal({
            message: "please upload student Id in your requirements",
            status: "error",
          })
        );
      }
      if (requirements.orReciept === null) {
        return dispatch(
          showModal({
            message: "please upload official receipt in your requirements",
            status: "error",
          })
        );
      }
      if (requirements.crRegister === null) {
        return dispatch(
          showModal({
            message:
              "please upload cerficate of registration in your requirements",
            status: "error",
          })
        );
      }
      if (requirements.dLicense === null) {
        return dispatch(
          showModal({
            message: "please upload driver's license in your requirements",
            status: "error",
          })
        );
      }
    }
    if (applicationType === "employee") {
      if (requirements.employeeId === null) {
        return dispatch(
          showModal({
            message: "please upload employee Id in your requirements",
            status: "error",
          })
        );
      }
      if (requirements.orReciept === null) {
        return dispatch(
          showModal({
            message: "please upload official receipt in your requirements",
            status: "error",
          })
        );
      }
      if (requirements.crRegister === null) {
        return dispatch(
          showModal({
            message:
              "please upload cerficate of registration in your requirements",
            status: "error",
          })
        );
      }
      if (requirements.dLicense === null) {
        return dispatch(
          showModal({
            message: "please upload driver's license in your requirements",
            status: "error",
          })
        );
      }
    }
    if (applicationType === "publicvehicle")
      if (requirements.mpPermit === null) {
        return dispatch(
          showModal({
            message: "please upload mayor's permit in your requirements",
            status: "error",
          })
        );
      }
    if (requirements.orReciept === null) {
      return dispatch(
        showModal({
          message: "please upload official receipt in your requirements",
          status: "error",
        })
      );
    }
    if (requirements.crRegister === null) {
      return dispatch(
        showModal({
          message:
            "please upload cerficate of registration in your requirements",
          status: "error",
        })
      );
    }
    if (requirements.dLicense === null) {
      return dispatch(
        showModal({
          message: "please upload driver's license in your requirements",
          status: "error",
        })
      );
    }

    if (applications?.profile?.requirements?.mpPermitExp) {
      const expDate = moment(
        new Date(applications?.profile?.requirements?.mpPermitExp)
      )
        .add(1, "year")
        .format("YYYY-MM-DD");
      const currentDate = moment(new Date()).format("YYYY-MM-DD");
      if (moment(currentDate).isAfter(expDate)) {
        return dispatch(
          showModal({
            message: "Your mayor's permit is expired please update new one",
            status: "error",
          })
        );
      }
    }
    if (applications?.profile?.requirements?.dLicenseExp) {
      const expDate = moment(
        new Date(applications?.profile?.requirements?.dLicenseExp)
      )
        .add(1, "year")
        .format("YYYY-MM-DD");
      const currentDate = moment(new Date()).format("YYYY-MM-DD");

      if (moment(currentDate).isAfter(expDate)) {
        return dispatch(
          showModal({
            message: "Your driver's license is expired please update new one",
            status: "error",
          })
        );
      }
    }
    if (applications?.profile?.requirements?.studentIdExp) {
      const currentDate = moment(new Date()).format("YYYY-MM-DD");
      const expDate = moment(
        new Date(applications?.profile?.requirements?.studentIdExp)
      )
        .add(1, "year")
        .format("YYYY-MM-DD");

      if (moment(currentDate).isAfter(expDate)) {
        return dispatch(
          showModal({
            message: "Your Student ID is expired please update new one",
            status: "error",
          })
        );
      }
    }
    if (applications?.profile?.requirements?.orReciept) {
      const currentDate = moment(new Date()).format("YYYY-MM-DD");
      const expDate = moment(
        new Date(applications?.profile?.requirements?.orReciept)
      )
        .add(1, "year")
        .format("YYYY-MM-DD");
      if (moment(currentDate).isAfter(expDate)) {
        return dispatch(
          showModal({
            message:
              "Your vehicle official reciept is expired please update new one",
            status: "error",
          })
        );
      }
    }
    if (applications?.profile?.requirements?.employeeIdExp) {
      const currentDate = moment(new Date()).format("YYYY-MM-DD");
      const expDate = moment(
        new Date(applications?.profile?.requirements?.employeeIdExp)
      )
        .add(1, "year")
        .format("YYYY-MM-DD");
      if (moment(currentDate).isAfter(expDate)) {
        return dispatch(
          showModal({
            message: "Your employee id is expired please update new one",
            status: "error",
          })
        );
      }
    }
    if (applications?.profile?.requirements?.crRegisterExp) {
      const currentDate = moment(new Date()).format("YYYY-MM-DD");
      const expDate = moment(
        new Date(applications?.profile?.requirements?.crRegisterExp)
      )
        .add(1, "year")
        .format("YYYY-MM-DD");
      if (moment(currentDate).isAfter(expDate)) {
        return dispatch(
          showModal({
            message:
              "Your certificate of registeration of your vehicle is expired please update new one",
            status: "error",
          })
        );
      }
    }

    const finalData = {
      ...data,
      payment: paymentHelper(applicationType, typeOfVehicle),
      email,
    };

    reqApplication(finalData);
  };

  useEffect(() => {
    if (!_.isEmpty(errors)) {
      Object.values(errors)?.map((item) =>
        dispatch(showModal({ message: item.message, status: "error" }))
      );
    }
  }, [errors, dispatch]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        {...register("plateNumber")}
        fullWidth
        label="Plate Number"
        variant="outlined"
      />
      <FormControl fullWidth sx={{ mt: 2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-readonly-label">
          Application Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-readonly-label"
          id="demo-simple-select-readonly"
          label="Application Type"
          {...register("applicationType")}
        >
          {appType.map((item) => (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-readonly-label">
          Vehicle Type
        </InputLabel>
        <Select
          {...register("typeOfVehicle")}
          labelId="demo-simple-select-readonly-label"
          id="demo-simple-select-readonly"
          label="Vehicle Type"
        >
          {vhTpe.map((item) => (
            <MenuItem key={item.name} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {applicationType !== "" ? (
        <Box style={{ margin: 5 }}>
          <Typography style={{ fontSize: 20 }}>
            Your classification is {applicationType}, so you will pay &#8369;
            {paymentHelper(applicationType, typeOfVehicle)} only.
          </Typography>
        </Box>
      ) : null}
      <Button
        type="submit"
        variant="contained"
        sx={{ margin: "40px 0px" }}
        fullWidth
      >
        {loading ? "Savings.." : "Proceed"}
      </Button>
    </Box>
  );
}
