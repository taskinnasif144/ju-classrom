import { configureStore } from "@reduxjs/toolkit";
import authDialogReducer from "./navSlice";

export const store = configureStore({
  reducer: {
    authDialog: authDialogReducer,
  },
});
