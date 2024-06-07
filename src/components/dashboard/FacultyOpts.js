import React from "react";
import AddIcon from "@mui/icons-material/Add";

const FacultyOpts = ({ label, func }) => {
  return (
    <div onClick={func}>
      <div className="select-none p-6 sm:p-12 my-6 sm:my-10 w-full flex flex-col items-center shadow-3xl hover:shadow-2xl hover:scale-105 transition-all duration-200">
        <div className="text-5xl sm:text-9xl p-6 sm:p-12 text-white bg-[#D4D4D4]">
          <AddIcon fontSize="inherit" />
        </div>
        <h3 className="text-2xl sm:text-4xl mt-2 sm:mt-5">{label}</h3>
      </div>
    </div>
  );
};

export default FacultyOpts;
