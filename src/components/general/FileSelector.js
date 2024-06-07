"use client";

import { getID } from "@/Helpers/getLocalDatas";
import setData from "@/firebase/firestore/setData";
import uploadFileToFirebase from "@/firebase/firestore/uploadFile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function FileSelector() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setID] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  const handleUplaod = async () => {
    const url = await uploadFileToFirebase(selectedFile);
    if (!url) {
      toast.error("Something went wrong");
    } else {
      if (id != "") {
        const data = { dp: url };
        window.localStorage.setItem("dp", url);
        const res = await setData("users", id, data);
        if (res.result) {
          toast.success("Succesfully Display Picture Changed");
          window.location.href = "/dashboard";
        }
      }
    }
  };

  useEffect(() => {
    setID(getID());
  }, []);

  return (
    <div className="flex flex-col items-center space-y-2">
      <label
        htmlFor="fileInput"
        className="text-gray-700 cursor-pointer text-xl sm:text-3xl hover:border-2 border-black px-4 py-3"
      >
        Choose File
      </label>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedFile && (
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Selected file: {selectedFile.name}
          </p>
          <div>
            <button
              className="text-xl px-4 py-2 my-2 text-gray-600 rounded-lg hover:bg-[#123C3E] hover:text-[#FAF1E2] transition-all duration-200"
              onClick={handleUplaod}
            >
              Upload
            </button>
            <button
              className="text-xl px-4 py-2 my-2 text-gray-600 rounded-lg hover:bg-[#123C3E] hover:text-[#FAF1E2] transition-all duration-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileSelector;
