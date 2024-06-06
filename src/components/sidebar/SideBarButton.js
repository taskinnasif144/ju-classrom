import React from "react";

const SideBarButton = ({ isActive, Icon, label, func }) => {
  return (
    <button
      onClick={func}
      className={`text-3xl text-center flex items-center pl-12  p-6  w-[400px] hover:scale-110 transition-all duration-200 ${
        isActive ? "bg-[#FAF1E2]  rounded-s-full" : "text-[#FAF1E2]"
      } `}
    >
      <div className="text-4xl">
        <Icon fontSize="inherit" />
      </div>
      <span className="ml-4">{label}</span>
    </button>
  );
};

export default SideBarButton;
