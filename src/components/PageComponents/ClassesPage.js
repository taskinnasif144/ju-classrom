"use client";

import { getID } from "@/Helpers/getLocalDatas";
import ClassRoom from "@/components/general/ClassRoom";
import queryAllData from "@/firebase/firestore/queryAllData";
import { Height } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ClassesPage = () => {
  const [classrooms, setClassrooms] = useState([]);

  const router = useRouter();

  const handleClassroomRouting = (clsID) => {
    router.push(`/dashboard/classrooms/${clsID}`);
  };

  useEffect(() => {
    const getClassRooms = async () => {
      const myID = getID();
      const res = await queryAllData("classes", "facultyID", myID);

      if (!res) {
        toast.error("No Classrooms have been created yet");
      } else {
        setClassrooms(res);
      }
    };
    getClassRooms();
  }, []);
  return (
    <div className="w-full p-12">
      {classrooms.map((cls) => (
        <div
          key={cls.id}
          onClick={() => {
            handleClassroomRouting(cls.id);
          }}
        >
          <ClassRoom
            title={cls.subject}
            dept={cls.department}
            faculty={cls.faculty}
            room={cls.roomNo}
            section={cls.section}
            facultyID={cls.facultyID}
          />
        </div>
      ))}

      <Toaster />
    </div>
  );
};

export default ClassesPage;
