import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import SupAdOpts from "@/components/dashboard/SupAdOpts";
import { useRouter } from "next/navigation";

const SuperAdminDash = () => {
  const router = useRouter();
  const allUserPageLink = () => {
    router.push("/dashboard/all-users");
  };
  return (
    <div className="flex flex-wrap">
      <SupAdOpts Icon={PeopleIcon} label={"All Users"} func={allUserPageLink} />
    </div>
  );
};

export default SuperAdminDash;
