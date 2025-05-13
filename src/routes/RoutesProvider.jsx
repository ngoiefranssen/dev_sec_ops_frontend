import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/welcome/LoginPage";
import NotFound from '../pages/NotFoundPage';
import { AppLayout } from "@/components/app/AppLayout";
import Homepage from "@/pages/HomePage";
import DashboardGlobalPage from "@/pages/dashboard/DashboardGlobalPage";
import { ProtectedRoute } from "./ProtectedRouter";

import utilisateurs_routes from "./administrations/utilisateurs_routes";
import profils_routes from "./administrations/profils_routes";
import roles_routes from "./administrations/roles_routes";
import auth_routes from "./auth_routes";
import ForbiddenPage from "@/pages/ForbiddenPage";

export default function RoutesProvider() {
  return (
    <Routes>

      <Route index element={<Homepage />} />

      <Route path="/" element={< AppLayout />}>
        {auth_routes}
        {utilisateurs_routes}
        {profils_routes}
        {roles_routes}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardGlobalPage /></ProtectedRoute>} />
        <Route path="/forbidden" element={<ProtectedRoute><ForbiddenPage /></ProtectedRoute>} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
