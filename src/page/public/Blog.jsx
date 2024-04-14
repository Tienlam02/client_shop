import React, { useEffect, useState } from "react";
import { apiGetBlogs } from "../../api/blog";
import SideBarBlog from "../../components/SideBarBlog";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { IoTimeOutline } from "react-icons/io5";
import moment from "moment";
import "../../assets/blog.css";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    try {
      setLoading(true);
      const res = await apiGetBlogs({ sort: "-createdAt" });
      setLoading(false);
      if (res.success) {
        setBlogs(res.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex my-8 gap-4 shadow-xl rounded-md p-4">
          <div className=" w-full lg:w-[75%] bg-[#FFFFFF]">
            {blogs.map((item) => (
              <div key={item._id}>
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
                  <div className="lg:w-[20%] w-full">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full lg:h-36 object-cover"
                    />
                  </div>
                  <div className="lg:w-[70%]  w-full space-y-2">
                    <p className="text-lg font-[#0A0A0A] font-bold lg:line-clamp-1">
                      <Link to={`/blog/${item._id}`}>{item.name}</Link>
                    </p>
                    <p className="flex gap-2 items-center">
                      <IoTimeOutline />{" "}
                      <span className="text-[#EDDACF]">
                        {moment(item?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                      </span>
                    </p>

                    <div
                      className=" text-sm text-[#232323] line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: item?.desc }}
                    />
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            ))}
          </div>
          <div className="w-[25%]  hidden lg:block">
            <SideBarBlog />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
