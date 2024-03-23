import { createSlice } from "@reduxjs/toolkit";
import { exodusApiSlice } from "./api.slice";

const initialState = {
  token: null,
  allusers: [],
  email: null,
  avatar: null,
  name: null,
};

export const userSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    updateAuth: (state, action) => ({
      ...state,
      token: action.payload,
    }),
    updateUsers: (state, action) => ({
      ...state,
      allusers: action.payload,
    }),
  },
});

export const { updateAuth, updateUsers } = userSlice.actions;

export default userSlice.reducer;

export const userApiSlice = exodusApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    PostLoginUser: builder.mutation({
      query: (args) => ({
        url: "/api/users/adminlogin",
        method: "POST",
        body: args,
      }),
    }),
    GetAllUsers: builder.mutation({
      query: (args) => ({
        url: "/api/users/allusers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
    PostDeleteUsers: builder.mutation({
      query: (args) => ({
        url: "/api/users/allusers",
        method: "POST",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
        body: args,
      }),
    }),
    PutDeactivatedAccount: builder.mutation({
      query: (args) => ({
        url: `/api/users/allusers?appId=${args.appId}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }),
    }),
  }),
});

export const {
  usePostLoginUserMutation,
  useGetAllUsersMutation,
  usePostDeleteUsersMutation,
  usePutDeactivatedAccountMutation,
} = userApiSlice;
