import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 h-[7vh] text-white flex justify-between px-1 py-1 w-[100vw] lg:px-60 md:py-4 items-center ">
      <div className="text-lg md:text-xl font-bold">
        <span className="text-green-500 cursor-pointer">&lt;</span>
        <span className="cursor-pointer">Pass </span>
        <span className="text-green-500 cursor-pointer">OP/&gt;</span>
      </div>

      <div>
        <ul className="flex list-none gap-3 text-md ">
            <li className="cursor-pointer hover:text-green-500">Home</li>
            <li className="cursor-pointer hover:text-green-500">About</li>
            <li className="cursor-pointer hover:text-green-500">Contact</li>
        </ul>
      </div>
      <div className="flex items-center gap-2 hover:bg-slate-600 px-2 rounded-xl cursor-pointer"><img className="invert  w-7 md:w-10" src="/icons/github.svg" alt="" /><span>Github</span> </div>

      
    </nav>
  );
};

export default Navbar;
