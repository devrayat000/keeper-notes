import { useUserStore } from "$lib/store";
import { Container } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserStore((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/", { state: location });
    }
  }, [navigate, user]);

  return (
    <Container size={420} my={40}>
      <Outlet />
    </Container>
  );
}

export default AuthLayout;
