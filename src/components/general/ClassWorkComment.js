import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { getDP } from "@/Helpers/getLocalDatas";

const ClassWorkComment = () => {
  const [dp, setDP] = useState("");

  useEffect(() => {
    setDP(getDP());
  }, []);
  return (
    <div className="mt-8 flex items-center">
      <Avatar className="mr-3" src={dp} sx={{ height: 35, width: 35 }} />
      <input
        className="w-full text-black bg-transparent p-0 xs:p-3 outline-none text-sm xs:text-base"
        placeholder="Add a Comment ..."
      />
      <button className="ml-3 hover:scale-110 transition-all duration-200 cursor-pointer">
        {" "}
        <SendIcon />
      </button>
    </div>
  );
};

export default ClassWorkComment;
