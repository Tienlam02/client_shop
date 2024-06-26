import React, { useEffect, useState } from "react";
import SiderBar from "../../components/admin/SiderBar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { apiCreateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categorySlice);
  const { accessToken } = useSelector((state) => state.userSlice);

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("desc", data.desc);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("category", data.category);
    setIsLoading(true);
    const res = await apiCreateProduct(formData, accessToken);
    setIsLoading(false);
    if (res.success) {
      toast.success(res?.mess || "Thêm sản phẩm mới thành công!");
      setImage(null);
      reset();
    } else {
      toast.error(res?.mess);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <div
        className="absolute top-0 text-xl  z-50 left-0 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <AiOutlineClose /> : <RiMenuLine />}
      </div>
      <div className="flex justify-between  ">
        <div className=" hidden lg:block  w-[22%] min-h-screen bg-[#FFFFFF] text-black">
          <SiderBar />
        </div>

        <div
          className={` ${
            isOpen ? "" : "hidden"
          } absolute top-0 left-0 lg:hidden   min-h-screen bg-[#FFFFFF] text-black`}
        >
          {isOpen && <SiderBar />}
        </div>
        <div className="lg:w-[78%] w-full  ">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl lg:mt-12 transition-all ease-in duration-105 ">
              <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                Tạo mới sản phẩm
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div className="mb-2 md:flex gap-2 flex-wrap">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800">
                      Tên sản phẩm
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex-1/2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Giá
                    </label>
                    <input
                      type="number"
                      min={1}
                      {...register("price")}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex-1/2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      {...register("quantity")}
                      min={1}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="   flex-1">
                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-gray-800">
                        Ảnh
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e)}
                        {...register("image", {
                          onChange: (e) => {
                            handleFileChange(e);
                          },
                        })}
                        className="block w-full  px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <img
                      className="size-32 object-contain"
                      src={image}
                      alt=""
                    />
                  </div>
                  <div className="mb-2 flex-1 ">
                    <label className="block text-sm font-semibold text-gray-800">
                      Danh mục
                    </label>
                    <select
                      {...register("category")}
                      className="py-3 px-4 mt-2 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                      title="Chọn danh mục"
                    >
                      {categories?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Mô tả
                  </label>
                  <div
                    className="relative border mb-3"
                    data-te-input-wrapper-init
                  >
                    <textarea
                      className="peer  block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlTextarea1"
                      rows={5}
                      {...register("desc")}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Thêm mới sản phẩm
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
