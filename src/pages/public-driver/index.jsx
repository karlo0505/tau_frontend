import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  CRReciept,
  DLicense,
  MpPermit,
  ORRecpt,
} from "../../common/components/forms";
import MainLayout from "../../common/layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app.slice";
import { usePostRequirementsMutation } from "../../store/upload.slice";
import { getParameterByName } from "../../helpers/parameterHelpers";
import { useNavigate } from "react-router-dom";

const PublicDriver = () => {
  const dispatch = useDispatch();
  const { upload } = useSelector((state) => ({
    upload: state.upload,
  }));
  const [loading, setLoading] = React.useState(false);
  const email = getParameterByName("email");
  const token = getParameterByName("token");
  const navigate = useNavigate();
  const dlicenseRef = React.useRef();
  const orRecieptRef = React.useRef();
  const crRegisterRef = React.useRef();
  const mpPermitRef = React.useRef();
  const [activeStep, setActiveStep] = React.useState(0);
  const [reqRequirements, resRequirements] = usePostRequirementsMutation();
  const steps = [
    {
      label: "Driver License",
      content: (
        <DLicense
          reference={dlicenseRef}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      ),
    },
    {
      label: "Official Receipt",
      content: (
        <ORRecpt
          reference={orRecieptRef}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      ),
    },
    {
      label: "Certificate of Registration(Vehicle)",
      content: (
        <CRReciept
          reference={crRegisterRef}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      ),
    },
    {
      label: "Mayor's permit",
      content: (
        <MpPermit
          reference={mpPermitRef}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      ),
    },
  ];

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (upload.dLicense == null) {
          return dispatch(
            showModal({
              message: "Driver's License is required!",
              status: "error",
            })
          );
        }
        return dlicenseRef.current.submitForm();
      case 1:
        if (upload.orReciept == null) {
          return dispatch(
            showModal({
              message: "Vehicle official receipt is required!",
              status: "error",
            })
          );
        }
        return orRecieptRef.current.submitForm();
      case 2:
        if (upload.crRegister == null) {
          return dispatch(
            showModal({
              message: "Vehicle official receipt is required!",
              status: "error",
            })
          );
        }
        return crRegisterRef.current.submitForm();
      case 3:
        if (upload.mpPermit == null) {
          return dispatch(
            showModal({
              message: "Mayor's permit is required!",
              status: "error",
            })
          );
        }
        return mpPermitRef.current.submitForm();
      default:
        throw new Error("Unknown step");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    if (resRequirements.isSuccess) {
      setLoading(false);
      navigate(`/paymentconfirm?email=${email}&token=${token}`);
    }
    if (resRequirements.isLoading) {
      setLoading(true);
    }
    if (resRequirements.isError) {
      setLoading(false);
      dispatch(
        showModal({
          message: resRequirements.error.data.message,
          status: "error",
        })
      );
    }
  }, [resRequirements, navigate, email, token, dispatch]);

  const handleFinish = () => {
    const _payload = {
      dLicense: upload.dLicense.name,
      dLicenseExp: upload.dLicenseExp,
      crRegister: upload.crRegister.name,
      crRegisterExp: upload.crRegisterExp,
      orReciept: upload.orReciept.name,
      orRecieptExp: upload.orRecieptExp,
      mpPermit: upload.mpPermit.name,
      mpPermitExp: upload.mpPermitExp,
      email,
    };

    reqRequirements(_payload);
  };

  return (
    <MainLayout title="Public Utility Vehicle Requirements">
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Box>{step.content}</Box>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={upload.loading}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      size="small"
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography sx={{ fontFamily: "Poppins-Regular" }}>
              All requirements completed - you&apos;re finished do you want to
              Continue?
            </Typography>
            <Button
              variant="contained"
              onClick={handleFinish}
              sx={{ mt: 5, mr: 1 }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />{" "}
                  <Typography variant="body2">Saving Data</Typography>
                </Box>
              ) : (
                <Typography variant="body2">Ok Proceed</Typography>
              )}
            </Button>
          </Paper>
        )}
      </Box>
    </MainLayout>
  );
};

export default PublicDriver;
