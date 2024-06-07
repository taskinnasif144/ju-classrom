import { getID, getName } from "@/Helpers/getLocalDatas";
import addData from "@/firebase/firestore/addData";
import { Room } from "@mui/icons-material";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";

const CreateClass = ({ func, toast }) => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");

  const handleCreateclass = async () => {
    const facultyName = getName();
    const facultyID = getID();
    const data = {
      department: name,
      section,
      subject,
      roomNo: room,
      faculty: facultyName,
      facultyID,
      timestamp: Date.now(),
    };

    const res = await addData("classes", data);
    if (res.result) {
      toast.success("Class Created");
      func();
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="w-full p-6 sm:p-12 shadow-3xl bg-[#FAF1E2] ">
      <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4">Create Class</h3>
      <div>
        <input
          className="w-full bg-transparent shadow-3xl px-3 sm:px-2  py-4 rounded-lg my-4 outline-none"
          placeholder="Department"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full bg-transparent shadow-3xl px-3 sm:px-6 py-4 rounded-lg my-4 outline-none"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        <input
          className="w-full bg-transparent shadow-3xl px-3 sm:px-6 py-4 rounded-lg my-4 outline-none"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          className="w-full bg-transparent shadow-3xl px-3 sm:px-6 py-4 rounded-lg my-4 outline-none"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="my-1 sm:my-4 px-5 py-3 text-xl  hover:scale-110"
            onClick={func}
          >
            Cancel
          </button>
          <button
            className="my-1 sm:my-4 px-5 py-3 text-xl hover:scale-110"
            onClick={handleCreateclass}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;
