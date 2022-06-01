import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Create New Account!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor<typeof Link> to="/auth/login" size="sm" component={Link}>
          Log in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Full Name" placeholder="John Doe" required />
        <TextInput
          label="Email"
          placeholder="john@doe.com"
          type="email"
          required
          mt="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Checkbox mt="md" label="I accept the Terms & Conditions." />
        <Button fullWidth mt="xl">
          Sign up
        </Button>
      </Paper>
    </>
  );
}
