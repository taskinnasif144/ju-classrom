"use client";
import { getDP, getID } from "@/Helpers/getLocalDatas";
import FileSelector from "@/components/general/FileSelector";
import getDocumentByField from "@/firebase/firestore/queryData";
import setData from "@/firebase/firestore/setData";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [dp, setDP] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");

  const handleConfirmPassChange = async () => {
    if (oldPass == "" || newPass == "" || reNewPass == "") {
      toast.error("Please Fill the Fields First");
    } else {
      const id = getID();
      const accountDetials = await getDocumentByField("users", "ID", id);
      const old = accountDetials.defaultPass;
      if (old != oldPass) {
        toast.error("Your Old Pass is not Correct!");
      }
      if (old == oldPass) {
        if (newPass == reNewPass) {
          const data = { defaultPass: newPass };
          const res = await setData("users", id, data);
          if (res.result) {
            toast.success("Password changed succesfully");
            setOldPass("");
            setNewPass("");
            setReNewPass("");
          }
        } else {
          toast.error("New Passwords did not match!");
        }
      }
    }
  };

  useEffect(() => {
    setDP(getDP());
  }, []);

  return (
    <div className="m-4 xs:m-8 sm:m-20">
      <div className="flex items-center flex-col sm:flex-row my-10">
        <Avatar src={dp} sx={{ width: 220, height: 220 }} />
        <div className="ml-0 mt-6 sm:mt-0 sm:ml-8">
          <FileSelector />
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-xl sm:text-4xl ">Change Password</h3>
        <input
          className="max-w-[450px] w-full bg-transparent shadow-3xl p-3 px-4 rounded-xl outline-none my-3 text-xs xs:text-sm sm:text-base"
          placeholder="Enter Old Password"
          value={oldPass}
          onChange={(e) => {
            setOldPass(e.target.value);
          }}
        />
        <input
          className="max-w-[450px] w-full bg-transparent shadow-3xl p-3 px-4 rounded-xl outline-none my-3 text-xs xs:text-sm sm:text-base"
          placeholder="Enter New Password"
          value={newPass}
          onChange={(e) => {
            setNewPass(e.target.value);
          }}
        />
        <input
          className="max-w-[450px]  w-full  bg-transparent shadow-3xl p-3 px-4 rounded-xl outline-none my-3 text-xs xs:text-sm sm:text-base"
          placeholder="Re-Enter New Password"
          value={reNewPass}
          onChange={(e) => {
            setReNewPass(e.target.value);
          }}
        />
        <button
          className="max-w-[450px]  w-full  my-2 py-2 text-center bg-[#123C3E] text-[#FAF1E2] text-base xs:text-xl rounded-xl"
          onClick={handleConfirmPassChange}
        >
          Confirm
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default ProfilePage;
