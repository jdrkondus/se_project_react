import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  const token = localStorage.getItem("jwt");

  if(!isLoggedIn && !token) {
    return <Navigate to="/signin" replace />;
  }
  if (!isLoggedIn && token) {
    return null;
  }
  if (isLoggedIn || token) {
    return children;
  }
  return <Navigate to="/signin" replace />;
}
export default ProtectedRoute;