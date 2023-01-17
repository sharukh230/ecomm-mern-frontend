import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user} = useSelector((state) => state.user);

  const navigate = useNavigate()


   if (!isAuthenticated) {
     navigate("/login");
    }


  return children
};

export default ProtectedRoute;