import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import LoginPage from "$lib/pages/auth/login";
import { RegisterPage } from "$lib/pages/auth/register";
import AuthLayout from "$lib/pages/auth/__layout";
import HomeLayout from "$lib/pages/__layout";
import HomePage from "$lib/pages";

function RoutesApp() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default RoutesApp;
