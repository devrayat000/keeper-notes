import { Route, Routes, useLocation } from "react-router-dom";

function RoutesApp() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route index element={<h1>Hi</h1>} />
    </Routes>
  );
}

export default RoutesApp;
