import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../api/product";
import { formatMoney } from "../helper/formatMoney";
import { Link } from "react-router-dom";

const SideBarBlog = () => {
  const [products, setProducts] = useState([]);

  const fectProducts = async () => {
    const res = await apiGetProducts({ limit: 6, sort: "-createdAt" });
    if (res.success) {
      setProducts(res.products);
    }
  };
  useEffect(() => {
    fectProducts();
  }, []);

  return (
    <div className="bg-[#faf9f9] shadow-xl rounded-md p-4 sticky top-1 overflow-y-auto">
      <p className=" py-2 text-lg uppercase bg-red-700 rounded-md text-white flex items-center justify-center">
        laptop mới đét
      </p>
      {products.map((item) => (
        <div key={item._id}>
          <div className="flex gap-4 items-center my-6 ">
            <div>
              <img
                src={item.image}
                className="size-20 rounded-full object-cover"
                alt=""
              />
            </div>
            <div>
              <p className="font-medium text-lg">
                <Link to={`/product/${item.category}/${item._id}`}>
                  {item.name}
                </Link>
              </p>
              <span className="font-semibold">{formatMoney(item.price)}</span>
            </div>
          </div>
          <hr className="my-2" />
        </div>
      ))}
    </div>
  );
};

export default SideBarBlog;
