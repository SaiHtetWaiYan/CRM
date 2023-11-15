import { Routes, Route } from "react-router-dom";
import { Sidenav, DashboardNavbar, Footer } from "@/widgets/layout";
import adminRoutes from "@/routes/admin-routes";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={adminRoutes} brandImg="/img/logo.png" />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />

        <Routes>
          {adminRoutes.map(
            ({ layout, pages }) =>
              layout === "admin" &&
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

export default AdminDashboard;
