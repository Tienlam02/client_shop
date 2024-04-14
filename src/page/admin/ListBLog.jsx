import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import SiderBar from "../../components/admin/SiderBar";
import { useSelector } from "react-redux";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { apiDeleteBlog, apiGetBlogs } from "../../api/blog";
import { Link } from "react-router-dom";
const ListBLog = () => {
  const { accessToken } = useSelector((state) => state.userSlice);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteBlog = ({ _id, name }) => {
    Swal.fire({
      title: `Bạn chắc chắn muốn xóa bài viết ${name}`,
      icon: "question",
      confirmButtonText: "OK",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const res = await apiDeleteBlog({ _id: _id }, accessToken);

          setIsLoading(false);
          if (res.success) {
            fetchBlog();
            toast.success("Xóa bài viết thành công");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const res = await apiGetBlogs({ sort: "-createdAt" });
      setIsLoading(false);
      if (res.success) {
        setBlogs(res.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlog();
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
          } absolute z-40 top-0 left-0 lg:hidden   min-h-screen bg-[#FFFFFF] text-black`}
        >
          {isOpen && <SiderBar />}
        </div>
        <div className="lg:w-[78%] w-full">
          {isLoading ? (
            <div className="absolute left-[50%]">
              <Loading />
            </div>
          ) : (
            <div className="w-full min-h-screen p-6 m-auto bg-white rounded-md shadow-2xl ">
              <h1 className="text-3xl font-semibold text-center text-purple-700 ">
                Quản lý bài viết
              </h1>
              <div>
                <table className="lg:table   ">
                  <thead>
                    <tr>
                      <th className="text-sm lg:text-base p-2"></th>
                      <th className="text-sm lg:text-base ">Ảnh</th>
                      <th className="text-sm lg:text-base">Tên bài viết</th>
                      <th className="text-base">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs?.map((item, index) => (
                      <tr key={item._id} className="  border-b">
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item.image}
                            className="size-20 object-cover"
                            alt=""
                          />
                        </td>
                        <td className="cursor-pointer ">
                          <Link
                            className="hover:border-b border-b-blue-500"
                            to={`/blog/${item._id}`}
                          >
                            {item.name}
                          </Link>
                        </td>

                        <td className="flex items-center justify-center lg:items-start lg:justify-start ">
                          <div className="flex items-center my-auto text-base lg:text-2xl gap-2 cursor-pointer">
                            <span
                              onClick={() => handleDeleteBlog(item)}
                              title="Xóa sản phẩm"
                              className="btn text-base lg:text-xl text-red-900  "
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListBLog;
