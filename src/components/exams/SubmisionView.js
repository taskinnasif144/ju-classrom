import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import RenderFiles from "../general/RenderFiles";
import getData from "@/firebase/firestore/getData";
import setData from "@/firebase/firestore/setData";
import toast, { Toaster } from "react-hot-toast";

const SubmisionView = ({ submision }) => {
  const [user, setUser] = useState({});
  const [mark, setMark] = useState(null);

  const handleMark = async () => {
    if (mark) {
      const id = submision.examID + submision.userID;
      const data = {
        obtainedMark: mark,
      };
      const res = await setData("submits", id, data);
      if (res.result && !res.error) {
        toast.success("Score Updated");
      } else {
        toast.error("Check your connection, score update failed");
      }
    } else {
      toast.error("Please enter a score");
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await getData("users", submision.userID);
      if (!res.error && res.result) {
        setUser(res.result);
      }
    };

    const getStudentMark = async () => {
      const id = submision.examID + submision.userID;
      const res = await getData("submits", id);
      if (!res.error && res.result) {
        setMark(res.result.obtainedMark);
      }
    };

    getStudentMark();
    getUserDetails();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex justify-between px-8 my-3 bg-[#123C3E] items-center py-3 rounded-2xl">
      <div className="flex items-center">
        <Avatar sx={{ height: 50, width: 50 }} src={user.dp} />
        <div className="ml-4 ">
          <h3 className="text-xl font-semibold text-white">{user.name}</h3>
          <h5 className="text-sm text-gray-400">{user.ID}</h5>
          <h5 className="text-sm text-gray-400">
            department of {user.department}
          </h5>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <input
          type="number"
          className="outline-none w-[60px] h-[35px] p-1 appearance-none text-center"
          max="100"
          min="0"
          inputMode="numeric"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
        />
        <button className="bg-[#FAF1E2] p-2 py-1 h-[35px]" onClick={handleMark}>
          Save
        </button>
      </div>
      <RenderFiles link={submision.file.link} name={submision.file.name} />
      <Toaster />
    </div>
  );
};

export default SubmisionView;
