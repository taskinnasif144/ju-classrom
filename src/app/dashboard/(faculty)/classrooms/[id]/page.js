import ClassRoomHeader from "@/components/classroom/ClassRoomHeader";
import InsideClassRoom from "@/components/classroom/InsideClassRoom";
import getData from "@/firebase/firestore/getData";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="w-full p-12">
      <InsideClassRoom classID={params.id} />
    </div>
  );
};

export default page;
