import UserInput from "@/components/CreateUser/UserInput";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <h2 className="text-4xl sm:text-8xl m-8">Create ID</h2>
      <div className="flex flex-col md:flex-row">
        <UserInput isStudent={true} />
        <UserInput isStudent={false} />
      </div>
    </div>
  );
};

export default page;
