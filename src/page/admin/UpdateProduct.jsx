import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { apiUpdateProduct } from "../../api/product";
const UpdateProduct = ({ productEdit, setProductEdit }) => {
  const { accessToken } = useSelector((state) => state.userSlice);
  const { categories } = useSelector((state) => state.categorySlice);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  console.log(productEdit);

  const onSubmit = async (data) => {
    console.log(data);
    if (data.image[0]) {
      let formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("name", data.name);
      formData.append("desc", data.desc);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("category", data.category);
      formData.append("_id", data._id);
      setIsLoading(true);
      const res = await apiUpdateProduct(formData, accessToken);
      setIsLoading(false);
      if (res.success) {
        toast.success(res?.mess || "Chỉnh sửa sản phẩm thành công!");
        setProductEdit(null);
        navigate("/admin/list-product");
      } else {
        toast.error(res?.mess);
      }
    } else {
      toast.warning("Vui lòng cung cấp đủ thông tin");
    }
    setImage(null);
  };
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    reset({
      name: productEdit.name,
      desc: productEdit.desc,
      price: productEdit.price,
      quantity: productEdit.quantity,
      category: productEdit.category,
      _id: productEdit._id,
    });
  }, []);
  return (
    <div className="w-full min-h-screen p-6 m-auto bg-white rounded-md shadow-2xl relative">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl ">
          <h1 className="text-3xl font-semibold text-center text-purple-700 ">
            Chỉnh sửa sản phẩm
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <input
              type="hidden"
              {...register("_id")}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
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
              <div className="  flex-1">
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
                    className="block w-full   px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <img
                  className="size-32 object-contain"
                  src={image ? image : productEdit.image}
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
              <div className="relative border mb-3" data-te-input-wrapper-init>
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
                Lưu lại
              </button>
            </div>
          </form>

          <div className="modal-action absolute top-0 right-0">
            <a href="#" className="btn" onClick={() => setProductEdit(null)}>
              Đóng!
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(UpdateProduct);
