import { createSlice } from "@reduxjs/toolkit";
import { exodusApiSlice } from "./api.slice";

const initialState = {
  data: [],
  singleAppData: {
    userInfo: [],
    applications: [],
    requirements: {},
  },
  profile: {
    applications: [],
    userInfo: {},
    requirements: {
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
    },
    users: {},
  },
  paymentData: null,
  selectIdToPay: null,
};

export const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    updateApp: (state, action) => ({
      ...state,
      data: action.payload,
    }),
    updateSingleApp: (state, action) => ({
      ...state.singleAppData,
      singleAppData: action.payload,
    }),
    updateProfile: (state, action) => {
      state.profile.applications = action.payload.applications;
      state.profile.userInfo = action.payload.userInfo;
      state.profile.requirements = {
        ...state.profile.requirements,
        ...action.payload.requirements,
      };
      state.profile.users = action.payload.users;
      return state;
    },
    updatePaymentData: (state, action) => ({
      ...state,
      paymentData: action.payload,
    }),
    updateSelectedIdToPay: (state, action) => ({
      ...state,
      selectIdToPay: action.payload,
    }),
  },
});

export const {
  updateSelectedIdToPay,
  updateApp,
  updateSingleApp,
  updateProfile,
  updatePaymentData,
} = applicationSlice.actions;
export default applicationSlice.reducer;

export const applicationApiSlice = exodusApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    GetApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/all/data`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    GetSingleApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/singleapplication?appId=${args.appId}&email=${args.email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    PutSingleApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/singleapplication?appId=${args.appId}&email=${args.email}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
      }),
    }),
    DeleteSingleApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/singleapplication`,
        method: "POST",
        body: args,
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    GetUserApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application?email=${args.email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    PostApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: args,
      }),
    }),
    PutApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: args,
      }),
    }),
    DeleteApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/update/app?appId=${args.appId}&newstatus=${args.newstatus}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: args,
      }),
    }),
    PostPaymentApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/applicationpayment`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
        body: args,
      }),
    }),
    GetOneApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/getsingleapp?email=${args.email}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    ProcessPaymentApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/executepayment?appId=${args.appId}&payerId=${args.payerId}&paymentId=${args.paymentId}&total=${args.total}&email=${args.email}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    GetAppIdApplication: builder.mutation({
      query: (args) => ({
        url: `/api/application/appIdSingleApp?appId=${args.appId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetApplicationMutation,
  useGetSingleApplicationMutation,
  useDeleteSingleApplicationMutation,
  usePutSingleApplicationMutation,
  useGetUserApplicationMutation,
  usePostApplicationMutation,
  usePutApplicationMutation,
  useDeleteApplicationMutation,
  usePostPaymentApplicationMutation,
  useGetOneApplicationMutation,
  useProcessPaymentApplicationMutation,
  useGetAppIdApplicationMutation,
} = applicationApiSlice;
