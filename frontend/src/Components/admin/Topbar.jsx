import React, { useContext } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../Context/authContext";

const Topbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 h-20 shadow-md justify-between">
      <div className="">
        <input
          className="border-2 p-1 rounded-md"
          placeholder="Type to search..."
          type="search"
          name=""
          id=""
        />
        <FaSearch className="absolute right-2" />
      </div>
      <div className="flex justify-center items-center gap-4 mr-8">
        <div className="rounded-full bg-[#EFF4FB] grid place-items-center h-8 w-8 cursor-pointer">
          <IoMdNotificationsOutline />
        </div>
        <div className="rounded-full bg-[#EFF4FB] grid place-items-center h-8 w-8 cursor-pointer">
          <AiOutlineMessage />
        </div>
        <div className="flex justify-center items-center gap-1">
          <span className="text-primary font-bold">
            Jhon doe {currentUser?.name}
          </span>
          <div className="rounded-full bg-[#EFF4FB] grid place-items-center h-16 w-16 cursor-pointer text-[2rem]">
            <FaUser />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

