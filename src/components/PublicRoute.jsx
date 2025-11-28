import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in, show login/register page
  return children;
}

export default PublicRoute;