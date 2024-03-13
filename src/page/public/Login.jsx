import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiLogin } from "../../api/user";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await apiLogin(data);
    setIsLoading(false);
    if (res.success) {
      dispatch(login(res));
      console.log(res);
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
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl lg:max-w-xl">
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
                defaultValue={"duonglam546@gmail.com"}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Mật khẩu
              </label>
              <input
                type="password"
                {...register("password")}
                defaultValue={111111}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
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
