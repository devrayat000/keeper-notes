import { Container } from "@mantine/core";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <Container size={420} my={40}>
      <Outlet />
    </Container>
  );
}

export default AuthLayout;
