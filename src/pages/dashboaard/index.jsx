import React, { useEffect, useState } from "react";
import AuthDashboard from "../../common/layouts/AuthDashboard";
import {
  Box,
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Charts from "../../common/components/graph/index";
import GroupIcon from "@mui/icons-material/Group";
import { updateUsers, useGetAllUsersMutation } from "../../store/auth.slice";
import ElectricRickshawIcon from "@mui/icons-material/ElectricRickshaw";
import { useDispatch, useSelector } from "react-redux";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import moment from "moment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  updateApp,
  useGetApplicationMutation,
} from "../../store/application.slice";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import { getYears } from "../../constants/applications";

export default function Dashboard() {
  const navigation = useNavigate();
  const [selectedYear, setSelectedYear] = useState(2024);
  const [reqGetUsers, { data, isSuccess, isLoading }] =
    useGetAllUsersMutation();
  const [reqGetApplication, resGetApplication] = useGetApplicationMutation();
  const [graph, setGraph] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const { user, applications } = useSelector((state) => ({
    user: state.user,
    applications: state.applications,
  }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storageUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storageUser && storageUser.role === "guard") {
      navigate("/checkId");
    }
  }, [storageUser, navigate]);

  useEffect(() => {
    reqGetUsers({ token: JSON.parse(localStorage.getItem("accessToken")) });
  }, [reqGetUsers]);

  useEffect(() => {
    reqGetApplication({
      token: JSON.parse(localStorage.getItem("accessToken")),
    });
  }, [reqGetApplication]);

  useEffect(() => {
    if (resGetApplication.isSuccess) {
      console.log(
        "resGetApplication",
        resGetApplication.data.map((i) => moment(Date(i.dateApplied)))
      );
      dispatch(
        updateApp(
          resGetApplication.data.filter(
            (item) => moment(Date(item.dateApplied)).year() === selectedYear
          )
        )
      );

      const filteredData = resGetApplication.data.filter(
        (item) => moment(Date(item.dateApplied)).year() === selectedYear
      );

      setGraph(filteredData);
    }
  }, [dispatch, resGetApplication, selectedYear]);

  useEffect(() => {
    if (isSuccess) {
      setLoadingUsers(false);
      dispatch(updateUsers(data.users));
    }
    if (isLoading) {
      setLoadingUsers(true);
    }
  }, [dispatch, isSuccess, data, isLoading]);

  const motorcycle = applications?.data?.filter(
    (items) => items.typeOfVehicle === "motorcycle"
  );

  const pending = applications?.data?.filter(
    (items) => items.appStatus === "pending"
  );

  const approved = applications?.data?.filter(
    (items) => items.appStatus === "approved"
  );

  const tricycle = applications?.data?.filter(
    (items) => items.typeOfVehicle === "tricycle"
  );

  const fourwheels = applications?.data?.filter(
    (items) => items.typeOfVehicle === "4wheels"
  );

  const showFilterdApplication = (filter) => {
    navigation(`/dashboard/applications?filter=${filter}`);
  };

  const showUsers = () => {
    navigation(`/dashboard/users`);
  };

  return (
    <AuthDashboard>
      <Grid container spacing={2} mb={10}>
        <Grid xs={10}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {[
              {
                onClick: () => showUsers(),
                value: user.allusers?.length,
                icon: <GroupIcon />,
                name: user.allusers?.length > 1 ? "Users" : "User",
                color: "#038523",
              },
              {
                onClick: () => showFilterdApplication("approved"),
                value: approved?.length,
                icon: <ThumbUpAltIcon />,
                name: "Approved",
                color: "rgb(130, 202, 157)",
              },
              {
                onClick: () => showFilterdApplication("pending"),
                value: pending?.length,
                icon: <UpdateIcon />,
                name: "Pending",
                color: "rgb(136, 132, 216)",
              },
              {
                onClick: () => showFilterdApplication("tricycle"),
                value: tricycle?.length,
                icon: <ElectricRickshawIcon />,
                name: "Tricycle",
                color: "rgb(130, 202, 157)",
              },
              {
                onClick: () => showFilterdApplication("motorcycle"),
                value: motorcycle?.length,
                icon: <TwoWheelerIcon />,
                name: "Motorcycle",
                color: "#eab676",
              },
              {
                onClick: () => showFilterdApplication("4wheels"),
                value: fourwheels?.length,
                icon: <DirectionsCarIcon />,
                name: "Other vehicles",
                color: "rgb(136, 132, 216)",
              },
            ].map((i, index) => (
              <Paper
                elevation={2}
                sx={{
                  margin: 1,
                  borderBottom: `3px ${i.color} solid`,
                  width: 300,
                }}
                key={index}
              >
                <Box
                  sx={{
                    padding: 2,
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={i.onClick}
                >
                  {i.icon}
                  <Typography>
                    &nbsp;{loadingUsers ? 0 : i.value} {i.name}
                  </Typography>
                </Box>
              </Paper>
            ))}
            <Box {...{ width: "130px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select year
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Select year"
                  defaultValue="2024"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {getYears().map((i) => (
                    <MenuItem value={i}>{i}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12}>
          <Box
            {...{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box {...{ mt: 5, width: "100%", height: "300px" }}>
              <Charts variant="barChart" graphData={graph} />
            </Box>
            <Box {...{ width: "100%", height: "300px", mt: 5 }}>
              <Charts
                graphData={graph}
                year={selectedYear}
                variant="areaChart"
              />
            </Box>
          </Box>
        </Grid>

        <Grid xs={12}>
          <Box {...{ display: "flex" }}>
            <Box {...{ mt: 5, height: "300px", width: "100%" }}>
              <Charts
                graphTitle="Quantity of Vehicle Type"
                type="vehicle"
                graphData={graph}
                year={selectedYear}
              />
            </Box>

            <Box {...{ mt: 5, height: "300px", width: "100%" }}>
              <Charts
                type="application"
                graphData={graph}
                year={selectedYear}
                graphTitle="Quantity of Application Type"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </AuthDashboard>
  );
}
