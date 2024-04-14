import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import SiderBar from "../../components/admin/SiderBar";
import { useDispatch, useSelector } from "react-redux";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { apiGetOrders, apiUpdateOrder } from "../../api/order";
import { formatMoney } from "../../helper/formatMoney";
import Loading from "../../components/Loading";
const optionStatus = ["Processing", "Return", "Accept", "Success", "Shipping"];

const ListOrder = () => {
  const { accessToken } = useSelector((state) => state.userSlice);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState(null);
  const [id, setId] = useState(null);
  const fetchOrder = async () => {
    setIsLoading(true);
    const res = await apiGetOrders(accessToken);
    setIsLoading(false);
    if (res.success) {
      setOrder(res.order);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const updateOrder = async () => {
    try {
      setIsLoading(true);
      const res = await apiUpdateOrder({ status, id }, accessToken);
      if (res.success) {
        fetchOrder();
        setIsLoading(false);
        toast.success(res?.message);
      } else {
        toast.error("Lỗi");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (status && id) updateOrder();
  }, [status]);

  return (
    <div>
      <div
        className="absolute top-0 text-xl  z-50 left-0 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose /> : <RiMenuLine />}
      </div>
      <div className="flex justify-between   ">
        <div className=" hidden lg:block min-w-[22%] min-h-screen bg-[#FFFFFF] text-black">
          <SiderBar />
        </div>
        <div
          className={` ${
            isOpen ? "" : "hidden"
          } absolute z-40 top-0 left-0 lg:hidden  min-h-screen bg-[#FFFFFF] text-black`}
        >
          {isOpen && <SiderBar />}
        </div>
        <div className="lg:w-[78%] w-full    ">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl ">
              <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                Quản lý đơn hàng
              </h1>
              <div>
                <div className="flex justify-end my-4">
                  <select
                    onChange={(e) => console.log(e)}
                    className="cursor-pointer  p-2 lg:py-3 lg:px-4 lg:mt-2 lg:pe-9 block  bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                  >
                    {optionStatus.map((value, index) => (
                      <option
                        key={index}
                        className=" text-sm lg:text-base cursor-pointer"
                      >
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <table className=" lg:table ">
                  <thead>
                    <tr>
                      <th className="p-2 text-sm lg:text-base"></th>
                      <th className="p-2 text-sm lg:text-base">
                        Tên người mua
                      </th>
                      <th className="p-2 text-sm lg:text-base">
                        Số điện thoại
                      </th>
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
                        <td
                          className="p-2 lg:p-0 text-sm lg:text-base hover:cursor-pointer"
                          onClick={() => alert(1)}
                        >
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
                              <span className="text-[10px] text-slate-700">
                                X
                              </span>
                              <span>{item.quantity}</span>
                            </div>
                          ))}
                        </td>
                        <td className="text-sm  hidden lg:table-cell lg:text-base">
                          {formatMoney(item?.totalPriceOrder)}
                        </td>

                        <td className=" text-sm   lg:text-base">
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            onClick={() => setId(item._id)}
                            value={item.status}
                            className="p-1 lg:py-3 lg:px-4 lg:mt-2 lg:pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                          >
                            {optionStatus.map((value, index) => (
                              <option
                                key={index}
                                className="text-sm lg:text-base cursor-pointer"
                              >
                                {value}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
