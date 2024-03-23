import React, { lazy, Suspense } from "react";
import PrivateRoute from "../helpers/authHelper";
import LinearProgress from "@mui/material/LinearProgress";
import { URLparams } from "../constants/url";
import Payment from "../pages/payment";
import PaymentApproval from "../pages/payment/approval";
import RenewAddNewApplication from "../pages/payment/renew";
import CheckQrCode from "../pages/dashboaard/checkQrCode";
const Student = lazy(() => import("../pages/students/index"));
const Employee = lazy(() => import("../pages/employee/index"));
const PDriver = lazy(() => import("../pages/public-driver/index"));
const Others = lazy(() => import("../pages/others/index"));
const Requirements = lazy(() => import("../pages/requirements/index"));
const Login = lazy(() => import("../pages/auth/login"));
const Dashboard = lazy(() => import("../pages/dashboaard/index"));
const Applications = lazy(() => import("../pages/dashboaard/applications"));
const Gcashngkalukuhan = lazy(() => import("../pages/gcashngkalukuhan"));

const SingleApplication = lazy(() =>
  import("../pages/dashboaard/singleapplication")
);
const AdminRequirements = lazy(() =>
  import("../pages/dashboaard/requirements")
);
const Users = lazy(() => import("../pages/dashboaard/users"));
const UserDashbaord = lazy(() => import("../pages/auth/dashboard"));
const NotFoundPage = lazy(() => import("../pages/public/notfound"));

export const routing = [
  {
    path: `/${URLparams.student}`,
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <Student />
      </Suspense>
    ),
    name: "student",
    index: false,
  },
  {
    path: `/${URLparams.employee}`,
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <Employee />
      </Suspense>
    ),
    index: false,
    name: "employee",
  },
  {
    path: `/${URLparams.publicvehicle}`,
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PDriver />
      </Suspense>
    ),
    index: false,
    name: "pdriver",
  },
  {
    path: `/${URLparams.others}`,
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <Others />
      </Suspense>
    ),
    index: false,
    name: "others",
  },
  {
    path: "/requirements",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PrivateRoute>
          <Requirements />
        </PrivateRoute>
      </Suspense>
    ),
    index: false,
    name: "requirements",
  },
  {
    path: "/gcashngkalukuhan",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PrivateRoute>
          <Gcashngkalukuhan />
        </PrivateRoute>
      </Suspense>
    ),
    index: false,
    name: "requirements",
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <Login />
      </Suspense>
    ),
    index: false,
    name: "login",
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Suspense>
    ),
    index: true,
    name: "dashboard",
  },
  {
    path: "/dashboard/applications",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PrivateRoute>
          <Applications />
        </PrivateRoute>
      </Suspense>
    ),
    index: false,
    name: "applications",
  },
  {
    path: "/singleapplication",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PrivateRoute>
          <SingleApplication />
        </PrivateRoute>
      </Suspense>
    ),
    index: false,
    name: "singleapplication",
  },
  {
    path: "/dashboard/requirements",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PrivateRoute>
          <AdminRequirements />
        </PrivateRoute>
      </Suspense>
    ),
    index: false,
    name: "adminrequirements",
  },
  {
    path: "/dashboard/users",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PrivateRoute>
          <Users />
        </PrivateRoute>
      </Suspense>
    ),
    index: false,
    name: "users",
  },
  {
    path: "/userdashboard",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <UserDashbaord />
      </Suspense>
    ),
    index: false,
    name: "userdashboard",
  },
  {
    path: "/notfound",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <NotFoundPage />
      </Suspense>
    ),
    index: false,
    name: "notfound",
  },
  {
    path: "/paymentconfirm",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <Payment />
      </Suspense>
    ),
    index: false,
    name: "notfound",
  },
  {
    path: "/purchase/success",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <PaymentApproval />
      </Suspense>
    ),
    index: false,
    name: "notfound",
  },
  {
    path: "/renewcreateapp",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <RenewAddNewApplication />
      </Suspense>
    ),
    index: false,
    name: "notfound",
  },
  {
    path: "/checkid",
    element: (
      <Suspense fallback={<LinearProgress sx={{ marginTop: 1 }} />}>
        <CheckQrCode />
      </Suspense>
    ),
    index: false,
    name: "notfound",
  },
];
