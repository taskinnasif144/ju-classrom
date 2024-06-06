import ExamPage from "@/components/PageComponents/ExamPage";
import React from "react";

const page = ({ searchParams }) => {
  return (
    <div className="w-full">
      <ExamPage classID={searchParams.classID} />
    </div>
  );
};

export default page;
