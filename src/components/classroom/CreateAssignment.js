"use client";

import React, { useState } from "react";
import FacultyOpts from "../dashboard/FacultyOpts";
import AddIcon from "@mui/icons-material/Add";
import uploadMultipleFilesToFirebase from "@/firebase/firestore/UploadMultiFIles";
import addData from "@/firebase/firestore/addData";
import toast, { Toaster } from "react-hot-toast";
import { getDP, getID, getName } from "@/Helpers/getLocalDatas";

const CreateAssignment = ({ classID, clsworks, isExam = false }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [baseMark, setBaseMark] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const renderSelectedFiles = () => {
    return selectedFiles.map((file) => (
      <span key={file.name} className="mr-2 badge bg-primary text-black">
        {file.name}
      </span>
    ));
  };

  const handleClick = () => {
    document.getElementById("file-selector").click();
  };

  const handlePost = async () => {
    if (title != "" || description != "") {
      var files = await uploadMultipleFilesToFirebase(selectedFiles);
      const facultyName = getName();
      const facultyDp = getDP();
      const facultyID = getID();
      const data = {
        title,
        description,
        facultyName,
        facultyDp,
        facultyID,
        files,
        classID,
        baseMark,
        timestamp: Date.now(),
      };
      var res;
      if (isExam) {
        res = await addData("exams", data);
      } else {
        res = await addData("classworks", data);
      }

      if (res.result) {
        toast.success("Post Craeted");
        clsworks(data);
        setSelectedFiles([]);
        setDescription("");
        setTitle("");
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Please Write, and try again");
    }
  };

  return (
    <div>
      <div>
        <div className="shadow-3xl p-8 flex ">
          {!isExam && (
            <div className="mr-4">
              <div className="text-4xl p-4 max-w-min max-h-min text-white bg-[#D4D4D4]">
                <AddIcon fontSize="inherit" />
              </div>
            </div>
          )}
          <div className="flex flex-col w-full">
            {isExam && (
              <input
                className="my-2 mt-0 w-full p-4 rounded-lg outline-none"
                placeholder="Base Mark"
                type="number"
                value={baseMark}
                onChange={(e) => setBaseMark(e.target.value)}
                min="0"
                max={"100"}
              />
            )}
            <input
              className="my-2 mt-0 w-full p-4 rounded-lg outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="my-2 resize-none w-full h-[150px] p-4 rounded-lg outline-none"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-col space-y-2">
              <label htmlFor="file-selector" className="font-bold">
                Select Files (Multiple Selection)
              </label>
              <button
                id="select-button"
                className="px-4 py-2 rounded-md bg-primary text-black hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-3xl"
                onClick={handleClick}
              >
                Browse files
              </button>
              <input
                id="file-selector"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                className="hidden" // Hide the default file input
                onChange={handleFileChange}
              />
              <div className="flex items-center">
                {selectedFiles.length > 0 && (
                  <span className="text-gray-500 mr-2">Selected Files:</span>
                )}
                {renderSelectedFiles()}
              </div>
            </div>
            <button
              className="my-2 w-full bg-[#123C3E] text-white p-3 rounded-lg"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateAssignment;
