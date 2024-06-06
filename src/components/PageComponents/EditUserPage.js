"use client";
import getAllData from "@/firebase/firestore/getAllData";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ClassRoom from "../general/ClassRoom";
import { useRouter } from "next/navigation";

const EditUserPage = () => {
  const [classroom, setClassroom] = useState([]);
  const router = useRouter();

  const handleNavigation = (cls) => {
    router.push(`/dashboard/classrooms/${cls}`);
  };

  useEffect(() => {
    const getAllClassrooms = async () => {
      const res = await getAllData("classes");
      if (res) {
        if (res.length == 0) {
          toast.error("No classroom found");
        }

        setClassroom(res);
      } else {
        toast.error("No classroom found");
      }
    };
    getAllClassrooms();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="w-full p-6">
      <div>
        {classroom.map((cls) => {
          return (
            <div
              key={cls.id}
              onClick={() => {
                handleNavigation(cls.id);
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
          );
        })}
      </div>
      <Toaster />
    </div>
  );
};

export default EditUserPage;
