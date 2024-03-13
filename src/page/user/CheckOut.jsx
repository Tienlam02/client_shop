import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaUserTie } from "react-icons/fa";
import { AiTwotoneHome } from "react-icons/ai";
import { formatMoney } from "../../helper/formatMoney";
import { apiCreateOrder } from "../../api/order";
const CheckOut = () => {
  const { register, handleSubmit } = useForm();
  const { accessToken, user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (inforUser) => {
    const cart = user.cart.map((item) => {
      return { productId: item.product._id, quantity: item.quantity };
    });
    const data = {
      inforUser,
      cart,
      totalPriceOrder: handleTotalPrice(),
    };
    setIsLoading(true);
    const res = await apiCreateOrder(data, accessToken);
    setIsLoading(false);
    if (res.success) {
      Swal.fire({
        title: "Thành công",
        text: "Cám ơn bạn đã đặt hàng! ",
        icon: "success",
      });
      navigate("/order");
    } else {
      Swal.fire({
        title: "Oops",
        text: res?.error || res.message,
        icon: "error",
      });
    }
  };

  const handleTotalPrice = () => {
    return user?.cart?.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);
  };
  useEffect(() => {
    if (!accessToken) navigate("/login");
  }, [accessToken]);

  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Đơn hàng của bạn</p>

          {user?.cart?.map((item) => (
            <div
              key={item._id}
              className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
            >
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.product.image}
                />
                <div className="flex w-full flex-col px-4 py-4 gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{item.product.name}</span>
                    <span className="text-sm">X</span>
                    <span className="float-right text-gray-400">
                      {item.quantity}
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Giá: {formatMoney(item.product.price || 0)}
                  </p>
                  <p className=" text-lg font-medium ">
                    Tạm tính:{" "}
                    {formatMoney(item.quantity * item.product.price || 0)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Thông tin thanh toán</p>
            <p className="text-gray-400">
              Vui lòng cung cấp đúng thông tin đặt hàng
            </p>
            <div>
              <label
                htmlFor="fullname"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Họ và tên
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("fullname")}
                  id="fullname"
                  name="fullname"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Lâm Văn Tiện"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FaUserTie />
                </div>
              </div>

              <label
                htmlFor="phone"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Số điện thoại
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  name="phone"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0349761273"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FaPhoneAlt />
                </div>
              </div>
              <label
                htmlFor="address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Địa chỉ nhận hàng
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("address")}
                  id="address"
                  name="address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="giặt là Minh Tiến - Đội 7 Ngọc Hồi - Thanh Trì - Hà Nội"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <AiTwotoneHome />
                </div>
              </div>
              {/* Total */}
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Vận chuyển
                  </p>
                  <p className="font-semibold text-gray-900">0 Đ</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Tổng tiền</p>
                  <p className="font-semibold text-gray-900">
                    {formatMoney(handleTotalPrice() || 0)}
                  </p>
                </div>
              </div>
            </div>
            <button className=" btn btn-success mt-4 mb-8 w-full rounded-md   px-6 py-3 font-medium text-white">
              Đặt hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
