import { Navigate, useLocation } from "react-router-dom";
import { isValidToken } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
    //  If no token navigate to login
  if (!isValidToken()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivateRoute;