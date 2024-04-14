import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/userSlice";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { BsCartCheck } from "react-icons/bs";
const Header = () => {
  const { user } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="bg-[#FFA500]  ">
      <div className="flex justify-between items-center container py-1">
        <h1 className="font-main text-white">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            className="size-10 rounded-full"
          />
        </h1>
        {user ? (
          <div className="dropdown dropdown-end  ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className=" ">
                  <CiUser />
                  Thông tin cá nhân
                </a>
              </li>
              <li>
                {user.role == 1 ? (
                  <Link to="/admin/dashboard">
                    <RxDashboard />
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/order">
                    <BsCartCheck />
                    Đơn hàng của tôi
                  </Link>
                )}
              </li>
              <li onClick={() => handleLogout()}>
                <Link to="/login">
                  <IoIosLogOut />
                  Đăng xuất
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <span className="text-white">Đăng nhập hoặc đăng kí</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
