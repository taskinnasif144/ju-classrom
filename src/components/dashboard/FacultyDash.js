import React, { useEffect, useState } from "react";
import FacultyOpts from "@/components/dashboard/FacultyOpts";
import CreateClass from "../FacultyOps/CreateClass";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getID } from "@/Helpers/getLocalDatas";
import ClassRoom from "../general/ClassRoom";
import queryAllData from "@/firebase/firestore/queryAllData";

const FacultyDash = () => {
  const [createCLSstate, setCreateCLSstate] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const activeCreateClassState = () => {
    setCreateCLSstate(!createCLSstate);
  };

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
    <div className="m-12 flex flex-wrap">
      <FacultyOpts label={"Create Class"} func={activeCreateClassState} />

      {createCLSstate && (
        <CreateClass func={activeCreateClassState} toast={toast} />
      )}

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
      </div>
      <Toaster />
    </div>
  );
};

export default FacultyDash;
