import { Box, Typography } from "@mui/material";
import QrReader from "react-qr-reader";
import AuthDashboard from "../../common/layouts/AuthDashboard";
import {
  updateApp,
  useGetApplicationMutation,
} from "../../store/application.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function CheckQrCode() {
  const [loading, setLoading] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [reqGetApplication, { isSuccess, data, isLoading }] =
    useGetApplicationMutation();

  const { applications } = useSelector((state) => ({
    applications: state.applications,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    reqGetApplication({
      token: JSON.parse(localStorage.getItem("accessToken")),
    });
  }, [reqGetApplication]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateApp(data));
      setLoading(false);
    }
    if (isLoading) {
      setLoading(true);
    }
  }, [dispatch, isSuccess, data, isLoading]);

  const handleScanWebCam = (result) => {
    try {
      if (result !== null) {
        const scanned = applications.data.filter((item) => item._id === result);

        return setScanData(...scanned);
      }
      setScanData(undefined);
    } catch (error) {
      setScanData(null);
    }
  };

  const checkVehicle = (status) => {
    if (status === "approved") return "Vehicle Registered";

    return "Not Registered";
  };

  const dataStucture = () => {
    switch (scanData) {
      case null:
        return (
          <Box {...{ width: 400, marginLeft: "25px" }}>
            <Typography>
              {" "}
              Use camera to scan ID If Data of an ID is not appear here the Data
              is not found
            </Typography>
          </Box>
        );
      case undefined:
        return (
          <Box {...{ width: 400, marginLeft: "25px" }}>
            <Typography>
              Use camera to scan ID If Data of an ID is not appear here the Data
              is not found
            </Typography>
          </Box>
        );
      default:
        return (
          <Box {...{ width: 500, marginLeft: "25px" }}>
            <Typography variant="h3" {...{ color: "#038523" }}>
              {checkVehicle(scanData.appStatus.toLowerCase())}
            </Typography>
            <Typography variant="h5">
              Status: {scanData.appStatus.toUpperCase()}
            </Typography>
            <Typography variant="h5">
              Date Applied: {moment(Date(scanData.dateApplied)).format("LL")}
            </Typography>
            <Typography variant="h5">
              Paid at: {moment(Date(scanData.dateOfPayment)).format("LL")}
            </Typography>
            <Typography variant="h5" {...{ fontSize: 20, fontWeight: "bold" }}>
              Plate Number: {scanData.plateNumber}
            </Typography>
            <Typography variant="h5">
              Type of Vehicle: {scanData.typeOfVehicle.toUpperCase()}
            </Typography>
            <Typography variant="h5">
              Date of Expiration:{" "}
              {moment(Date(scanData?.dateOfPayment))
                .add(1, "year")
                .format("ll")}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <AuthDashboard>
      {loading ? (
        <Typography>Loading Presequities </Typography>
      ) : (
        <Box
          {...{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box {...{ width: 300 }}>
            <QrReader
              delay={10000}
              style={{ width: "100%" }}
              onScan={(result, error) => handleScanWebCam(result, error)}
            />
          </Box>
          {dataStucture(scanData)}
        </Box>
      )}
    </AuthDashboard>
  );
}
