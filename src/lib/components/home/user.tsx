import { useState } from "react";
import {
  Popover,
  Text,
  Image,
  ActionIcon,
  Avatar,
  Title,
  Group,
  Divider,
  Button,
} from "@mantine/core";
import { UserCircle } from "tabler-icons-react";
import { graphql } from "relay-runtime";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";

import { type userQuery } from "./__generated__/userQuery.graphql";
import Logout from "./logout";

export const USER_QUERY = graphql`
  query userQuery {
    me {
      id
      name
      email
    }
  }
`;

interface UserProfileProps {
  preloadedQuery: PreloadedQuery<userQuery>;
}

export default function UserProfile({ preloadedQuery }: UserProfileProps) {
  const [opened, setOpened] = useState(false);
  const { me } = usePreloadedQuery<userQuery>(USER_QUERY, preloadedQuery);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon onClick={() => setOpened((o) => !o)}>
          <UserCircle />
        </ActionIcon>
      }
      width={260}
      position="bottom"
      placement="end"
      transition="pop-top-right"
      withCloseButton
      withArrow
    >
      <Group direction="column" align="center" spacing="sm">
        <Avatar radius="xl" size="lg" />
        <Title order={6}>{me.name}</Title>
        <Text>{me.email}</Text>
        <Divider style={{ alignSelf: "stretch" }} />
        <Logout />
      </Group>
    </Popover>
  );
}
