import { configureStore } from "@reduxjs/toolkit";
import NavSlice from "./reducers/NavSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      navbar: NavSlice,
    },
  });
};
