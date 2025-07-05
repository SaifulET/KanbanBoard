import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated ,loading} = useAuth();
  console.log(isAuthenticated)
  return isAuthenticated && !loading ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
