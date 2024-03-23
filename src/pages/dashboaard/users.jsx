import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AuthDashboard from "../../common/layouts/AuthDashboard";
import {
  Button,
  ButtonGroup,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { updateUsers, useGetAllUsersMutation } from "../../store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  hideDeleteModal,
  showDeleteModal,
  showModal,
} from "../../store/app.slice";
import UserModal from "../../common/components/popup/userModal";
import {
  usePostDeleteUsersMutation,
  usePutDeactivatedAccountMutation,
} from "../../store/auth.slice";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [input, setInput] = useState("");
  const { user } = useSelector((state) => ({
    user: state.user,
  }));
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [reqDelete, resDelete] = usePostDeleteUsersMutation();
  const [reqDeactivate, resDeactivate] = usePutDeactivatedAccountMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reqGetUsers, { isSuccess, data }] = useGetAllUsersMutation();

  const [selectedRows, setSelectedRows] = useState([]);
  const storageUser = JSON.parse(localStorage.getItem("user"));

  console.log("selectedRows", selectedRows);

  useEffect(() => {
    if (storageUser && storageUser.role === "guard") {
      navigate("/checkId");
    }
  }, [navigate, storageUser]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUsers(data.users));
    }
  }, [dispatch, isSuccess, data]);

  useEffect(() => {
    reqGetUsers({ token: JSON.parse(localStorage.getItem("accessToken")) });
  }, [reqGetUsers]);

  const Activated = {
    false: "No",
    true: "Yes",
  };

  const rows = user?.allusers
    ?.map(({ _id, email, mobile, verified }) => ({
      id: _id,
      email,
      mobile,
      verified: Activated[verified],
    }))
    ?.filter(function (items) {
      if (input !== "") return items.email.includes(input.toLowerCase());
      return items;
    })
    .reverse();

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
      reqGetUsers({ token: JSON.parse(localStorage.getItem("accessToken")) });
      setLoading(false);
    }
    if (resDelete.isLoading) {
      setLoading(true);
    }
    if (resDeactivate.isSuccess) {
      dispatch(
        hideDeleteModal({
          title: "",
          content: null,
          selectedId: "",
          selectedEmail: "",
        })
      );
      reqGetUsers({ token: JSON.parse(localStorage.getItem("accessToken")) });
      setLoading(false);
    }
    if (resDeactivate.isLoading) {
      setLoading(true);
    }
  }, [resDelete, dispatch, reqGetUsers, resDeactivate]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "email",
      headerName: "Email Address",
      width: 300,
    },
    {
      field: "mobile",
      headerName: "Application Type",
      width: 150,
    },
    {
      field: "verified",
      headerName: "Activated",
      width: 150,
    },
  ];

  const handleSubmit = () => {
    if (type === "Delete") {
      reqDelete({
        deletedId: [...new Set(selectedRows.map((x) => x.id))],
        token: JSON.parse(window.localStorage.getItem("accessToken")),
      });
    }
    if (type === "Deactivate") {
      reqDeactivate({
        appId: selectedRows[0].id,
        token: JSON.parse(window.localStorage.getItem("accessToken")),
      });
    }
  };

  const handleShowModal = (params) => {
    if (params === "Deactivate") {
      if (selectedRows.length > 1)
        return dispatch(
          showModal({
            message: "please select only one application",
            status: "error",
          })
        );

      setType(params);
      dispatch(
        showDeleteModal({
          title: "",
          content: `Are you sure you want to deactivate ${
            selectedRows.length
          } ${selectedRows.length > 1 ? "users" : "user"}`,
          selectedId: "",
          selectedEmail: "",
        })
      );
    }
    if (params === "Delete") {
      setType(params);
      dispatch(
        showDeleteModal({
          title: "",
          content: `Are you sure you want to delete ${selectedRows.length} ${
            selectedRows.length > 1 ? "items" : "item"
          }`,
          selectedId: "",
          selectedEmail: "",
        })
      );
    }
  };

  return (
    <AuthDashboard>
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
            disabled={selectedRows.length <= 0 ? true : false}
            onClick={() => handleShowModal("Deactivate")}
          >
            <CheckBoxIcon />
            DEACTIVED
          </Button>
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

      <Box sx={{ height: 400, width: "100%", marginTop: 4 }}>
        {user?.allusers?.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            onRowSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = rows.filter((row) =>
                selectedIDs.has(row.id)
              );

              setSelectedRows(selectedRows);
            }}
          />
        ) : (
          <Typography>Loading data..</Typography>
        )}
      </Box>

      <UserModal
        mobile={false}
        handleSubmit={handleSubmit}
        loading={loading}
        type={type}
      />
    </AuthDashboard>
  );
}
