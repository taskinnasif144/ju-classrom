import React from "react";
import { Avatar } from "@mui/material";
import deleteData from "@/firebase/firestore/deleteData";
import toast, { Toaster } from "react-hot-toast";
import setData from "@/firebase/firestore/setData";

const UserBlock = ({ userData, rm, isStudent, add }) => {
  const removeUser = () => {
    const res = deleteData("users", userData.id);
    if (res) {
      toast.success("User Removed");
      rm(userData);
    } else {
      toast.error("User coudn't be deleted, try again");
    }
  };

  const changeUserType = async () => {
    const data = {
      designation: isStudent ? "Faculty" : "Student",
    };
    const res = await setData("users", userData.id, data);
    if (res.result) {
      rm(userData);
      toast.success("User type changed");
    } else {
      toast.error("Please try again later");
    }
  };

  return (
    <div className="shadow-3xl p-3 xs:p-4 my-4  rounded-2xl">
      <div className="flex items-center">
        <Avatar sx={{ width: 70, height: 70 }} src={userData.dp} />
        <div className="pl-3 sm:pl-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b-2 border-black pb-2">
            {userData.name}
          </h2>
          <div className="pt-2 flex flex-col text-sm sm:text-lg text-gray-600">
            <span>ID: {userData.ID}</span>
            <span>
              section: {userData.section} batch: {userData.batch} dept:{" "}
              {userData.department}
            </span>
          </div>
        </div>
      </div>
      <div className="text-base sm:text-xl flex justify-end text-gray-600">
        <button className="hover:text-black px-4" onClick={changeUserType}>
          Change
        </button>
        <button className="hover:text-black px-4" onClick={removeUser}>
          Remove
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default UserBlock;
