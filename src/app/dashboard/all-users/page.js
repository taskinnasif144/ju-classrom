import UserList from "@/components/AllUsers/UserList";

import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <h2 className="text-8xl text-center py-7 font-semibold">All Users</h2>
      <div className="flex justify-around">
        <UserList isStudent={true} />
        <UserList isStudent={false} />
      </div>
    </div>
  );
};

export default page;
