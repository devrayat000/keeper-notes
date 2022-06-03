import MyHeader from "$lib/components/home/header";
import { useMeQuery } from "$lib/graphql/generated";
import { AppShell, LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function HomeLayout() {
  // const location = useLocation();
  // const navigate = useNavigate();

  // const [{ data, fetching, error }, fetch] = useMeQuery({
  //   pause: true,
  //   context: { suspense: false, requestPolicy: "network-only" },
  // });

  // useEffect(fetch, []);

  // useEffect(() => {
  //   if (error?.message === "Unauthorized") {
  //     navigate("/login", { state: location });
  //   }
  // }, [error]);

  // if (fetching) {
  //   return <LoadingOverlay visible />;
  // }

  // if (error?.message === "Unauthorized") {
  //   return <></>;
  // }

  return (
    <AppShell header={<MyHeader />}>
      <Outlet />
    </AppShell>
  );
}

export default HomeLayout;
