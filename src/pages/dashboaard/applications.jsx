import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AuthDashboard from "../../common/layouts/AuthDashboard";

import {
  Button,
  ButtonGroup,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import {
  updateApp,
  useGetApplicationMutation,
  useDeleteSingleApplicationMutation,
} from "../../store/application.slice";
import { useDispatch, useSelector } from "react-redux";
import AppModal from "../../common/components/popup/Modal";
import {
  hideDeleteModal,
  showDeleteModal,
  showModal,
  showModalContent,
  showPrintDrawer,
} from "../../store/app.slice";
import AppModalDelete from "../../common/components/popup/ModalDelete";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useNavigate } from "react-router-dom";
import { getParameterByName } from "../../helpers/parameterHelpers";
import { getYears, months, vehicles } from "../../constants/applications";
import moment from "moment";
import DataTables from "../../common/components/grid/tables";
import { onChangeLeft, onChangeRight } from "../../helpers/clickbutton";
import PrintDrawer from "../../common/components/popup/PrintDrawer";
import PrintDocuments from "../../common/components/print/printDocuments";

export default function Applications() {
  const [pageNumber, setPageNumber] = useState(0);
  const [isActiveLeft, setActiveLeft] = useState(false);
  const [isActiveRight, setActiveRight] = useState(true);
  const [perPage, setPerPage] = useState(10);

  const pageVisited = perPage * pageNumber;

  const [input, setInput] = useState("");
  const { applications, user } = useSelector((state) => ({
    applications: state.applications,
    user: state.user,
  }));
  const [loading, setLoading] = useState(false);

  const [reqDelete, resDelete] = useDeleteSingleApplicationMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reqGetApplication, { isSuccess, data, isLoading }] =
    useGetApplicationMutation();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectMonth] = useState(moment(new Date()).month());

  const storageUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storageUser && storageUser.role === "guard") {
      navigate("/checkId");
    }
  }, [storageUser, navigate]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateApp(data));
      setLoading(false);
    }
  }, [dispatch, isSuccess, data]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

  useEffect(() => {
    reqGetApplication({
      token: JSON.parse(localStorage.getItem("accessToken")),
    });
  }, [reqGetApplication]);

  const totalPages = applications?.data?.length;

  const rows = applications?.data
    ?.slice(pageVisited, pageVisited + perPage)
    .map(
      ({
        _id,
        applicationType,
        email,
        plateNumber,
        payment,
        appStatus,
        typeOfVehicle,
      }) => ({
        id: _id,
        email,
        applicationType,
        payment: `₱ ${payment}`,
        plateNumber,
        typeOfVehicle,
        appStatus,
        active: false,
      })
    )
    .filter(function (items) {
      const filter = getParameterByName("filter");
      switch (filter) {
        case "motorcycle":
          return items.typeOfVehicle === "motorcycle";
        case "tricycle":
          return items.typeOfVehicle === "tricycle";
        case "4wheels":
          return items.typeOfVehicle === "4wheels";
        case "approved":
          return items.appStatus === "approved";
        case "pending":
          return items.appStatus === "pending";
        case "all":
          return items;
        default:
          return items;
      }
    })
    .filter((item) => moment(Date(item.dateApplied)).year() === selectedYear)
    .filter((item) => moment(Date(item.dateApplied)).month() === selectedMonth)
    .filter(function (items) {
      if (input !== "")
        return (
          items.email.includes(input.toLowerCase()) ||
          items.plateNumber.includes(input.toLowerCase())
        );
      return items;
    })
    .sort((a, b) => b.createdDate - a.createdDate);

  useEffect(() => {
    if (resDelete.isSuccess) {
      dispatch(
        hideDeleteModal({
          title: "",
          content: null,
          selectedId: "",
          selectedEmail: "",
        })
      );
      reqGetApplication({
        token: JSON.parse(localStorage.getItem("accessToken")),
      });
      setLoading(false);
    }
    if (resDelete.isLoading) {
      setLoading(true);
    }
  }, [resDelete, dispatch, reqGetApplication]);

  const handleShowPdf = () => {
    if (selectedRows.length > 1) {
      return dispatch(
        showModal({
          message: "please select only one application",
          status: "error",
        })
      );
    } else {
      return dispatch(
        showModalContent({
          title: "New PDF",
          content: `Must be paid ${selectedRows[0].payment} Do you want to continue and approve ${selectedRows[0].email} application?`,
          selectedId: selectedRows[0],
          selectedEmail: rows.filter((item) => item.id === selectedRows[0])[0]
            .email,
        })
      );
    }
  };

  const handleViewRequirements = () => {
    if (selectedRows.length > 1) {
      return dispatch(
        showModal({
          message: "please select only one application",
          status: "error",
        })
      );
    } else {
      return navigate(
        `/dashboard/requirements?email=${
          rows.filter((item) => item.id === selectedRows[0])[0].email
        }&token=${JSON.parse(window.localStorage.getItem("accessToken"))}`
      );
    }
  };

  const openPrint = () => {
    dispatch(showPrintDrawer(true));
  };

  return (
    <AuthDashboard>
      <PrintDrawer>
        <PrintDocuments data={rows} />
      </PrintDrawer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group "
        >
          <Button
            disabled={!isActiveLeft}
            onClick={() =>
              onChangeLeft(
                pageVisited,
                pageNumber,
                setActiveRight,
                setActiveLeft,
                setPageNumber
              )
            }
          >
            <ArrowBackIosNewIcon />
          </Button>
          <Button
            disabled={!isActiveRight}
            onClick={() =>
              onChangeRight(
                pageVisited,
                pageNumber,
                setActiveRight,
                setActiveLeft,
                setPageNumber,
                totalPages,
                perPage
              )
            }
          >
            <ArrowForwardIosIcon />
          </Button>
          <Button
            onClick={() =>
              dispatch(
                showDeleteModal({
                  title: "",
                  content: `Are you sure you want to delete ${
                    selectedRows.length
                  } ${selectedRows.length > 1 ? "items" : "item"}`,
                  selectedId: "",
                  selectedEmail: "",
                })
              )
            }
            disabled={selectedRows.length <= 0 ? true : false}
            variant="outlined"
          >
            <DeleteIcon />
          </Button>
          <Button
            disabled={selectedRows.length <= 0 ? true : false}
            onClick={handleShowPdf}
          >
            <CheckBoxIcon />
          </Button>

          <Button
            variant="outlined"
            disabled={selectedRows.length <= 0 ? true : false}
            onClick={handleViewRequirements}
          >
            <PageviewIcon />
          </Button>
          <Button onClick={openPrint}>
            <LocalPrintshopIcon />
          </Button>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-multiple-name-label">
              Select Vehicle Type
            </InputLabel>
            <Select
              onChange={(e) =>
                navigate(`/dashboard/applications?filter=${e.target.value}`)
              }
              input={<OutlinedInput label="Name" />}
            >
              {vehicles.map((item) => (
                <MenuItem key={item.name} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="demo-multiple-name-label">Select Year</InputLabel>
            <Select
              onChange={(e) => setSelectedYear(e.target.value)}
              input={<OutlinedInput label="Name" />}
            >
              {getYears().map((i) => (
                <MenuItem value={i}>{i}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 150 }}>
            <InputLabel id="demo-multiple-name-label">Select Month</InputLabel>
            <Select
              onChange={(e) => setSelectMonth(e.target.value)}
              input={<OutlinedInput label="Name" />}
            >
              {months.map((i) => (
                <MenuItem key={i.id} value={i.value}>
                  {i.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="demo-multiple-name-label">
              Page Size - {perPage}
            </InputLabel>
            <Select
              onChange={(e) => setPerPage(e.target.value)}
              input={<OutlinedInput label="Name" />}
            >
              {[10, 40, 80, applications?.data?.length].map((i) => (
                <MenuItem value={i}>{i}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </ButtonGroup>
        <TextField
          onChange={(e) => setInput(e.target.value)}
          size="sm"
          sx={{ width: "400px", mx: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end" sx={{ marginTop: 2 }}>
                <ManageSearchIcon />
              </InputAdornment>
            ),
          }}
          variant="filled"
        />
      </Box>

      <Box sx={{ height: "100%", width: "100%", marginTop: 4 }}>
        {loading ? (
          <Typography>Loading data.</Typography>
        ) : (
          <DataTables
            perPage={perPage}
            total={totalPages}
            pageVisited={pageVisited}
            data={rows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        )}
      </Box>

      <AppModal
        status={
          selectedRows?.[0]?.appStatus ? selectedRows[0].appStatus : "pending"
        }
      />
      <AppModalDelete
        user={user}
        reqDelete={reqDelete}
        loading={loading}
        deletedId={selectedRows}
      />
    </AuthDashboard>
  );
}
