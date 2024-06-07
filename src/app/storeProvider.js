"use client";

import { store } from "@/store/Store";
import { Provider } from "react-redux";

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
