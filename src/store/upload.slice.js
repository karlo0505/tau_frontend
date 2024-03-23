import { createSlice } from "@reduxjs/toolkit";
import { exodusApiSlice } from "./api.slice";

const initialState = {
  dLicense: null,
  dLicenseExp: null,
  mpPermit: null,
  mpPermitExp: null,
  crRegister: null,
  crRegisterExp: null,
  orReciept: null,
  orRecieptExp: null,
  studentId: null,
  studentIdExp: null,
  employeeId: null,
  employeeIdExp: null,
  loading: false,
};

export const uploadFileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    uploadFiles: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    deleteFiles: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    showLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    updateRequirements: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { uploadFiles, deleteFiles, showLoading, updateRequirements } =
  uploadFileSlice.actions;
export default uploadFileSlice.reducer;

export const uploadApiSlice = exodusApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    PostRequirements: builder.mutation({
      query: (args) => ({
        url: "/api/requirements",
        method: "POST",
        body: args,
      }),
    }),
    GetRequirements: builder.mutation({
      query: (args) => ({
        url: `/api/requirements?email=${args.email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    DeleteRequirements: builder.mutation({
      query: (args) => ({
        url: `/api/requirements?email=${args.email}&requirements=${args.requirements}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
      }),
    }),
    PutRequirements: builder.mutation({
      query: (args) => ({
        url: `/api/requirements`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: args,
      }),
    }),
  }),
});

export const {
  usePostRequirementsMutation,
  useGetRequirementsMutation,
  useDeleteRequirementsMutation,
  usePutRequirementsMutation,
} = uploadApiSlice;

export const uploadImageApiSlice = exodusApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    PostUploadImages: builder.mutation({
      query: (args) => ({
        url: "/api/file/upload",
        method: "POST",
        body: args,
      }),
    }),
  }),
});

export const { usePostUploadImagesMutation } = uploadImageApiSlice;
