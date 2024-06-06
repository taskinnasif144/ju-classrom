"use client";
import React, { useEffect, useState } from "react";
import ClassRoomHeader from "./ClassRoomHeader";
import CreateAssignment from "./CreateAssignment";
import ClassWorkView from "../general/ClassWorkView";
import queryAllData from "@/firebase/firestore/queryAllData";
import { getDesignation, getID } from "@/Helpers/getLocalDatas";
import getData from "@/firebase/firestore/getData";
import { facultyAccess, facultyOrStudentAccess } from "@/Helpers/userAccess";

const InsideClassRoom = ({ classID }) => {
  const [classWorks, setClassWorks] = useState([]);
  const [classInfo, setClassInfo] = useState({});

  const addNewWork = (newItem) => {
    setClassWorks([...classWorks, newItem]);
  };

  useEffect(() => {
    const getClassWorks = async () => {
      const res = await queryAllData("classworks", "classID", classID);
      if (res) {
        var classes = [];
        setClassWorks(res);
      }
    };

    const getClassRoomInfo = async () => {
      const res = await getData("classes", classID);

      if (res.result && !res.error) {
        setClassInfo(res.result);
      }
    };
    getClassWorks();
    getClassRoomInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <ClassRoomHeader
        subject={classInfo.subject}
        section={classInfo.section}
        classID={classID}
      />
      {facultyOrStudentAccess(getDesignation()) && (
        <CreateAssignment classID={classID} clsworks={addNewWork} />
      )}

      {facultyOrStudentAccess(getDesignation()) &&
        classWorks.map((cls) => <ClassWorkView key={cls.id} examInfo={cls} />)}
    </div>
  );
};

export default InsideClassRoom;
