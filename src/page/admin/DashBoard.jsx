import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import React, { useEffect, useState } from "react";
import SiderBar from "../../components/admin/SiderBar";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { apiReport } from "../../api/report";
import { useSelector } from "react-redux";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { formatMoney } from "../../helper/formatMoney";
import { AiOutlineLaptop } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { IoLogInOutline } from "react-icons/io5";

const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState({
    inCome: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalUser: 0,
    totalOrderOfDay: 0,
    newUserOfDay: 0,
  });

  const { accessToken } = useSelector((state) => state.userSlice);
  const dataCat = {
    labels: report?.numberOfProductPerCat?.map((item) => item.categoryName),
    datasets: [
      {
        label: "có sản phẩm",
        data: report?.numberOfProductPerCat?.map((item) => item.productCount),
        backgroundColor: [
          "rgba(0, 102, 204, 0.3)",
          "rgba(51, 204, 51, 0.5)",
          "rgba(255, 153, 0, 1)",
          "rgba(153, 51, 255, 0.8)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(0, 102, 204, 1)",
          "rgba(51, 204, 51, 1)",
          "rgba(255, 153, 0, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 51, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataTotalOrderOfDay = {
    labels: ["Tổng đơn hàng", "Đơn hàng trong ngày"],
    datasets: [
      {
        label: "số đơn hàng",
        data: [report?.totalOrder, report?.totalOrderOfDay],
        backgroundColor: ["rgba(0, 102, 204, 0.3)", "rgba(51, 204, 51, 0.5)"],
        borderColor: ["rgba(0, 102, 204, 1)", "rgba(51, 204, 51, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const fetchInCome = async () => {
    try {
      const res = await apiReport(accessToken);

      if (res.success) {
        setReport({
          ...report,
          inCome: res.inCome?.reduce(
            (init, value) => init + value.totalPriceOrder,
            0
          ),
          totalOrder: res.totalOrder,
          totalProduct: res.totalProduct,
          totalUser: res.totalUser,
          numberOfProductPerCat: res.numberOfProductPerCat,
          totalOrderOfDay: res.totalOrderOfDay,
          newUserOfDay: res.newUserOfDay,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInCome();
  }, []);

  return (
    <div>
      <div
        className="absolute top-0 text-xl  z-50 left-0 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose /> : <RiMenuLine />}
      </div>
      <div className="flex justify-between  ">
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
        <div className="lg:w-[78%] w-full min-h-screen bg-[#dee5ec]">
          <div className="flex bg-white justify-between p-4 py-[1.28rem] ">
            <span className="text-2xl font-bold ">Xin chào admin</span>{" "}
            <IoLogInOutline size={35} />
          </div>
          <div className="grid lg:grid-cols-4 mt-5 px-4 gap-4 ">
            <div className="flex gap-4 bg-white items-center p-2 rounded-md">
              <RiMoneyDollarCircleLine size={40} />

              <div className="flex flex-col  ">
                <span className="text-lg font-medium">Tổng doanh thu</span>
                <span>{formatMoney(report.inCome)}</span>
              </div>
            </div>
            <div className="flex gap-4 items-center p-2 rounded-md bg-white ">
              <BsCartCheck size={40} />
              <div className="flex flex-col  gap-4">
                <span className="text-lg font-medium">Tổng số đơn hàng</span>
                <div className="flex justify-between">
                  <span>{report.totalOrder}</span>
                  <span> + {report.totalOrderOfDay || 0}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 bg-white items-center  p-2 rounded-md ">
              <AiOutlineLaptop size={40} />
              <div className="flex flex-col gap-4">
                <span className="text-lg font-medium">Tổng sản phẩm</span>{" "}
                <span>{report.totalProduct}</span>
              </div>
            </div>
            <div className="flex gap-4 bg-white items-center  p-2 rounded-md">
              <GoPeople size={40} />
              <div className="flex flex-col gap-4">
                <span className="text-lg font-medium">Tổng số người dùng</span>{" "}
                <div className="flex justify-between">
                  <span>{report.totalUser}</span>
                  <span> + {report.newUserOfDay || 0}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4  ">
            <div className="grid lg:grid-cols-2 p-4    mt-4 rounded-md  bg-white   ">
              <div>
                <Pie data={dataTotalOrderOfDay} />
              </div>
              <div>
                <Pie data={dataCat} />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="p-4 bg-white rounded-md w-full h-5"> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
