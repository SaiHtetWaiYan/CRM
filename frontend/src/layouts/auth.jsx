import { Routes, Route, Navigate } from "react-router-dom";
import routes from "@/routes/auth-routes";
import { useStateContext } from "@/context/ContextProvider";
export function Auth() {
  const { token, user } = useStateContext();
  if (token && user.role === "admin") {
    return <Navigate to="/admin/home" replace />;
  } else if (token && user.role === "user") {
    return <Navigate to="/user/home" replace />;
  }
  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
