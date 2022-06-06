import { useUserStore } from "$lib/store";
// import { useUserStore } from "$lib/store";
import { Container, LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AuthLayout() {
  // const location = useLocation();
  // const navigate = useNavigate();
  // // const user = useUserStore((store) => store.user);

  // const [{ data, fetching, error }, fetch] = useMeQuery({
  //   pause: true,
  //   context: {
  //     suspense: false,
  //     requestPolicy: "network-only",
  //     preferGetMethod: true,
  //   },
  // });

  // useEffect(fetch, []);

  // useEffect(() => {
  //   if (error?.message !== "Unauthorized") {
  //     navigate("/", { state: location });
  //   }
  // }, [navigate, error]);

  // if (fetching) {
  //   return <LoadingOverlay visible />;
  // }

  // if (error?.message !== "Unauthorized") {
  //   return <></>;
  // }

  // useEffect(() => {
  //   const user = useUserStore.getState().user;
  //   if (user) {
  //     navigate("/", { state: location });
  //   }
  // }, []);

  return (
    <Container size={420} my={40}>
      <Outlet />
    </Container>
  );
}

export default AuthLayout;
