import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exodusApiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URI}`,
    prepareHeaders: (headers) => {
      headers.set("x_app_key", `${process.env.REACT_APP_X_APP_KEY}`);
      // headers.set("Access-Control-Allow-Origin", "*");
      // headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      return headers;
    },
  }),
  tagTypes: ["Quotes"],
  endpoints: () => ({}),
});
