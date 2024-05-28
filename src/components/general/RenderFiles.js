import React from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Link from "next/link";
const RenderFiles = ({ name, link }) => {
  return (
    <Link href={link}>
      <div className="shadow-3xl flex items-center p-5 rounded-2xl cursor-pointer">
        <div className="text-3xl">
          <FileCopyIcon />
        </div>
        <h4 className="text-lg ml-3">{name}</h4>
      </div>
    </Link>
  );
};

export default RenderFiles;
