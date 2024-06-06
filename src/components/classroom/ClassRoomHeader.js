"use client";

import React, { useEffect, useState } from "react";
import ClassStudentList from "./ClassStudentList";
import queryAllData from "@/firebase/firestore/queryAllData";
import toast, { Toaster } from "react-hot-toast";
import getData from "@/firebase/firestore/getData";
import Link from "next/link";
import { facultyAccess, studentAccess } from "@/Helpers/userAccess";
import { getDesignation, getID } from "@/Helpers/getLocalDatas";
import setData from "@/firebase/firestore/setData";
import { useRouter } from "next/navigation";
import { arrayRemove } from "firebase/firestore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ClassRoomHeader = ({ subject, section, classID }) => {
  const [allStd, setAllStd] = useState([]);
  const [activeList, setActiveList] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const router = useRouter();

  const removeStudent = (std) => {
    setAllStd(allStd.filter((s) => s != std));
  };

  const findStudentFromClass = async () => {
    setIsAdd(false);
    if (!activeList) {
      const res = await getData("classes", classID);

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

  const handleLeaveClass = async () => {
    const data = {
      students: arrayRemove(getID()),
    };
    const res = await setData("classes", classID, data);
    if (res.result) {
      toast.success("Class Left");
      router.push("/dashboard");
    } else {
      toast.error("check your connection and try again later");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(classID);
    toast.success("Copied to clipboard");
  };
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="bg-[#123C3E] text-[#FAF1E2] pt-16 p-6 flex justify-between relative">
        <div>
          <h2 className="text-6xl"> {subject}</h2>
          <h3 className="text-2xl"> {section}</h3>
          {facultyAccess(getDesignation()) && (
            <div className="flex items-center justify-center">
              <span className="mr-2">classID: {classID}</span>
              <button onClick={handleCopy}>
                <ContentCopyIcon />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <Link
            className="text-center px-3 py-2 hover:bg-[#FAF1E2] hover:text-black rounded-2xl transition-all duration-200"
            href={{
              pathname: `/dashboard/classrooms/${classID}/exams`,
              query: { classID: classID },
            }}
          >
            Exam
          </Link>
          {facultyAccess(getDesignation()) && (
            <button
              className="hover:bg-[#FAF1E2] hover:text-black px-3 py-2 rounded-2xl transition-all duration-200"
              onClick={findAllStudents}
            >
              Add Students
            </button>
          )}
          {facultyAccess(getDesignation()) && (
            <button
              className="hover:bg-[#FAF1E2] hover:text-black px-3 py-2 rounded-2xl transition-all duration-200"
              onClick={findStudentFromClass}
            >
              Remove Students
            </button>
          )}
          {studentAccess(getDesignation()) && (
            <button
              className="hover:bg-[#FAF1E2] hover:text-black px-3 py-2 rounded-2xl transition-all duration-200"
              onClick={handleLeaveClass}
            >
              Leave Class
            </button>
          )}
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
