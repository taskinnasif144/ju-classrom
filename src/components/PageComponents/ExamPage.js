"use client";
import React, { useEffect, useState } from "react";
import CreateAssignment from "../classroom/CreateAssignment";
import ExamItem from "../exams/ExamItem";
import ClassWorkView from "../general/ClassWorkView";
import queryAllData from "@/firebase/firestore/queryAllData";
import { facultyAccess } from "@/Helpers/userAccess";
import { getDesignation } from "@/Helpers/getLocalDatas";
import toast, { Toaster } from "react-hot-toast";

const ExamPage = ({ classID }) => {
  const [exam, setExams] = useState([]);
  const [designation, setDesignation] = useState("");

  const addExam = (xm) => {
    setExams([...exam, xm]);
  };
  useEffect(() => {
    setDesignation(getDesignation());
    const getExams = async () => {
      const res = await queryAllData("exams", "classID", classID);
      if (res) {
        setExams(res);
      } else {
        toast.error("no exams found");
      }
    };

    getExams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full p-12">
      {facultyAccess(designation) && (
        <CreateAssignment isExam={true} classID={classID} clsworks={addExam} />
      )}

      <div className="my-6">
        <h2 className="text-3xl">Exams</h2>
        {exam.length > 0 ? (
          exam.map((ex) => {
            return <ClassWorkView key={ex.id} examInfo={ex} isExam={true} />;
          })
        ) : (
          <></>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default ExamPage;
