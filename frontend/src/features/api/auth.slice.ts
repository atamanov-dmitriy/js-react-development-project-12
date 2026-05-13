import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./auth.types";

const initialState: AuthState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<AuthState>) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
    signOut(state) {
      state.token = null;
      state.username = null;
    },
  },
});

const { actions: authActions, reducer: authReducer } = authSlice;
export { authActions, authReducer };
