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
  }, []);
  return (
    <div className="w-full bg-[#123C3E] text-[#FAF1E2] p-12 my-12 flex justify-between items-center">
      <div>
        <h1 className="text-8xl">{title}</h1>
        <h4 className="text-xl ml-2">Section: {section}</h4>
        <h4 className="text-xl ml-2">Department: {dept}</h4>
        <h4 className="text-xl ml-2">Room No: {room}</h4>
        <h2 className="text-3xl mt-12 ml-2">{faculty}</h2>
      </div>

      <Avatar sx={{ width: 220, height: 220 }} src={facultyDp} />
    </div>
  );
};

export default ClassRoom;
