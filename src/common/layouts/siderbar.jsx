import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Tooltip } from "@mui/material";

export const sideBarList = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const menus = [
    {
      id: 1,
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/",
      access: "ADMIN",
    },
    {
      id: 2,
      name: "Applications",
      icon: <ArticleIcon />,
      link: "/dashboard/applications",
      access: "ADMIN",
    },
    {
      id: 3,
      name: "Users",
      icon: <PeopleIcon />,
      link: "/dashboard/users",
      access: "ADMIN",
    },
    {
      id: 4,
      name: "Check ID",
      icon: <QrCodeIcon />,
      link: "/checkid",
      access: "GUARD",
    },
  ];

  return (
    <React.Fragment>
      {menus
        .filter(function (items) {
          if (user.role === undefined) return items;
          return items.access === user.role.toUpperCase();
        })
        .map((item) => (
          <Tooltip key={item.id} title={item.name} placement="right-end">
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to={item.link}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} placement="right-end" />
              </ListItemButton>
            </NavLink>
          </Tooltip>
        ))}
    </React.Fragment>
  );
};
