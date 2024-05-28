"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

const StoreProvider = ({ children }) => {
  const storeRef = useRef();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!storeRef.current) {
      storeRef.current = makeStore();
    }
    setHydrated(true);
  }, []);

  return hydrated ? (
    <Provider store={storeRef.current}>{children} </Provider>
  ) : null;
};

export default StoreProvider;
