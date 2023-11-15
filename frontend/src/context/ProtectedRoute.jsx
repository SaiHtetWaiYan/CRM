import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./ContextProvider";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useStateContext();
  const role = user?.role;
  const hasAllowedRole = allowedRoles.includes(role);

  return token && hasAllowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/sign-in" replace />
  );
};

export default ProtectedRoute;
