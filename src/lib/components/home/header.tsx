import {
  ActionIcon,
  Avatar,
  Burger,
  Group,
  Header,
  MediaQuery,
  TextInput,
  Title,
} from "@mantine/core";
import { loadQuery } from "react-relay";
import {
  Sun,
  Moon,
  LayoutGrid,
  LayoutList,
  UserCircle,
  Search,
} from "tabler-icons-react";

import { ThemeToggle } from "./toggle";
import UserProfile, { USER_QUERY } from "./user";
import environment from "$lib/services/environment";
import { type userQuery } from "./__generated__/userQuery.graphql";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const preloadedQuery = loadQuery<userQuery>(
  environment,
  USER_QUERY,
  {},
  { fetchPolicy: "store-or-network" }
);

const MyHeader = () => {
  return (
    <Header height={70} p="md" px="xl">
      <Group spacing={140}>
        <Group>
          <Burger
            opened={false}
            // onClick={}
            size="sm"
            // color={theme.colors.gray[6]}
            mr="xl"
          />

          <Title order={3} color="primaryColor">
            keeper
          </Title>
        </Group>

        <TextInput
          placeholder="Search"
          type="search"
          icon={<Search />}
          size="md"
          style={{ flexGrow: 1 }}
        />

        <Group spacing="xl">
          <ThemeToggle />
          <ActionIcon>
            <LayoutGrid />
          </ActionIcon>
          <ErrorBoundary fallbackRender={({ error }) => <>{error.message}</>}>
            <Suspense fallback={"Loading..."}>
              <UserProfile preloadedQuery={preloadedQuery} />
            </Suspense>
          </ErrorBoundary>
        </Group>
      </Group>
    </Header>
  );
};

export default MyHeader;
