"use client";

import React, { useEffect, useState } from "react";
import SiderBarUpper from "./SiderBarUpper";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SideBarButton from "./SideBarButton";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { token, getDesignation } from "@/Helpers/getLocalDatas";
import { adminAccess, facultyAccess } from "@/Helpers/userAccess";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GradingIcon from "@mui/icons-material/Grading";

const Sidebar = () => {
  const [dashState, setDashState] = useState(true);
  const [createUSerState, setCreateUSerState] = useState(false);
  const [editUserState, setEditUserState] = useState(false);
  const [profileState, setProfileState] = useState(false);
  const [classRoomState, setClassRoomState] = useState(false);
  const [assignmentState, setAssignmentState] = useState(false);
  const [resultState, setResultState] = useState(false);
  const [designation, setDesignation] = useState("");

  const [cookies, setCookies] = useCookies([token]);

  const router = useRouter();

  const activeCreateUser = () => {
    setDashState(false);
    setCreateUSerState(true);
    setEditUserState(false);
    setProfileState(false);
    router.push("/dashboard/create-user");
  };
  const activeDashboard = () => {
    setDashState(true);
    setCreateUSerState(false);
    setEditUserState(false);
    setProfileState(false);
    setClassRoomState(false);
    setAssignmentState(false);
    setResultState(false);
    router.push("/dashboard");
  };
  const activeEditUser = () => {
    setDashState(false);
    setCreateUSerState(false);
    setEditUserState(true);
    setProfileState(false);
  };

  const activeProfile = () => {
    setDashState(false);
    setCreateUSerState(false);
    setEditUserState(false);
    setProfileState(true);
    setClassRoomState(false);
    setAssignmentState(false);
    setResultState(false);
    router.push("/dashboard/profile");
  };
  const activeClassRoom = () => {
    setDashState(false);
    setClassRoomState(true);
    setAssignmentState(false);
    setResultState(false);
    setProfileState(false);
    router.push("/dashboard/classrooms");
  };
  const activeAssignment = () => {
    setDashState(false);
    setClassRoomState(false);
    setAssignmentState(true);
    setResultState(false);
    setProfileState(false);
    router.push("/dashboard/assignments");
  };
  const activeResult = () => {
    setDashState(false);
    setClassRoomState(false);
    setAssignmentState(false);
    setResultState(true);
    setProfileState(false);
    router.push("/dashboard/results");
  };

  const handleLogOut = () => {
    setCookies(token, "");
    window.localStorage.setItem("designation", "");
    window.localStorage.setItem("name", "");
    window.localStorage.setItem("ID", "");
    window.localStorage.setItem("batch", "");
    window.localStorage.setItem("department", "");
    window.localStorage.setItem("email", "");
    window.localStorage.setItem("username", "");
    window.localStorage.setItem("dp", "");
    router.push("/");
  };

  useEffect(() => {
    setDesignation(getDesignation());
  }, []);

  return (
    <div className="bg-[#123C3E] h-screen w-[400px] flex items-center flex-col fixed left-0">
      <SiderBarUpper />
      <div>
        <SideBarButton
          isActive={dashState}
          Icon={DashboardOutlinedIcon}
          label={"Dashboard"}
          func={activeDashboard}
        />
        {adminAccess(designation) && (
          <SideBarButton
            isActive={createUSerState}
            Icon={GroupAddIcon}
            label={"Create User"}
            func={activeCreateUser}
          />
        )}
        {adminAccess(designation) && (
          <SideBarButton
            isActive={editUserState}
            Icon={ManageAccountsIcon}
            label={"Edit Result"}
            func={activeEditUser}
          />
        )}
        {facultyAccess(designation) && (
          <SideBarButton
            Icon={SchoolIcon}
            label={"Classroom"}
            isActive={classRoomState}
            func={activeClassRoom}
          />
        )}
        {facultyAccess(designation) && (
          <SideBarButton
            Icon={AssignmentTurnedInIcon}
            label={"Exams"}
            isActive={assignmentState}
            func={activeAssignment}
          />
        )}
        {facultyAccess(designation) && (
          <SideBarButton
            Icon={GradingIcon}
            label={"Result"}
            isActive={resultState}
            func={activeResult}
          />
        )}
        <SideBarButton
          isActive={profileState}
          Icon={PersonIcon}
          label={"Profile"}
          func={activeProfile}
        />
        <SideBarButton Icon={LogoutIcon} label={"LogOut"} func={handleLogOut} />
      </div>
    </div>
  );
};

export default Sidebar;
