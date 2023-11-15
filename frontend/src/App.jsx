import { Routes, Route, Navigate } from "react-router-dom";
import { AdminDashboard, UserDashboard, Auth } from "@/layouts";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route exact path="/admin/*" element={<AdminDashboard />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route exact path="/user/*" element={<UserDashboard />} />
      </Route>

      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
