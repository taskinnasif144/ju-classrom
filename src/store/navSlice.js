import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  value: {
    isAuthDialogOpen: false,
  },
};

const authDialogSlice = createSlice({
  name: "authDialog",
  initialState,
  reducers: {
    toggleAuthDialog: (state) => {
      state.value.isAuthDialogOpen = !state.value.isAuthDialogOpen;
    },
  },
});

export const { toggleAuthDialog } = authDialogSlice.actions;
export default authDialogSlice.reducer;
