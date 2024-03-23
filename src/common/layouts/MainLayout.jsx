import { Box, Typography } from "@mui/material";
import React from "react";

const MainLayout = ({ children, title }) => {
  return <Box sx={{ margin: "0px 15px" }}>
    {title ? <Typography variant="h2" sx={{ fontSize: 25, textAlign: 'center', padding: 2 }}>{title}</Typography> : null}
    {children}

  </Box>;
};

export default MainLayout;
