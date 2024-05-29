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

const SiderBarUpper = () => {
  const [dp, setDp] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    setDp(getDP());
    setName(getName());
    setDesignation(getDesignation());
  }, []);
  return (
    <div className="">
      <div className="mt-16 mb-10 h-[250px] w-[250px] rounded-lg flex items-center justify-center">
        <Avatar src={dp} sx={{ width: 220, height: 220 }} />
      </div>
      <div className="text-white text-center w-full">
        <h2 className="text-3xl ">{name}</h2>
        <h4 className="text-lg my-3">{designation}</h4>
      </div>
    </div>
  );
};

export default SiderBarUpper;
