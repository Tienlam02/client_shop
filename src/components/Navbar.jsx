import { Link, NavLink } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <nav className="border-b border-t mt-4 py-2 flex justify-between items-center">
      <ul className="flex   gap-4 text-xl">
        <li>
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" activeclassname="active">
            Cửa hàng
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeclassname="active">
            Contact
          </NavLink>
        </li>
      </ul>
      <Link to="/cart">
        <div className=" hover:bg-slate-400 w-10 h-10 rounded-full hover:cursor-pointer flex justify-center items-center">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">
              {user ? user.cart.length : 0}
            </span>
          </div>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
