import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
if(
    !isAuthenticated &&
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/signup"
    ) {
        return <Navigate to="/login" replace />;
    }
    return children;
    } else {
    return null;
    }
};

export default ProtectedRoute;

