"use client";
import getDocumentByField from "@/firebase/firestore/queryData";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";

const ClassRoom = ({ title, section, dept, room, faculty, facultyID }) => {
  const [facultyDp, setFacultyDp] = useState("");

  useEffect(() => {
    const getFacultyDp = async () => {
      const res = await getDocumentByField("users", "ID", facultyID);
      if (res) {
        setFacultyDp(res.dp);
      }
    };

    getFacultyDp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full bg-[#123C3E] text-[#FAF1E2] text-center sm:text-start p-5 sm:p-12 my-6 sm:my-12 flex flex-col sm:flex-row  justify-center sm:justify-between items-center">
      <div className="mb-8 sm:mb-0">
        <h1 className="text-3xl sm:text-6xl">{title}</h1>
        <h4 className="text-sm sm:text-lg ml-2">Section: {section}</h4>
        <h4 className="text-sm sm:text-lg ml-2">Department: {dept}</h4>
        <h4 className="text-sm sm:text-lg ml-2">Room No: {room}</h4>
        <h2 className="text-xl sm:text-2xl mt-12 ml-2">{faculty}</h2>
      </div>

      <Avatar sx={{ width: 200, height: 200 }} src={facultyDp} />
    </div>
  );
};

export default ClassRoom;
