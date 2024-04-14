import React, { useEffect, useState } from "react";
import SiderBar from "../../components/admin/SiderBar";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { RiMenuLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { apiCreateBlog } from "../../api/blog";
const CreateBlog = () => {
  const { accessToken } = useSelector((state) => state.userSlice);

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("desc", data.content);

    setIsLoading(true);
    const res = await apiCreateBlog(formData, accessToken);
    setIsLoading(false);
    if (res.success) {
      toast.success(res?.mess || "Thêm bài viết mới thành công!");
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
                Tạo mới bài viết
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div className="mb-2 md:flex gap-2 flex-wrap">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-800">
                      Tên bài viết
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
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
                  </div>
                  <img className="size-32 object-contain" src={image} alt="" />
                </div>

                <Controller
                  className="z-0"
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <Editor
                      apiKey="22rg44mlpwmdn53juswaqqi9vey2x47cnkkr9clul9f3jdua"
                      initialValue={undefined}
                      init={{
                        height: 500,
                        font_size_input_default_unit: "pt",
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          " formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "  blocks fontfamily fontsize | removeformat",
                      }}
                      onEditorChange={(content, editor) => {
                        field.onChange(content);
                      }}
                    />
                  )}
                />

                <div className="mt-6">
                  <button className="w-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Thêm mới bài viết
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

export default CreateBlog;
