import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import SiderBar from "../../components/admin/SiderBar";

import { useSelector } from "react-redux";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../components/Loading";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";

import UpdateProduct from "./UpdateProduct";
import Pagination from "../../components/Pagination";
import { apiDeleteProduct, apiGetProducts } from "../../api/product";
const ListProduct = () => {
  const { categories } = useSelector((state) => state.categorySlice);
  const { accessToken } = useSelector((state) => state.userSlice);

  const [productEdit, setProductEdit] = useState();
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 4,
    totalRows: 0,
    page: 1,
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 4,
  });

  const handleDeleteProduct = ({ _id, name }) => {
    Swal.fire({
      title: `Bạn chắc chắn muốn xóa sản phẩm ${name}`,
      icon: "question", // 'success', 'error', 'warning', 'info', 'question'
      confirmButtonText: "OK",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const res = await apiDeleteProduct(_id, accessToken);
          setIsLoading(false);
          if (res.success) {
            fetchProducts();
            toast.success("Xóa sản phẩm thành công");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const handleEditProduct = async (item) => {
    setProductEdit(item);
  };
  const handleOnchangeCategory = (e) => {
    setFilters({ ...filters, page: 1, category: e.target.value });
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
  useEffect(() => {
    fetchProducts(filters);
  }, [productEdit, filters]);
  console.log(products);
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
          } absolute z-40 top-0 left-0 lg:hidden w-[220px] min-h-screen bg-[#FFFFFF] text-black`}
        >
          {isOpen && <SiderBar />}
        </div>
        <div className="lg:w-[78%] w-full">
          {productEdit ? (
            <UpdateProduct
              productEdit={productEdit}
              setProductEdit={setProductEdit}
            />
          ) : isLoading ? (
            <div className="absolute left-[50%]">
              <Loading />
            </div>
          ) : (
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl ">
              <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                Quản lý sản phẩm
              </h1>
              <div>
                <div className="flex justify-end">
                  <select
                    className="py-3 px-4 mt-2 pe-9 block  bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                    title="Chọn danh mục"
                    onChange={(e) => handleOnchangeCategory(e)}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-sm lg:text-base"></th>
                      <th className="text-sm lg:text-base">Ảnh</th>
                      <th className="text-sm lg:text-base">Tên sản phẩm</th>
                      <th className="text-sm lg:text-base hidden lg:table-cell">
                        Giá
                      </th>
                      <th className="text-sm lg:text-base hidden lg:table-cell">
                        Số lượng
                      </th>
                      <th className="text-base hidden lg:table-cell">Đã bán</th>
                      <th className="text-base">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.image}
                            className="size-20 object-contain"
                            alt=""
                          />
                        </td>
                        <td>{item.name}</td>
                        <td className="hidden lg:table-cell">{item.price}</td>
                        <td className="hidden lg:table-cell">
                          {item.quantity}
                        </td>
                        <td className="hidden lg:table-cell">{item.sold}</td>
                        <td>
                          <div className="flex   items-center my-auto text-base lg:text-2xl gap-2 cursor-pointer">
                            <a
                              onClick={() => handleEditProduct(item)}
                              title="Chỉnh sửa sản phẩm"
                            >
                              <CiEdit />
                            </a>

                            <span
                              onClick={() => handleDeleteProduct(item)}
                              title="Xóa sản phẩm"
                              className="btn text-base lg:text-xl text-red-900"
                            >
                              <MdOutlineDeleteForever />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default ListProduct;
