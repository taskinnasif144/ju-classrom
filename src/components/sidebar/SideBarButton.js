import React from "react";

const SideBarButton = ({ isActive, Icon, label, func, state, toggle }) => {
  return (
    <div className={``}>
      <button
        onClick={func}
        className={`text-xl xs:text-2xl sm:text-3xl text-center flex items-center  hover:scale-110 transition-all duration-200  ${
          isActive ? "bg-[#FAF1E2]  rounded-s-full" : "text-[#FAF1E2]"
        } ${
          state
            ? "p-2 xs:p-3 sm:p-4   pl-6 xs:pl-12 sm:pl-12 w-[250px] sxs:w-[320px] xs:w-[400px]"
            : "w-[60px] justify-center rounded-full p-3 pl-5 m-auto"
        } `}
      >
        <div className=" text-3xl sm:text-4xl">
          <Icon fontSize="inherit" />
        </div>
        <span
          className={`ml-2 xs:ml-4 overflow-hidden text-start ${
            state ? "w-full" : "w-0"
          }`}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

export default SideBarButton;
