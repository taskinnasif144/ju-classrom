import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { doc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import setData from "@/firebase/firestore/setData";
import toast from "react-hot-toast";
import getData from "@/firebase/firestore/getData";

const StudentListItem = ({ std, classID, rmSTD, isAdd }) => {
  const [stdData, setStdData] = useState({});

  const handleAddStudentToClass = async () => {
    console.log(std);
    var data;
    if (isAdd) {
      data = {
        students: arrayUnion(std),
      };
    } else {
      data = {
        students: arrayRemove(std),
      };
    }
    const res = await setData("classes", classID, data);
    console.log(res);
    if (res.result) {
      toast.success("Student Added");
      rmSTD(std);
    } else {
      ("check your connection and try again later");
    }
  };

  useEffect(() => {
    const getStudentData = async () => {
      const res = await getData("users", std);
      if (res) {
        setStdData(res.result);
      }
    };

    getStudentData();
  }, [std]);

  return (
    <div
      className="flex items-center p-7 hover:shadow w-full cursor-pointer"
      onClick={handleAddStudentToClass}
    >
      <Avatar sx={{ height: 60, width: 60 }} src={stdData.dp} />

      <div className="ml-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{stdData.name}</h3>
        </div>
        <div className="mt-1 pt-1 border-t-2 border-black">
          <span>{stdData.ID}</span>
          <span>
            Batch: {stdData.batch}th Dept: {stdData.department}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentListItem;
