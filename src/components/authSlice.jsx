import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: localStorage.getItem("userName") || "",
  token: localStorage.getItem("token") || "",
  email: localStorage.getItem("email") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.name;
      state.token = action.payload.token;
      localStorage.setItem("userName", action.payload.name);
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.userName = "";
      state.token = "";
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
