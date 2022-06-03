import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "tabler-icons-react";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon onClick={() => toggleColorScheme()}>
      {colorScheme === "dark" ? <Sun /> : <Moon />}
    </ActionIcon>
  );
}
