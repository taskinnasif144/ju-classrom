"use client";
import { getDesignation, getName } from "@/Helpers/getLocalDatas";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import SuperAdminDash from "@/components/dashboard/SuperAdminDash";
import {
  adminAccess,
  facultyAccess,
  studentAccess,
} from "@/Helpers/userAccess";
import FacultyOpts from "@/components/dashboard/FacultyOpts";
import FacultyDash from "@/components/dashboard/FacultyDash";
import StudentDash from "../dashboard/StudentDash";

const DashboardPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  useEffect(() => {
    if (!cookies.access_token) {
      router.push("/");
    }
    setDesignation(getDesignation());
    setName(getName());
    //eslint-disable-next-line
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="m-6 my-8">
        <h2 className="text-7xl">
          Welcome!
          <br /> {name}
        </h2>
        {adminAccess(designation) && (
          <h4 className="text-3xl my-3">TO SUPER ADMIN</h4>
        )}
      </div>
      {facultyAccess(designation) && <FacultyDash />}
      {adminAccess(designation) && <SuperAdminDash />}
      {studentAccess(designation) && <StudentDash />}
    </div>
  );
};

export default DashboardPage;
