import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { apiUpdateCart } from "../api/user";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateCart } from "../features/userSlice";
import { toast } from "react-toastify";
import { formatMoney } from "../helper/formatMoney";

const Product = ({ item }) => {
  const { accessToken, user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelAddToCart = async (data) => {
    if (!accessToken) {
      navigate("/login");
    } else {
      const res = await apiUpdateCart(data, accessToken);
      if (res.success) {
        toast.success(res.message);
        dispatch(updateCart(res.user));
      } else {
        toast.warning(res.message);
      }
    }
  };
  return (
    <div className="lg:border  shadow-xl rounded-lg w-full lg:px-8  p-2 space-y-3 hover:scale-105 transition-all duration-150 ease-in">
      <div className="flex justify-center">
        <img
          className="rounded-md size-44  object-contain "
          src={item?.image}
          alt=""
        />
      </div>
      <div className="flex justify-between flex-col gap-2">
        <Link to={`/product/${item.category}/${item._id}`}>
          {" "}
          <span className=" hover:text-purple-700 cursor-pointer font-medium line-clamp-1 ">
            {item?.name}
          </span>
        </Link>
        <span className="  line-clamp-1 text-gray-500 text-sm">
          {formatMoney(item?.price || 0)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">Đã bán: {item?.sold}</span>

        <span
          onClick={() => handelAddToCart(item)}
          className=" text-xl lg:text-2xl cursor-pointer border rounded-full  p-2 bg-slate-300 hover:bg-slate-500"
        >
          <MdAddShoppingCart />
        </span>
      </div>
    </div>
  );
};

export default Product;
