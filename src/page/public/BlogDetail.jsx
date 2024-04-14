import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiCreateComment, apiGetBlog } from "../../api/blog";
import SideBarBlog from "../../components/SideBarBlog";
import Loading from "../../components/Loading";
import { FaUserPen } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const BlogDetail = () => {
  const location = useLocation();
  const { register, handleSubmit, reset } = useForm();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = location?.pathname?.split("/")[2];
  const { accessToken } = useSelector((state) => state.userSlice);
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await apiCreateComment({ ...data, id: blog?._id }, accessToken);
    setLoading(false);
    if (res.success) {
      fetchBlog();
      toast.success(res?.mess || "Bình luận thành công!");
      reset();
    } else {
      if (res?.status === 401) {
        toast.error("Vui lòng đăng nhập!");
      } else {
        toast.error(res?.mess);
      }
    }
  };
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await apiGetBlog(id);
      setLoading(false);
      if (res.success) setBlog(res.blog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
    scrollTo(0, 0);
  }, [id]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 rounded-md shadow-md mt-8">
          <div className="lg:w-[70%] w-full space-y-6 p-4 flex flex-col justify-center items-center">
            <div className="w-full space-y-2">
              <p className="font-bold text-2xl  ">{blog?.name}</p>
              <span className="text-[#EDDACF]">
                {moment(blog?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </div>
            <img src={blog?.image} className="w-auto" alt="" />

            <div dangerouslySetInnerHTML={{ __html: blog?.desc }} />

            <div className="">
              <p className="text-base font-medium">
                TienLamShop 233 TT. Lộc bình, Lạng Sơn, Việt Nam
              </p>
              <p className="text-base font-medium">Hotline: 0985 736 068 </p>
            </div>
            <div className="w-full space-y-2">
              <p className="text-base font-medium">Để lại bình luận</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                  className="textarea textarea-info w-full"
                  placeholder="Nhập bình luận tại đây"
                  {...register("desc")}
                ></textarea>
                <div className="flex justify-end ">
                  <button className="border border-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white">
                    Gửi
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full my-12">
              {blog?.comment?.map((item) => (
                <div
                  key={item._id}
                  className="flex w-full justify-between  gap-2 mb-2"
                >
                  <div className="w-[20%] flex justify-center items-center ">
                    <div className="lg:text-4xl flex justify-center items-center size-16 lg:size-20 rounded-full bg-slate-300 ">
                      <FaUserPen />
                    </div>
                  </div>
                  <div className="w-[80%]   bg-slate-100 p-4 rounded-md">
                    <p className="text-xl font-medium">
                      {item.commentByUser.username} says
                    </p>
                    <p>{item.content}</p>
                    <p className="text-[#EDDACF] mt-1">
                      {moment(item.commentByUser.createdAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-[30%] w-full p-4">
            <SideBarBlog />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
