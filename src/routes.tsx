import { Route, Routes, useLocation } from "react-router-dom";

import LoginPage from "$lib/pages/auth/login";
import { RegisterPage } from "$lib/pages/auth/register";
import AuthLayout from "$lib/pages/auth/__layout";

function RoutesApp() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route index element={<h1>Hi</h1>} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesApp;
