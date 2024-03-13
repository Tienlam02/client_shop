import React from "react";
import { renderArray } from "../helper/formatMoney";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
const Pagination = ({ pagination, handlePageChange }) => {
  const { limit, page, totalRows } = pagination;
  const totalPages = Math.ceil(totalRows / limit);
  console.log(page);
  return (
    <div className="mt-4 flex gap-1 items-center justify-center w-full">
      <button
        className="size-9   flex  items-center justify-center rounded-[100%] border"
        onClick={() => handlePageChange(1)}
        disabled={page <= 1}
      >
        <FaAnglesLeft />
      </button>
      <button
        className="size-9   flex  items-center justify-center rounded-[100%] border"
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      >
        <FaAngleLeft />
      </button>
      {renderArray(totalPages)?.map((item, index) => (
        <span
          key={index}
          onClick={() => handlePageChange(item + 1)}
          className={`${
            item + 1 == page ? "bg-slate-300 text-white" : ""
          } size-10 cursor-pointer flex items-center justify-center rounded-[100%] border`}
        >
          {item + 1}
        </span>
      ))}
      <button
        className="size-9   flex  items-center justify-center rounded-[100%] border"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
      >
        <FaAngleRight />
      </button>
      <button
        className="size-9   flex  items-center justify-center rounded-[100%] border"
        onClick={() => handlePageChange(totalPages)}
        disabled={page >= totalPages}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
};

export default Pagination;
