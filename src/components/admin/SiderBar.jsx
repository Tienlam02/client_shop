import React from "react";
import { Link, NavLink } from "react-router-dom";
import { CiBoxList, CiHome, CiSettings } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";

const SiderBar = () => {
  return (
    <div className="mt-5 ml-5">
      <p className="flex justify-center text-4xl border-b pb-4 shadow-md">
        <NavLink to="/">Logo</NavLink>
      </p>
      <ul className="flex mt-10 flex-col gap-5">
        <li>
          <NavLink className="flex items-center gap-2" to="/admin/dashboard">
            <CiHome />
            Dashboard
          </NavLink>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <CiSettings size={20} /> Quản lý đơn hàng
          </div>
          <ul className="ml-5 space-y-4 mt-4">
            <li>
              <NavLink
                className="flex items-center gap-2"
                to="/admin/list-order"
              >
                <CiBoxList />
                Danh sách đơn hàng
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <CiSettings size={20} /> Quản lý sản phẩm
          </div>
          <ul className="ml-5 space-y-4 mt-4">
            <li>
              <NavLink
                className="flex items-center gap-2"
                to="/admin/create-product"
              >
                <IoCreateOutline /> Tạo sản phẩm
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center gap-2"
                to="/admin/list-product"
              >
                <CiBoxList />
                Danh sách sản phẩm
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <CiSettings size={20} /> Quản lý người dùng
          </div>
          <ul className="ml-5 space-y-4 mt-4">
            <li>
              <NavLink
                className="flex items-center gap-2"
                to="/admin/manager-user"
              >
                <IoCreateOutline /> Phân quyền người dùng
              </NavLink>
            </li>
          </ul>
        </li>

        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default SiderBar;
