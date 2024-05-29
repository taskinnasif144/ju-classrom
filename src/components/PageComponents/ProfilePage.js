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
    <div className="m-20">
      <div className="flex items-center my-10">
        <Avatar src={dp} sx={{ width: 220, height: 220 }} />
        <div className="ml-8">
          <FileSelector />
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-4xl ">Change Password</h3>
        <input
          className="w-[450px] bg-transparent shadow-3xl px-8 py-5 rounded-xl outline-none my-3"
          placeholder="Enter Old Password"
          value={oldPass}
          onChange={(e) => {
            setOldPass(e.target.value);
          }}
        />
        <input
          className="w-[450px] bg-transparent shadow-3xl px-8 py-5 rounded-xl outline-none my-3"
          placeholder="Enter New Password"
          value={newPass}
          onChange={(e) => {
            setNewPass(e.target.value);
          }}
        />
        <input
          className="w-[450px] bg-transparent shadow-3xl px-8 py-5 rounded-xl outline-none my-3"
          placeholder="Re-Enter New Password"
          value={reNewPass}
          onChange={(e) => {
            setReNewPass(e.target.value);
          }}
        />
        <button
          className="w-[450px] my-2 py-4 text-center bg-[#123C3E] text-[#FAF1E2] text-2xl rounded-xl"
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
