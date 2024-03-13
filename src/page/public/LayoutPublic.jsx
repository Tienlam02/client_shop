import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className=" ">
          <Navbar />
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
