import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { apiGetProducts } from "../../api/product";
import Product from "../../components/Product";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetch = async () => {
    setIsLoading(true);
    const [res, res1] = await Promise.all([
      apiGetProducts({ limit: 8, sort: "-createdAt" }),
      apiGetProducts({ limit: 8, sort: "-sold" }),
    ]);
    setIsLoading(false);
    setProducts(res.products);
    setBestSeller(res1.products);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 my-20">
            <img
              src="https://mediamart.vn/images/uploads/2022/a780c1b0-9a49-41a5-8922-dadbdc515f01.png"
              alt=""
              className="w-full  flex-1 object-fill p-4 bg-[#ffffff] "
            />
            <div className="bg-[#ffffff] py-4 lg:py-0 flex flex-col justify-center items-center gap-4">
              <p className="font-bold text-2xl lg:text-4xl text-slate-600 flex flex-col items-center">
                <span>Siêu sale giữa tháng</span>
                <span> Laptop sale nửa giá</span>
              </p>
              <button className="btn btn-outline btn-secondary hover:cursor-pointer">
                Mua ngay
              </button>
            </div>
          </div>
          <p className="text-2xl font-medium my-4 uppercase">Sản phẩm mới về</p>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4  justify-items-center">
            {products?.map((item) => (
              <Product key={item._id} item={item} />
            ))}
          </div>
          <div className="my-12 grid grid-cols-1 lg:grid-cols-2">
            <img
              src="https://cdn.tgdd.vn//GameApp/1461549//thumb-nail-800-450-800x450-1.jpg"
              alt=""
              className="w-full  flex-1 object-fill p-4 bg-[rgb(255,226,43)]"
            />
            <div className="bg-[#E3EDF6] py-4 lg:py-0 flex flex-col justify-center items-center gap-4">
              <p className="font-bold text-2xl lg:text-4xl text-slate-600 flex flex-col items-center">
                <span>Đừng bỏ lỡ sự ưu đãi</span>
                <span> hãy sở hữu ngay</span>
              </p>
              <button className="btn btn-outline btn-secondary hover:cursor-pointer">
                Mua ngay
              </button>
            </div>
          </div>
          <p className="text-2xl font-medium my-4 uppercase">
            Sản phẩm bán chạy
          </p>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4  justify-items-center">
            {bestSeller?.map((item) => (
              <Product key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
