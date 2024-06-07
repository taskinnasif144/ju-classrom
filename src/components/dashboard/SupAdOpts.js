import React from "react";

const SupAdOpts = ({ Icon, label, func }) => {
  return (
    <div
      className="m-4 sm:m-12 p-6 sm:p-12  rounded-lg px-12 sm:px-24 shadow-3xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
      onClick={func}
    >
      <div className="text-7xl sm:text-8xl text-center">
        <Icon fontSize="inherit" />
      </div>
      <h3 className="text-center mt-2 pt-3 border-t-2 border-black text-lg sm:text-2xl">
        {label}
      </h3>
    </div>
  );
};

export default SupAdOpts;
