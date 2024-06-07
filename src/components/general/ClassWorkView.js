import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClassWorkComment from "./ClassWorkComment";
import RenderFiles from "./RenderFiles";
import ExamSubmission from "./ExamSubmission";
import {
  facultyAccess,
  facultyOrAdminAccess,
  studentAccess,
} from "@/Helpers/userAccess";
import { getDesignation, getID } from "@/Helpers/getLocalDatas";
import queryAllData from "@/firebase/firestore/queryAllData";
import SubmisionView from "../exams/SubmisionView";
import getData from "@/firebase/firestore/getData";

const ClassWorkView = ({ examInfo, isExam = false }) => {
  const [submisions, setSubmision] = useState([]);
  const [mark, setMark] = useState(null);

  useEffect(() => {
    const getAllSubmissions = async () => {
      const res = await queryAllData("submits", "examID", examInfo.id);
      if (res) {
        setSubmision(res);
      }
    };
    const getStudentMark = async () => {
      const id = examInfo.id + getID();
      const res = await getData("submits", id);
      if (!res.error && res.result) {
        console.log(res.result);
        setMark(res.result.obtainedMark);
      }
    };
    getAllSubmissions();
    getStudentMark();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="my-4 sm:my-8 shadow-3xl p-3 xs:p-5 rounded-2xl">
      <div className="">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar src={examInfo.facultyDp} />
            <h3 className="text-base sm:text-xl font-normal ml-2 xs:ml-3">
              {examInfo.facultyName}
            </h3>
          </div>
          {isExam && (
            <div className="">
              <h4 className="flex  items-center text-sm xs: text-base">
                Marks:
                <div className="flex flex-col ml-2 text-center">
                  {studentAccess(getDesignation()) && (
                    <span className="border-b-2 border-black">
                      {mark ? mark : "TBA"}
                    </span>
                  )}
                  <span>{examInfo.baseMark}</span>
                </div>
              </h4>
            </div>
          )}
        </div>
        <div>
          <h4 className="text-lg xs:text-xl font-semibold my-4">
            {examInfo.title}
          </h4>
          <p className="text-sm xs:text-md">{examInfo.description}</p>
        </div>
        <div className="flex flex-wrap my-4">
          {examInfo.files.map((f) => (
            <RenderFiles key={f.link} name={f.name} link={f.link} />
          ))}
        </div>
      </div>

      {!isExam && <ClassWorkComment />}
      {isExam && studentAccess(getDesignation()) ? (
        <ExamSubmission examID={examInfo.id} />
      ) : (
        <></>
      )}

      {facultyOrAdminAccess(getDesignation()) && submisions.length > 0 ? (
        submisions.map((sub) => {
          return <SubmisionView key={sub.userID} submision={sub} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default ClassWorkView;
