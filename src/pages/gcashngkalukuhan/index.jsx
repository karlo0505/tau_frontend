import studentMotorcycle from "../../assets/gcash/student/motorcycle.jpg";
import studentTricycle from "../../assets/gcash/student/tricycle.jpg";
import student4wheels from "../../assets/gcash/student/4wheels.jpg";
import employeeMotorcycle from "../../assets/gcash/employee/motorcycle.jpg";
import employeeTricycle from "../../assets/gcash/employee/tricycle.jpg";
import employee4wheels from "../../assets/gcash/employee/4wheels.jpg";
import othersMotorCycle from "../../assets/gcash/others/motorcycle.jpg";
import othersTricycle from "../../assets/gcash/others/tricycle.jpg";
import others4wheels from "../../assets/gcash/others/4wheels.jpg";

import { getParameterByName } from "../../helpers/parameterHelpers";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Gcashngkalukuhan() {
  const email = getParameterByName("email");
  const token = getParameterByName("token");
  const navigate = useNavigate();
  const apptype = getParameterByName("type");
  const vehicletype = getParameterByName("vehicle");

  const ImageGenerator = (type, vehicle) => {
    switch (type) {
      case "student":
        if (vehicle === "motorcycle") {
          return studentMotorcycle;
        }
        if (vehicle === "tricycle") {
          return studentTricycle;
        }
        if (vehicle === "4wheels") {
          return student4wheels;
        }

        break;
      case "employee":
        if (vehicle === "motorcycle") {
          return employeeMotorcycle;
        }
        if (vehicle === "tricycle") {
          return employeeTricycle;
        }
        if (vehicle === "4wheels") {
          return employee4wheels;
        }
        break;

      default:
        if (vehicle === "motorcycle") {
          return othersMotorCycle;
        }
        if (vehicle === "tricycle") {
          return othersTricycle;
        }
        if (vehicle === "4wheels") {
          return others4wheels;
        }
    }
  };

  const handleRedirect = () => {
    navigate(`/userdashboard?email=${email}&token=${token}`);
  };

  return (
    <>
      <Box>
        <div style={{ margin: "20px 20px 0px 20px" }}>
          {" "}
          <img
            style={{ width: "100%", height: "550px" }}
            src={ImageGenerator(apptype, vehicletype)}
            alt={apptype}
          />
        </div>
      </Box>
      <Stack {...{ display: "flex", margin: 2 }}>
        <Button onClick={handleRedirect} variant="contained">
          Continue
        </Button>
      </Stack>
    </>
  );
}
