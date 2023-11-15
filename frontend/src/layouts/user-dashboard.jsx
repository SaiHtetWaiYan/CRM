import { Routes, Route } from "react-router-dom";
import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
import userRoutes from "@/routes/user-routes";

export function UserDashboard() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={userRoutes} brandImg="/img/logo-ct-dark.png" />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />

        <Routes>
          {userRoutes.map(
            ({ layout, pages }) =>
              layout === "user" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
