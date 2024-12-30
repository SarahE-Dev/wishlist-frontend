import { Navigate, useLocation } from "react-router-dom";
import { isValidToken } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!isValidToken()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;