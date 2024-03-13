import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { apiAuthAdmin } from "../../api/user";
import { useSelector, useDispatch } from "react-redux";
const PrivateLayoutAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, accessToken } = useSelector((state) => state.userSlice);
  const checkAdmin = async (accessToken) => {
    const res = await apiAuthAdmin(accessToken);
    console.log(res);
    if (res.success) {
      setIsAdmin(true);
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkAdmin(accessToken);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();
  return isAdmin ? <Outlet /> : <Loading />;
};

export default PrivateLayoutAdmin;
