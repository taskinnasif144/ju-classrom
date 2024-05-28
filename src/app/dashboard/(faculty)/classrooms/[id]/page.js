"use client";
import ClassRoomHeader from "@/components/classroom/ClassRoomHeader";
import InsideClassRoom from "@/components/classroom/InsideClassRoom";
import getData from "@/firebase/firestore/getData";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [classInfo, setClassInfo] = useState({});

  useEffect(() => {
    const getClassRoomInfo = async () => {
      const res = await getData("classes", params.id);

      if (res.result && !res.error) {
        setClassInfo(res.result);
      }
    };

    getClassRoomInfo();
  }, []);

  return (
    <div className="w-full p-12">
      <InsideClassRoom classInfo={classInfo} classID={params.id} />
    </div>
  );
};

export default page;
