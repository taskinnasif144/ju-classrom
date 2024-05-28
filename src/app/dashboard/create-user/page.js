import UserInput from "@/components/CreateUser/UserInput";
import React from "react";

const page = () => {
  return (
    <div>
      <h2 className="text-8xl m-8">Create ID</h2>
      <div className="flex flex-wrap">
        <UserInput isStudent={true} />
        <UserInput isStudent={false} />
      </div>
    </div>
  );
};

export default page;
