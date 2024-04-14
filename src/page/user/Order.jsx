import React, { useEffect, useState } from "react";
import { apiCancelOrder, apiGetOrder } from "../../api/order";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatMoney } from "../../helper/formatMoney";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Order = () => {
  const { accessToken } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    const res = await apiGetOrder(accessToken);
    if (res.success) {
      setOrder(res.order);
    }
  };
  useEffect(() => {
    if (!accessToken) {
      toast.warning("Vui lòng đăng nhập");
      navigate("/login");
    }
    fetchOrder();
  }, [accessToken]);

  const handleUpdateOrder = (id) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn hủy đơn hàng",
      icon: "question", // 'success', 'error', 'warning', 'info', 'question'
      confirmButtonText: "OK",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiCancelOrder({ id }, accessToken);
          if (res.success) {
            fetchOrder();
            toast.success(res?.message);
          } else {
            toast.error("Lỗi");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl mt-8 ">
      <h1 className="text-3xl font-semibold text-center text-purple-700 ">
        Quản lý đơn hàng
      </h1>
      <div>
        <table className=" lg:table ">
          <thead>
            <tr>
              <th className="p-2 text-sm lg:text-base"></th>
              <th className="p-2 text-sm lg:text-base">Tên người mua</th>
              <th className="p-2 text-sm lg:text-base">Số điện thoại</th>
              <th className=" text-sm lg:text-base hidden lg:table-cell">
                Địa chỉ
              </th>
              <th className="text-sm lg:text-base hidden lg:table-cell">
                Tên sản phẩm
              </th>
              <th className="text-sm lg:text-base hidden lg:table-cell">
                Tổng tiền
              </th>
              <th className="text-sm lg:text-base">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((item, index) => (
              <tr key={item._id} className="">
                <td className="text-sm lg:text-base">{index + 1}</td>
                <td className="p-2 lg:p-0 text-sm lg:text-base hover:cursor-pointer">
                  {item.fullname}
                </td>
                <td className="p-2 lg:p-0 text-sm lg:text-base">
                  {item.phone}
                </td>
                <td className="text-sm lg:text-base hidden lg:table-cell">
                  {item.address}
                </td>
                <td className="text-sm lg:text-base hidden lg:table-cell">
                  {item?.products.map((item, index) => (
                    <div
                      className="text-sm lg:text-base flex gap-2 items-center"
                      key={index}
                    >
                      {item.productId.name}
                      <span className="text-[10px] text-slate-700">X</span>
                      <span>{item.quantity}</span>
                    </div>
                  ))}
                </td>
                <td className="text-sm  hidden lg:table-cell lg:text-base">
                  {formatMoney(item?.totalPriceOrder)}
                </td>

                <td className=" text-sm flex flex-col  gap-2   lg:text-base">
                  <select
                    value={item.status}
                    disabled
                    className="p-1  lg:py-3 lg:px-4 lg:mt-2 lg:pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                  >
                    <option className="text-sm lg:text-base cursor-pointer">
                      {item.status}
                    </option>
                  </select>
                  {item.status == "Proccessing" && (
                    <button
                      onClick={() => handleUpdateOrder(item._id)}
                      className="btn btn-secondary w-full"
                    >
                      Hủy đơn
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
