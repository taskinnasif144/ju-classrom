import InsideClassRoom from "@/components/classroom/InsideClassRoom";

import React from "react";

const page = ({ params }) => {
  return (
    <div className="w-full p-12">
      <InsideClassRoom classID={params.id} />
    </div>
  );
};

export default page;
