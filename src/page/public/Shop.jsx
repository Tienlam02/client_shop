import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../api/product";
import Loading from "../../components/Loading";
import SiderBar from "../../components/admin/SiderBar";
import { CiFilter } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import Product from "../../components/Product";
import { IoSearchOutline } from "react-icons/io5";
const Shop = () => {
  const [products, setProducts] = useState();
  const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = useSelector((state) => state.categorySlice);
  const [pagination, setPagination] = useState({
    limit: 4,
    totalRows: 0,
    page: 1,
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 4,
  });

  const handleOnchangeCategory = (e) => {
    setFilters({ limit: 4, page: 1, category: e.target.value });
    setIsOpen(!open);
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page: page });
  };
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await apiGetProducts(filters);
      setIsLoading(false);
      if (res.success) {
        setProducts(res.products);
        setPagination({ ...filters, page: res.page, totalRows: res.count });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnclickSearch = () => {
    setFilters({ limit: 4, page: 1, name: name });
    setName("");
    setIsOpen(!open);
  };
  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);
  const handleReset = () => {
    setFilters({ page: 1, limit: 4 });
    setIsOpen(!open);
  };
  const handleOnchangeRadioPrice = (price) => {
    setFilters({
      ...filters,
      price: price,
    });
    setIsOpen(!open);
  };
  console.log(products);
  const handleOnClickUp = () => {
    setFilters({ ...filters, sort: "price" });
    setIsOpen(!open);
  };
  const handleOnClickDow = () => {
    setFilters({ ...filters, sort: "-price" });
    setIsOpen(!open);
  };
  return (
    <div>
      <div
        className="absolute top-0 text-xl  z-50 left-0 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen && <AiOutlineClose />}
      </div>
      <div className="flex justify-between  ">
        <div className=" hidden lg:block min-w-[22%] min-h-screen bg-[#FFFFFF] text-black">
          <SiderBar />
        </div>

        <div
          className={` ${
            isOpen ? "" : "hidden"
          } absolute z-40 top-0 left-0 lg:hidden w-[220px] min-h-screen bg-[#FFFFFF] text-black`}
        >
          {isOpen && (
            <div className="w-[100vw] min-h-screen z-50 bg-white flex  ">
              <div className="absolute top-10 left-4  ">
                <p className="text-xl font-bold">Loại laptop</p>

                <select
                  className="py-3 px-4 mt-2 pe-9 block  bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                  title="Chọn danh mục"
                  defaultValue={filters?.category}
                  onChange={(e) => handleOnchangeCategory(e)}
                >
                  <option value="">Chọn danh mục</option>
                  {categories?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className=" mt-10 flex border rounded-md py-2 justify-around items-center w-[90vw] ">
                  <input
                    type="text"
                    placeholder="Nhập tên sản phẩm..."
                    className="outline-none"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span
                    onClick={() => handleOnclickSearch()}
                    className="text-2xl"
                  >
                    <IoSearchOutline />
                  </span>
                </div>
                <div className=" flex flex-col mt-10">
                  <span className="label-text text-xl font-bold">Chọn giá</span>
                  <label className="label cursor-pointer">
                    <span className="label-text">00 đến 10 triệu</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-red-500"
                      onClick={() =>
                        handleOnchangeRadioPrice({
                          gte: 0,
                          lte: 10000000,
                        })
                      }
                    />
                  </label>
                </div>
                <div className=" ">
                  <label className="label cursor-pointer">
                    <span className="label-text">10 đến 20 triệu</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-orange-500"
                      onClick={() =>
                        handleOnchangeRadioPrice({
                          gte: 10000000,
                          lte: 20000000,
                        })
                      }
                    />
                  </label>
                </div>
                <div className=" ">
                  <label className="label cursor-pointer">
                    <span className="label-text">20 đến 30 triệu</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      onClick={() =>
                        handleOnchangeRadioPrice({
                          gte: 20000000,
                          lte: 30000000,
                        })
                      }
                    />
                  </label>
                </div>
                <div className=" ">
                  <label className="label cursor-pointer">
                    <span className="label-text"> 30 triệu trở lên </span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-slate-700"
                      onClick={() =>
                        handleOnchangeRadioPrice({
                          gte: 50000000,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="flex gap-8 mt-4 items-center">
                  <p className="text-xl font-medium">Sắp xếp theo giá </p>
                  <div className="flex flex-col gap-4 text-xl">
                    <span
                      onClick={() => handleOnClickUp()}
                      className="hover:cursor-pointer"
                    >
                      <FaArrowAltCircleUp />
                    </span>
                    <span
                      onClick={() => handleOnClickDow()}
                      className="hover:cursor-pointer"
                    >
                      <FaArrowAltCircleDown />
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleReset()}
                  className="btn btn-success mt-5 text-white"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-[78%] w-full">
          {isLoading ? (
            <div className="absolute left-[50%]">
              <Loading />
            </div>
          ) : (
            <div className="w-full relative p-6 m-auto bg-white rounded-md shadow-2xl ">
              <h1 className="  text-3xl font-semibold text-center text-purple-700 ">
                Sản phẩm
              </h1>
              <div>
                {!isOpen && (
                  <span
                    onClick={() => setIsOpen(!isOpen)}
                    className="  lg:hidden text-4xl absolute flex items-center top-[90px] right-10"
                  >
                    <span className="text-lg font-medium">Bộ lọc</span>{" "}
                    <CiFilter className="cursor-pointer" />
                  </span>
                )}
              </div>
              <div className="grid mt-14 gap-4 grid-cols-2 md:grid-cols-3  justify-items-center">
                {products?.map((item) => (
                  <Product key={item._id} item={item} />
                ))}
              </div>
              <div>
                <Pagination
                  pagination={pagination}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
