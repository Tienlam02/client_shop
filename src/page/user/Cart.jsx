import { IoIosReturnLeft } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  apiDecrementCart,
  apiDeleteCart,
  apiIncrementCart,
} from "../../api/user";
import { updateCart } from "../../features/userSlice";
import { toast } from "react-toastify";
import { formatMoney } from "../../helper/formatMoney";
const Cart = () => {
  const { accessToken, user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      toast.warning("Vui lòng đăng nhập");
      navigate("/login");
    }
  }, [accessToken]);

  const handleDecrementCart = async (item) => {
    if (item.quantity <= 1)
      return toast.warning("Số lượng sản phẩm không thể nhỏ hơn 1");
    const res = await apiDecrementCart(
      { _id: item._id, quantity: item.quantity },
      accessToken
    );
    if (res.success) {
      toast.success("Cập nhật giỏ hàng thành công!");
      dispatch(updateCart(res.user));
    } else {
      toast.error("Error");
    }
  };

  const handleIncrementCart = async (item) => {
    const res = await apiIncrementCart(
      { _id: item._id, quantity: item.quantity },
      accessToken
    );
    if (res.success) {
      toast.success("Cập nhật giỏ hàng thành công!");
      dispatch(updateCart(res.user));
    } else {
      toast.error("Error");
    }
  };

  const handleTotalPrice = () => {
    return user?.cart?.reduce((total, item) => {
      return total + item?.quantity * item?.product?.price;
    }, 0);
  };
  const handleDelete = async (_id) => {
    const res = await apiDeleteCart({ _id: _id }, accessToken);
    if (res.success) {
      toast.success(res.message);
      dispatch(updateCart(res.user));
    }
  };

  return (
    <div className="">
      <h1 className="mb-5 mt-3 text-center text-4xl font-bold">Giỏ hàng</h1>
      {user?.cart?.length === 0 ? (
        <span className="flex justify-center mb-4">
          Không có sản phẩm nào trong giỏ hàng
        </span>
      ) : (
        <div className="container overflow-x-auto p-4">
          <table className="mx-auto w-full bg-white">
            <thead>
              <tr>
                <td className="py-2 px-4 text-xl font-medium">Ảnh</td>
                <td className="py-2 px-4 text-xl font-medium">Tên</td>
                <td className="py-2 px-4 text-xl font-medium">Giá</td>
                <td className="py-2 px-4 text-xl font-medium">Số lượng</td>
                <td className="py-2 px-4 text-xl font-medium">Tổng tiền</td>
                <td className="py-2 px-4 text-xl font-medium flex items-center justify-center ">
                  Hành động
                </td>
              </tr>
            </thead>
            <tbody>
              {/* Dữ liệu mẫu */}
              {user?.cart?.map((item) => (
                <tr key={item._id}>
                  <td className="py-2  ">
                    <img
                      src={item?.product?.image}
                      alt="Product 1"
                      className="w-16   rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4">{item?.product?.name}</td>
                  <td className="py-2 px-4">
                    {formatMoney(item?.product?.price || 0)}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() => handleDecrementCart(item)}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        -
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="text"
                        value={item?.quantity}
                        min={1}
                        readOnly
                      />
                      <span
                        onClick={() => handleIncrementCart(item)}
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        +
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    {formatMoney(item?.product?.price * +item?.quantity || 0)}
                  </td>
                  <td
                    onClick={() => handleDelete(item._id)}
                    className="py-2 px-4 text-2xl cursor-pointer flex items-center justify-center  "
                  >
                    <MdDeleteForever className="hover:bg-red-500" />
                  </td>
                </tr>
              ))}
              {/* Thêm các hàng dữ liệu khác tương tự */}
            </tbody>
            <tfoot className=" "></tfoot>
          </table>
          <Link
            className="flex items-center mt-4 gap-2 p-3 bg-slate-200  border"
            to="/"
          >
            <span className="text-2xl">
              <IoIosReturnLeft />
            </span>
            <span>Tiếp tục mua sắm</span>
          </Link>
        </div>
      )}
      <div className="flex flex-col space-y-3 border-t">
        <span className="text-2xl font-bold mt-4">Cộng giỏ hàng</span>
        <span className="text-xl font-medium">
          Tổng tiền: {formatMoney(handleTotalPrice() || 0)}
        </span>

        <Link to="/checkout" className="flex ">
          {" "}
          <button
            className="btn btn-success text-white w-full"
            disabled={user?.cart?.length == 0}
          >
            Tiến hành thanh toán{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
