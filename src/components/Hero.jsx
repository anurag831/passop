import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="py-4 md:pt-11 md:pb-4 flex flex-col justify-center items-center">
        <div className="font-bold text-2xl md:text-4xl text-white">
          <span className="text-green-500 cursor-pointer">&lt;</span>
          <span className="cursor-pointer">Pass </span>
          <span className="text-green-500 cursor-pointer">OP/&gt;</span>
        </div>

        <div className="text-xs text-white">Your ultimate password manager</div>
      </div>
    </div>
  );
};

export default Hero;
