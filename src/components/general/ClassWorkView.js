import { Avatar } from "@mui/material";
import React from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClassWorkComment from "./ClassWorkComment";
import RenderFiles from "./RenderFiles";

const ClassWorkView = ({ classInfo }) => {
  return (
    <div className="my-8 shadow-3xl p-8 pb-2">
      <div className="">
        <div className="flex items-center">
          <Avatar />
          <h3 className="text-xl font-normal ml-3">{classInfo.facultyName}</h3>
        </div>
        <div>
          <h4 className="text-xl font-semibold my-4">{classInfo.title}</h4>
          <p className="text-md">{classInfo.description}</p>
        </div>
        <div className="flex flex-wrap my-4">
          {classInfo.files.map((f) => (
            <RenderFiles key={f.link} name={f.name} link={f.link} />
          ))}
        </div>
      </div>

      <ClassWorkComment />
    </div>
  );
};

export default ClassWorkView;
