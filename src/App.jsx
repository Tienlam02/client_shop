import { Routes, Route } from "react-router-dom";
import LayoutPublic from "./page/public/LayoutPublic";
import Home from "./page/public/Home";
import About from "./page/public/Shop";
import Login from "./page/public/Login";
import Register from "./page/public/Register";
import Cart from "./page/user/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./page/user/CheckOut";
import PrivateLayoutAdmin from "./page/admin/PrivateLayoutAdmin";
import DashBoard from "./page/admin/DashBoard";
import NotFound from "./page/public/NotFound";
import CreateProduct from "./page/admin/CreateProduct";
import ListProduct from "./page/admin/ListProduct";
import ListOrder from "./page/admin/ListOrder";
import Order from "./page/user/Order";
import Shop from "./page/public/Shop";
import ProductDetail from "./page/public/ProductDetail";
import ListUser from "./page/admin/ListUser";
import CreateBlog from "./page/admin/CreateBlog";
import Blog from "./page/public/Blog";
import BlogDetail from "./page/public/BlogDetail";
import ListBLog from "./page/admin/ListBLog";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPublic />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="order" element={<Order />} />
          <Route path="product/:cate/:id" element={<ProductDetail />} />
          <Route path="blog/:id" element={<BlogDetail />} />
        </Route>
        <Route path="/admin" element={<PrivateLayoutAdmin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="list-product" element={<ListProduct />} />
          <Route path="list-order" element={<ListOrder />} />
          <Route path="list-user" element={<ListUser />} />
          <Route path="list-blog" element={<ListBLog />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
