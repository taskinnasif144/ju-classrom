import { getDesignation, getID } from "@/Helpers/getLocalDatas";
import { studentAccess } from "@/Helpers/userAccess";
import queryAllData from "@/firebase/firestore/queryAllData";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ClassRoom from "../general/ClassRoom";
import { useRouter } from "next/navigation";
import setData from "@/firebase/firestore/setData";
import { arrayUnion } from "firebase/firestore";

const StudentDash = () => {
  const [classID, setClassID] = useState("");
  const [classrooms, setClassrooms] = useState([]);

  const router = useRouter();

  const handleClassroomRouting = (clsID) => {
    router.push(`/dashboard/classrooms/${clsID}`);
  };

  const handleJoinCLass = async () => {
    const data = {
      students: arrayUnion(getID()),
    };
    const res = await setData("classes", classID, data);
    console.log(res);
    if (res.result && !res.error) {
      toast.success("Classroom joined");
      router.push(`/dashboard/classrooms/${classID}`);
    }
  };

  useEffect(() => {
    const getClassRooms = async () => {
      const designation = getDesignation();
      const myID = getID();
      var res;
      if (studentAccess(designation)) {
        res = await queryAllData("classes", "students", myID, true);
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
    <div className="w-full flex flex-col p-8">
      <div className="text-center flex flex-col ">
        <input
          className="text-xl p-3 shadow-2xl rounded-lg outline-none"
          value={classID}
          onChange={(e) => setClassID(e.target.value)}
          placeholder="Enter ClassID"
        />
        <button
          className="bg-[#123C3E] text-white cursor-pointer p-3 rounded-xl mt-4"
          onClick={handleJoinCLass}
        >
          Join Class
        </button>
      </div>
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

export default StudentDash;
