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
import {
  Sun,
  Moon,
  LayoutGrid,
  LayoutList,
  UserCircle,
  Search,
} from "tabler-icons-react";
import { ThemeToggle } from "./toggle";
import UserProfile from "./user";

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
          <UserProfile />
        </Group>
      </Group>
    </Header>
  );
};

export default MyHeader;
