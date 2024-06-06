"use client";
import addData from "@/firebase/firestore/addData";
import getDocumentByField from "@/firebase/firestore/queryData";
import setData from "@/firebase/firestore/setData";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserInput = ({ isStudent }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleCancel = () => {
    setName("");
    setId("");
    setEmail("");
    setBatch("");
    setDepartment("");
    setUserName("");
    setPassword("");
  };

  const handleDataSubmission = async () => {
    if (
      id == "" ||
      name == "" ||
      email == "" ||
      department == "" ||
      batch == "" ||
      userName == "" ||
      password == ""
    ) {
      toast.error("Please Enter values.");
    } else {
      const data = {
        name,
        ID: id,
        email,
        department,
        batch,
        userName,
        defaultPass: password,
        designation: isStudent ? "Student" : "Faculty",
        timestamp: Date.now(),
      };

      let res1 = await getDocumentByField("users", "ID", id);
      if (res1) {
        toast.error("This is ID is not unique");
      } else {
        let res2 = await setData("users", id, data);
        if (res2) {
          toast.success("Successfully User Created!");
          handleCancel();
        }
      }
    }
  };

  return (
    <div className="w-[550px] h-[735px] text-center shadow-2xl bg-[#FAF1E2] mx-12">
      <div className="p-8">
        <h4 className="text-5xl">{isStudent ? "Student" : "Faculty"}</h4>
        <h5 className="text-gray-600">New User</h5>
      </div>
      <div>
        <input
          className="w-4/5 shadow-3xl bg-transparent p-4 border-none outline-none my-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-4/5 shadow-3xl bg-transparent p-4 border-none outline-none my-2"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="w-4/5 shadow-3xl bg-transparent p-4 border-none outline-none my-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-4/5 shadow-3xl bg-transparent p-4 border-none outline-none my-2"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          className="w-4/5 shadow-3xl bg-transparent p-4 border-none outline-none my-2"
          placeholder={isStudent ? "Batch" : "Designation"}
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
        <input
          className="w-4/5 shadow-3xl bg-transparent p-4 border-none outline-none my-2"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="w-4/5 shadow-3xl bg-transparent p-4 border-none outline-none my-2"
          placeholder="Default Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex w-[90%] justify-end">
        <button className="p-4 hover:shadow-xl mx-3" onClick={handleCancel}>
          Cancel
        </button>
        <button className="p-4 hover:shadow-xl" onClick={handleDataSubmission}>
          Create
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default UserInput;
