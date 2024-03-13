import React, { useState } from "react";
import SiderBar from "../../components/admin/SiderBar";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { FaChevronCircleLeft } from "react-icons/fa";
const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className="absolute top-0 text-xl  z-50 left-0 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose /> : <RiMenuLine />}
      </div>
      <div className="flex justify-between  ">
        <div className=" hidden lg:block min-w-[22%] min-h-screen bg-[#FFFFFF] text-black">
          <SiderBar />
        </div>

        <div
          className={` ${
            isOpen ? "" : "hidden"
          } absolute z-40 top-0 left-0 lg:hidden w-[220px] min-h-screen bg-[#FFFFFF] text-black`}
        >
          {isOpen && <SiderBar />}
        </div>
        <div className="lg:w-[78%]  w-full       px-4"> </div>
      </div>
    </div>
  );
};

export default DashBoard;
