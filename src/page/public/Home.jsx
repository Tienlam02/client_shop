import Loading from "../../components/Loading";
import { CiDiscount1 } from "react-icons/ci";
import { RiRefund2Line } from "react-icons/ri";
import { MdSupportAgent } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { useEffect, useState } from "react";
import { apiGetProducts } from "../../api/product";
import Product from "../../components/Product";
import { apiGetBlogs } from "../../api/blog";
import { Link } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const fetch = async () => {
    setIsLoading(true);
    const [res, res1, res2, res3] = await Promise.all([
      apiGetProducts({ limit: 8, sort: "-createdAt" }),
      apiGetProducts({ limit: 8, sort: "-sold" }),
      apiGetBlogs({ limit: 3, sort: "-createdAt" }),
      apiGetBlogs({ limit: 1, sort: "createdAt" }),
    ]);
    setIsLoading(false);
    setProducts(res.products);
    setBestSeller(res1.products);
    setBlogs(res2.blogs);
    setBlog(res3.blogs);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="  rounded-md">
          <div className="w-full my-4  bg-[#e3edf6] grid grid-cols-1 lg:grid-cols-2 ">
            <img
              src="https://shopify-xrh7.onrender.com/hero.png"
              alt=""
              className="w-full  flex-1 object-fill p-4   "
            />
            <div className="  py-4 lg:py-0 flex flex-col lg:justify-center items-center gap-4">
              <p className="font-bold text-2xl lg:text-4xl text-slate-600 flex flex-col items-center">
                <span>Siêu sale giữa tháng</span>
                <span> Laptop sale nửa giá</span>
              </p>
              <button className="btn btn-outline btn-secondary hover:cursor-pointer">
                Mua ngay
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4  gap-2 mb-8">
            <div className="flex bg-gray-100 py-6 px-4 gap-2 items-center lg:justify-center    ">
              <TbTruckDelivery size={36} />
              <div>
                <p className="font-medium text-lg">CHÍNH SÁCH GIAO HÀNG</p>
                <p className="text-gray-600 text-sm">
                  Nhận hàng và thanh toán tại nhà
                </p>
              </div>
            </div>
            <div className="flex bg-gray-100 py-6 px-4 gap-2 items-center lg:justify-center    ">
              <RiRefund2Line size={36} />
              <div>
                <p className="font-medium text-xl">ĐỔI TRẢ DỄ DÀNG</p>
                <p className="text-gray-600 text-sm">1 đổi 1 trong 15 ngày</p>
              </div>
            </div>
            <div className="flex bg-gray-100 py-6 px-4 gap-2 items-center lg:justify-center    ">
              <CiDiscount1 size={36} />
              <div>
                <p className="font-medium text-xl">THANH TOÁN TIỆN LỢI</p>
                <p className="text-gray-600 text-sm">
                  Trả tiền mặt, CK, trả góp 0%
                </p>
              </div>
            </div>
            <div className="flex bg-gray-100 py-6 px-4 gap-2 items-center lg:justify-center    ">
              <MdSupportAgent size={36} />
              <div>
                <p className="font-medium text-xl">HỖ TRỢ NHIỆT TÌNH</p>
                <p className="text-gray-600 text-sm">
                  Tư vấn, giải đáp mọi thắc mắc
                </p>
              </div>
            </div>
          </div>
          <p className="text-2xl flex justify-center font-medium my-4 uppercase">
            Sản phẩm mới về
          </p>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4  justify-items-center">
            {products?.map((item) => (
              <Product key={item._id} item={item} />
            ))}
          </div>
          <div className="flex"> </div>
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
          <div className="my-4">
            <img
              src="https://samcenter.vn/images/uploaded/Image%20product/Artboard%202.png"
              alt=""
              className="w-full"
            />
          </div>
          <p className="mt-4 text-xl font-medium uppercase">Tin tức</p>
          <div className="grid lg:grid-cols-6 gap-4 mt-4">
            <div className=" grid lg:grid-cols-5 lg:col-span-4 gap-4   ">
              {blog?.map((blog) => (
                <div key={blog._id} className="lg:col-span-2 space-y-3">
                  <img src={blog.image} alt="" className="w-full" />

                  <p className="text-base font-bold">
                    <Link to={`/blog/${blog._id}`}>{blog.name}</Link>
                  </p>
                  <div
                    className=" text-sm text-[#232323] line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: blog?.desc }}
                  />
                </div>
              ))}
              <div className="lg:col-span-3 space-y-4">
                {blogs?.map((item) => (
                  <div className="flex gap-3 items-center" key={item._id}>
                    <div className="w-[25%]">
                      <img src={item?.image} alt="" className="w-full" />
                    </div>
                    <div className="w-[75%]">
                      <Link to={`/blog/${item?._id}`}>
                        <p className="text-base font-bold">{item?.name}</p>
                      </Link>
                      <div
                        className=" text-sm text-[#232323] line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item?.desc }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="w-full">
                <img
                  src="https://ducvietco.com/mediacenter/media/images/346/video/s500_500/585_1687228718_3366491112e11856.jpg"
                  alt=""
                  className="w-full"
                />
              </div>
              <a
                href="https://youtu.be/LoWQrxuoi44?si=hX8ALLqf4LZ6Xjrx"
                target="_blank"
              >
                <p className="text-gray-950 font-medium">
                  VIDEO TRẢI NGHIỆM MÁY GAME XỊN NHẤT 2023 !
                </p>
              </a>
            </div>
          </div>
          <div className="bg-slate-100 mt-8 rounded-md text-[#333131] py-8">
            <div className="flex flex-col items-center gap-4   ">
              <p className="font-bold text-3xl">ĐỊA CHỈ BÁN THIẾT BỊ</p>
              <p className="font-medium text-base">
                UY TÍN - TIN CẬY- GIÁ RẺ #1 – TienLamShop.VN
              </p>
            </div>
            <p className="font-medium text-base mt-2 ml-1 lg:ml-4">
              Lợi ích khi mua sản phẩm tại TIEN LAM SHOP{" "}
            </p>
            <div className="w-[97%] ml-auto">
              <p>
                1.
                <span className="font-medium"> Giá thành luôn tốt nhất: </span>
                <span className="text-base">
                  (chúng tôi có chi phí thấp nhất), nơi mang tới chi tiêu thấp
                  nhất/1 đơn hàng
                </span>
              </p>
              <p>
                2.<span className="font-medium"> Hàng hóa đảm bảo: </span>
                <span className="text-base">
                  được kiểm tra chuyên sâu và đánh giá kỹ lưỡng về chất lượng,
                  được bán ra với các cam kết bán hàng cụ thể và an toàn nhất
                  cho khoản đầu tư của khách hàng.
                </span>
              </p>
              <p>
                3.
                <span className="font-medium">
                  {" "}
                  Khuyến mãi hấp dẫn, thiết thực
                </span>
              </p>
              <p>
                4.<span className="font-medium"> Có bản quyền: </span>
                <span className="text-base">
                  Windows bản quyền, office bản quyền giảm giá.
                </span>
              </p>
              <p>
                5.
                <span className="font-medium"> Hỗ trợ tư vấn online 24/7:</span>
                <span className="text-base">
                  {" "}
                  Với đội ngũ nhân viên tư vấn chuyên sâu, thấu đáo nhu cầu
                  khách, yếu tố <strong>trung thực</strong> và{" "}
                  <strong>trách nhiệm</strong> được đặt lên hàng đầu.
                </span>
              </p>
              <p>
                6.
                <span className="font-medium">
                  {" "}
                  Trải nghiệm những sản phẩm cao cấp nhất:{" "}
                </span>
                <span className="text-base">
                  Cập nhật và kinh doanh laptop... thuộc phân khúc cao cấp, tốt
                  nhất, mới nhất, các dòng máy chuyên dùng cho công việc.
                </span>
              </p>
              <p>
                7.
                <span className="font-medium">
                  {" "}
                  Chỉ bán phân khúc máy tốt:{" "}
                </span>
                <span className="text-base">
                  Với 11 năm kinh nghiệm về sản phẩm, chung tôi tự tin mang tới
                  những sản phẩm tốt nhất cho khách hàng.
                </span>
              </p>
              <p>
                8.
                <span className="font-medium">
                  {" "}
                  Hỗ trợ kỹ thuật nhanh chóng và chuyên sâu:{" "}
                </span>
                <span className="text-base">
                  Với trung tâm bảo hành riêng WinCare.Vn luôn tục trực và sát
                  cánh cùng khách hàng.
                </span>
              </p>
              <p>
                9.
                <span className="font-medium"> Giảm giá linh kiện: </span>
                <span className="text-base">
                  Khi nâng cấp, phần mềm mua thêm tới 20%
                </span>
              </p>
              <p>
                10.
                <span className="font-medium"> Bảo hành đảm bảo: </span>
                <span className="text-base">
                  12 tháng tới 24 tháng, luôn có người sát cánh hỗ trợ, không bị
                  bỏ rơi.
                </span>
              </p>
              <p>
                11.
                <span className="font-medium">
                  {" "}
                  Luôn tạo điều kiện cho khách hàng:{" "}
                </span>
                <span className="text-base">
                  Hỗ trợ đổi máy, đổi ý{" "}
                  <strong>
                    nhằm giúp khoản đầu tư của khách hàng là đúng đắn nhất, mang
                    lại lợi ích cao nhất
                  </strong>
                </span>
              </p>
              <p>
                12.
                <span className="font-medium">
                  {" "}
                  Địa chỉ mua bán và hỗ trợ khách hàng rõ ràng:{" "}
                </span>
                <span className="text-base">
                  luôn túc trực mở cữa 16h mỗi ngày (cả thứ 7 & chủ nhật ) để hỗ
                  trợ và giúp đỡ khách hàng
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm lg:text-xl font-medium line-clamp-1">
              HÌNH ẢNH KHÁCH HÀNG VÀ CÁC HOẠT ĐỘNG TẠI LAPTOP
            </p>
            <div className="grid lg:grid-rows-2 gap-4">
              <div className=" grid lg:grid-cols-4 row-span-1 gap-4 mt-4">
                <img
                  className="col-span-1 w-full"
                  src="https://laptoplc.com.vn/wp-content/uploads/2022/10/dfasd-ad.jpg"
                  alt=""
                />
                <img
                  className="col-span-1 w-full"
                  src=" https://laptoplc.com.vn/wp-content/uploads/2021/10/15-2-300x225.jpg"
                  alt=""
                />
                <img
                  className="col-span-1 w-full"
                  src=" https://laptoplc.com.vn/wp-content/uploads/2021/03/133589828_3614108262007987_7513051446609369326_n-300x225.jpg"
                  alt=""
                />
                <img
                  className="col-span-1 w-full"
                  src=" https://laptoplc.com.vn/wp-content/uploads/2022/10/f0b74574b2dc7a8223cd-1-300x225.jpg"
                  alt=""
                />
              </div>
              <div className=" grid lg:grid-cols-4 row-span-1 gap-4  ">
                <img
                  className="col-span-1 w-full"
                  src="https://laptoplc.com.vn/wp-content/uploads/2022/10/dfasd-ad.jpg"
                  alt=""
                />
                <img
                  className="col-span-1 w-full"
                  src=" https://laptoplc.com.vn/wp-content/uploads/2021/10/IMG_0022-6-300x225.jpg"
                  alt=""
                />
                <img
                  className="col-span-1 w-full"
                  src=" https://laptoplc.com.vn/wp-content/uploads/2021/03/133589828_3614108262007987_7513051446609369326_n-300x225.jpg"
                  alt=""
                />
                <img
                  className="col-span-1 w-full"
                  src=" https://laptoplc.com.vn/wp-content/uploads/2022/10/1-1-300x225.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="bg-[#202C43] flex flex-col items-center py-8 gap-4 mt-4 mb-8">
            <p className="text-white text-base lg:text-xl text-center font-medium px-2">
              ĐĂNG KÝ NHẬN EMAIL THÔNG BÁO KHUYẾN MẠI HOẶC ĐỂ ĐƯỢC TƯ VẤN MIỄN
              PHÍ
            </p>
            <div className="join">
              <input
                className="input w-[40vw] input-bordered join-item"
                placeholder="Nhập email hoặc số điện thoại"
              />
              <button className="btn join-item rounded-sm lg:px-12">Gửi</button>
            </div>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default Home;
