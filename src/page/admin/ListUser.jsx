import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import SiderBar from "../../components/admin/SiderBar";
import { useSelector } from "react-redux";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { apiChangeRole, apiDeleteUserByAd, apiGetUsers } from "../../api/user";
const ListUser = () => {
  const { accessToken } = useSelector((state) => state.userSlice);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteUser = ({ _id, username }) => {
    Swal.fire({
      title: `Bạn chắc chắn muốn xóa người dùng ${username}`,
      icon: "question", // 'success', 'error', 'warning', 'info', 'question'
      confirmButtonText: "OK",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          const res = await apiDeleteUserByAd({ _id: _id }, accessToken);

          setIsLoading(false);
          if (res.success) {
            fetchUsers();
            toast.success("Xóa người dùng thành công");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const fetchUsers = async () => {
    try {
      const res = await apiGetUsers(accessToken);
      if (res.success) {
        setUsers(res.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnchangRole = async (e, data) => {
    try {
      const res = await apiChangeRole(
        {
          ...data,
          role: e.value,
        },
        accessToken
      );
      if (res.success) {
        toast.success("Phân quyền thành công!");
        fetchUsers();
      } else {
        toast.error("Internal server!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
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
                Quản lý người dùng
              </h1>
              <div>
                <table className="lg:table   ">
                  <thead>
                    <tr>
                      <th className="text-sm lg:text-base p-2"></th>
                      <th className="text-sm lg:text-base">Tên người dùng</th>
                      <th className="text-sm lg:text-base ">Quyền</th>
                      <th className="text-base">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((item, index) => (
                      <tr key={item._id} className="  border-b">
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td className="px-2 ">
                          <select
                            className=" lg:py-3 lg:px-4 mt-2 lg:pe-9 block p-2  bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                            title="Chọn danh mục"
                            value={item.role ? "1" : "0"}
                            onChange={(e) =>
                              handleOnchangRole(e.target, {
                                _id: item._id,
                              })
                            }
                          >
                            <option value="1">Admin</option>
                            <option value="0">User</option>
                          </select>
                        </td>
                        <td className="flex items-center justify-center lg:items-start lg:justify-start ">
                          <div className="flex items-center my-auto text-base lg:text-2xl gap-2 cursor-pointer">
                            <span
                              onClick={() => handleDeleteUser(item)}
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

export default ListUser;
