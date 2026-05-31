import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "./auth.types";
import { isHydrateAction } from "../../@redux/utils";

const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action): any {
    if (!isHydrateAction(action)) {
      return;
    }

    if (action.key === "key used with redux-persist") {
      return action.payload;
    }

    // Здесь супер важен "?.", т.к. при пустом localStorage
    // упадет все приложение
    return action.payload?.[authApi.reducerPath];
  },
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (body: User) => ({
        url: "api/v1/login",
        method: "POST",
        body,
      }),
    }),
    postSignup: builder.mutation({
      query: (body: User) => ({
        url: "api/v1/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

const { usePostLoginMutation, usePostSignupMutation } = authApi;

export { authApi, usePostLoginMutation, usePostSignupMutation };
