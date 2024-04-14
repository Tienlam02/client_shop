import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiLogin } from "../../api/user";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [typePassword, setTypePassword] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await apiLogin(data);
    setIsLoading(false);
    if (res.success) {
      dispatch(login(res));

      navigate("/");
    } else {
      Swal.fire({
        title: "Oops",
        text: res.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <img
        className="absolute  w-screen h-screen object-cover "
        src="https://w.forfun.com/fetch/f4/f42bd10be1fa5abd2bf7b72cc45bc154.jpeg?w=1000&r=0.5625"
        alt=""
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full z-50 p-6 m-auto bg-white rounded-md shadow-2xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Đăng nhập
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Tên người dùng
              </label>
              <input
                type="text"
                {...register("username")}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Mật khẩu
              </label>
              <div className="relative">
                {" "}
                <input
                  type={typePassword}
                  {...register("password")}
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {typePassword == "password" ? (
                  <FaRegEye
                    onClick={() => setTypePassword("text")}
                    className="absolute right-5 top-3 cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setTypePassword("password")}
                    className="absolute right-5 top-3 cursor-pointer"
                  />
                )}
              </div>
            </div>
            <a href="#" className="text-xs text-purple-600 hover:underline">
              Quên mật khẩu?
            </a>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Đăng nhập ngay
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Nếu bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-medium text-purple-600 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            <Link
              to="/"
              className="font-medium text-purple-600 hover:underline"
            >
              Về trang chủ
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
