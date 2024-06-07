import {
  getDepartment,
  getID,
  getName,
  useGetDepartment,
} from "@/Helpers/getLocalDatas";
import addData from "@/firebase/firestore/addData";
import uploadFileToFirebase from "@/firebase/firestore/uploadFile";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import RenderFiles from "./RenderFiles";
import coumpoundQuerayData from "@/firebase/firestore/compoundQueryData";
import setData from "@/firebase/firestore/setData";

const ExamSubmission = ({ examID }) => {
  const [file, setFile] = useState(null);
  const [myAns, setMyAns] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleClear = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    const userID = getID();
    if (file) {
      const url = await uploadFileToFirebase(file);
      var data;
      if (url) {
        data = {
          userID,
          examID,
          timestamp: Date.now(),
          file: {
            name: file.name,
            link: url,
          },
        };
        const id = examID + userID;
        const res = await setData("submits", id, data);
        if (res.result && !res.error) {
          handleClear();
          setMyAns(data);
          toast.success("Submitted");
        }
      }
    } else {
      toast.error("Select a File First");
    }
  };

  useEffect(() => {
    const getMyFile = async () => {
      const userID = getID();
      const res = await coumpoundQuerayData(
        "submits",
        "examID",
        examID,
        "userID",
        userID
      );
      if (res) {
        setMyAns(res[0]);
      }
    };

    getMyFile();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="text-center p-4">
      <div className="my-3">
        {myAns && <RenderFiles name={myAns.file.name} link={myAns.file.link} />}
      </div>
      <input
        className="hidden"
        type="file"
        id="file_select"
        onChange={handleFileChange}
      />
      <label
        className="w-full text-base sm:text-xl shadow-3xl block p-1 xs:p-2 cursor-pointer"
        htmlFor="file_select"
      >
        Browse Answer
      </label>
      {file && (
        <div className="flex justify-between my-3">
          <span>{file.name}</span>
          <button onClick={handleClear}> X</button>
        </div>
      )}
      <button
        className="text-base sm:text-xl mt-4 bg-[#123C3E] w-full text-white p-1 xs:p-2 rounded-3xl cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <Toaster />
    </div>
  );
};

export default ExamSubmission;
