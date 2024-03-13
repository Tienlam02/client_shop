import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../features/userSlice";
const Header = () => {
  const { user } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="bg-red-400  ">
      <div className="flex justify-between items-center container py-1">
        <h1 className="font-main text-white">LOGO</h1>
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
                <a className="justify-between">Thông tin cá nhân</a>
              </li>
              <li>
                {user.role == 1 ? (
                  <Link to="/admin/dashboard">Dashboard</Link>
                ) : (
                  <Link to="/order">Đơn hàng của tôi</Link>
                )}
              </li>
              <li onClick={() => handleLogout()}>
                <Link>Đăng xuất</Link>
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
