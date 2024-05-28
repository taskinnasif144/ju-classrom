"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboard: true,
  createUser: false,
  editUser: false,
};

const navSlice = createSlice({
  name: "Navbar",
  initialState,
  reducers: {
    activeDash: (state) => {
      state.dashboard = true;
      state.createUser = false;
      state.editUser = false;
    },
    activeCreateUser: (state) => {
      state.dashboard = false;
      state.createUser = true;
      state.editUser = false;
    },
    activeEditUser: (state) => {
      state.dashboard = false;
      state.createUser = false;
      state.editUser = true;
    },
  },
});

export const { activeDash, activeCreateUser, activeEditUser } =
  navSlice.actions;

export default navSlice.reducer;
