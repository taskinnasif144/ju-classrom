"use client";
import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import {
  getDP,
  useGetDepartment,
  getDesignation,
  getID,
  getName,
} from "@/Helpers/getLocalDatas";
import getData from "@/firebase/firestore/getData";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

const SiderBarUpper = ({ state, toggle }) => {
  const [dp, setDp] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    setDp(getDP());
    setName(getName());
    setDesignation(getDesignation());
  }, []);
  return (
    <div className="relative w-full">
      <div className="text-white text-4xl absolute right-0" onClick={toggle}>
        {state ? (
          <FirstPageIcon fontSize="inherit" />
        ) : (
          <LastPageIcon fontSize="inherit" />
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          state ? "w-full" : "w-0"
        }`}
      >
        <div className="mt-4 xs:mt-8 mb-5 rounded-lg flex items-center justify-center">
          <Avatar src={dp} sx={{ width: 160, height: 160 }} />
        </div>
        <div className="text-white text-center w-full">
          <h2 className="text-xl  xs:text-2xl sm:text-3xl ">{name}</h2>
          <h4 className="text-base xs:text-lg my-3">{designation}</h4>
        </div>
      </div>
    </div>
  );
};

export default SiderBarUpper;
