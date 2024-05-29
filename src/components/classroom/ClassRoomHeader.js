import React, { act, useState } from "react";
import ClassStudentList from "./ClassStudentList";
import queryAllData from "@/firebase/firestore/queryAllData";
import toast, { Toaster } from "react-hot-toast";
import getData from "@/firebase/firestore/getData";

const ClassRoomHeader = ({ subject, section, classID }) => {
  const [allStd, setAllStd] = useState([]);
  const [activeList, setActiveList] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const removeStudent = (std) => {
    setAllStd(allStd.filter((s) => s != std));
  };

  const findStudentFromClass = async () => {
    setIsAdd(false);
    if (!activeList) {
      const res = await getData("classes", classID);
      console.log(res);
      if (res.result) {
        setAllStd(res.result.students);
        toast.success("Students Loaded");
      } else {
        toast.error("check your connection and try again later");
      }
    } else {
    }
    setActiveList(!activeList);
  };

  const findAllStudents = async () => {
    setIsAdd(true);
    if (!activeList) {
      toast.success("Students are being Loaded");
      const res = await queryAllData("users", "designation", "Student");
      const res2 = await getData("classes", classID);
      if (res && res2) {
        var newArray;
        if (res2.result.students) {
          newArray = res.filter((r) => !res2.result.students.includes(r.id));
        } else {
          newArray = res;
        }
        setAllStd(newArray.map((obj) => obj.ID));
      } else {
        toast.error("check your connection and try again later");
      }
    } else {
    }
    setActiveList(!activeList);
  };

  return (
    <div>
      <div className="bg-[#123C3E] text-[#FAF1E2] pt-16 p-6 flex justify-between relative">
        <div>
          <h2 className="text-6xl"> {subject}</h2>
          <h3 className="text-2xl"> {section}</h3>
        </div>
        <div className="flex flex-col">
          <button
            className="hover:bg-[#FAF1E2] hover:text-black px-3 py-2 rounded-2xl transition-all duration-200"
            onClick={findAllStudents}
          >
            Add Students
          </button>
          <button
            className="hover:bg-[#FAF1E2] hover:text-black px-3 py-2 rounded-2xl transition-all duration-200"
            onClick={findStudentFromClass}
          >
            Remove Students
          </button>
        </div>
        {activeList && (
          <ClassStudentList
            allStd={[...allStd]}
            classId={classID}
            rmStd={removeStudent}
            isAdd={isAdd}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ClassRoomHeader;
