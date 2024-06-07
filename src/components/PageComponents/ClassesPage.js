"use client";

import { getDesignation, getID } from "@/Helpers/getLocalDatas";
import { studentAccess } from "@/Helpers/userAccess";
import ClassRoom from "@/components/general/ClassRoom";
import queryAllData from "@/firebase/firestore/queryAllData";
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
      const designation = getDesignation();
      const myID = getID();
      var res;
      if (studentAccess(designation)) {
        res = await queryAllData("classes", "students", myID, true);
      } else {
        res = await queryAllData("classes", "facultyID", myID);
      }

      if (!res) {
        toast.error("No Classrooms Found");
      } else {
        setClassrooms(res);
      }
    };
    getClassRooms();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="w-full p-6">
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
