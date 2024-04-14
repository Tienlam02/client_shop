import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "../../api/product";
import { formatMoney } from "../../helper/formatMoney";
import { MdAddShoppingCart } from "react-icons/md";
import Product from "../../components/Product";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { apiUpdateCart } from "../../api/user";
import { updateCart } from "../../features/userSlice";
import { FaStar } from "react-icons/fa";
const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();
  const id = location?.pathname?.split("/")[3];
  const { accessToken, user } = useSelector((state) => state.userSlice);
  const cate = location?.pathname?.split("/")[2];
  const fetchProduct = async () => {
    try {
      const [res, producSemial] = await Promise.all([
        apiGetProduct({ id: id }),
        apiGetProducts({ limit: 4, category: cate }),
      ]);
      if (producSemial.success) setProducts(producSemial.products);
      if (res.success) setProduct(res.product);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddCart = async () => {
    if (!accessToken) {
      navigate("/login");
    } else {
      const res = await apiUpdateCart(product, accessToken);
      if (res.success) {
        toast.success(res.message);
        dispatch(updateCart(res.user));
      } else {
        toast.warning(res.message);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
    scrollTo(0, 0);
  }, [id, cate]);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2  mt-4">
        <div className="flex items-center">
          <img src={product?.image} className="w-[27rem] h-auto" alt="" />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-4xl font-medium">{product?.name}</span>
          <p className="flex gap-2 ">
            <FaStar className="text-orange-500" />{" "}
            <FaStar className="text-orange-500" />
            <FaStar className="text-orange-500" />
            <FaStar className="text-orange-500" />
            <FaStar className="text-orange-500" />
          </p>
          <span className="text-xl font-medium">
            {formatMoney(product?.price || 0)}
          </span>
          <p className="text-xl font-medium">{product?.desc}</p>
          <button onClick={() => handleAddCart()} className="btn btn-success">
            <MdAddShoppingCart className="text-2xl" />{" "}
            <span className="text-white">Thêm sản phẩm vào giỏ hàng</span>
          </button>
        </div>
      </div>
      <div className="mt-16">
        <span className="text-2xl font-bold  ">Sản phẩm tương tự</span>
        {
          <div className="grid mt-8 gap-4 grid-cols-2 md:grid-cols-4  justify-items-center">
            {products?.map((item) => (
              <Product key={item._id} item={item} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default ProductDetail;
