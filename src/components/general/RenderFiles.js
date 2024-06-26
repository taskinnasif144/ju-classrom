import React from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Link from "next/link";
const RenderFiles = ({ name, link }) => {
  return (
    <Link href={link}>
      <div className="shadow-3xl flex items-center p-2 px-3 sm:px-5 rounded-2xl cursor-pointer bg-[#FAF1E2]">
        <div className="text-lg xs:text-3xl">
          <FileCopyIcon />
        </div>
        <h4 className="text-sm xs:text-lg ml-3">{name}</h4>
      </div>
    </Link>
  );
};

export default RenderFiles;
