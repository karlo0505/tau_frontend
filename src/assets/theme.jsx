import { createTheme } from "@mui/material/styles";
import typography from "./font/typography";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#038523",
    },
    secondary: {
      main: "#dcea40",
    },
    info: {
      main: "#bfbfbf",
    },
    danger: {
      main: "rgb(238, 17, 17)",
    },
  },
  typography: typography,
});
