import { Avatar } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import StudentListItem from "../general/StudentListItem";

const ClassStudentList = ({ allStd, classId, rmStd, isAdd }) => {
  return (
    <div className="h-[500px] shadow-3xl absolute right-0 top-full bg-[#FAF1E2] text-black overflow-hidden overflow-y-auto">
      {allStd.length == 0 ? (
        <div className="text-xl p-8"> No Students available</div>
      ) : (
        allStd.map((std) => (
          <StudentListItem
            std={std}
            key={std}
            classID={classId}
            rmSTD={rmStd}
            isAdd={isAdd}
          />
        ))
      )}
    </div>
  );
};

export default ClassStudentList;
