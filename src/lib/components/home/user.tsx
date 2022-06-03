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

export default function UserProfile() {
  const [opened, setOpened] = useState(false);
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
        <Title order={6}>Rayat</Title>
        <Text>rayat@admin.com</Text>
        <Divider style={{ alignSelf: "stretch" }} />
        <Button variant="outline">Log out</Button>
      </Group>
    </Popover>
  );
}
