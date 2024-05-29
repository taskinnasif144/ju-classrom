"use client";
import React, { useEffect, useState } from "react";
import ClassRoomHeader from "./ClassRoomHeader";
import CreateAssignment from "./CreateAssignment";
import ClassWorkView from "../general/ClassWorkView";
import queryAllData from "@/firebase/firestore/queryAllData";
import { getID } from "@/Helpers/getLocalDatas";

const InsideClassRoom = ({ classID }) => {
  const [classWorks, setClassWorks] = useState([]);
  const [classInfo, setClassInfo] = useState({});

  const addNewWork = (newItem) => {
    setClassWorks([...classWorks, newItem]);
  };

  useEffect(() => {
    const getClassWorks = async () => {
      const facultyID = getID();
      const res = await queryAllData("classworks", "facultyID", facultyID);
      if (res) {
        var classes = [];
        for (var i = 0; i < res.length; i++) {
          if (res[i].classID == classID) {
            classes.push(res[i]);
          }
        }
        setClassWorks(classes);
      }
    };

    const getClassRoomInfo = async () => {
      const res = await getData("classes", params.id);

      if (res.result && !res.error) {
        setClassInfo(res.result);
      }
    };
    getClassWorks();
    getClassRoomInfo();
  });
  return (
    <div className="">
      <ClassRoomHeader
        subject={classInfo.subject}
        section={classInfo.section}
        classID={classID}
      />
      <CreateAssignment classID={classID} clsworks={addNewWork} />

      {classWorks.map((cls) => (
        <ClassWorkView key={cls.id} classInfo={cls} />
      ))}
    </div>
  );
};

export default InsideClassRoom;
