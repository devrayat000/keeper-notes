import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validate as isEmail } from "is-it-email";
import { useMutation, graphql } from "react-relay";

import { useUserStore } from "$lib/store";
import { loginMutation } from "./__generated__/loginMutation.graphql";

const LOGIN_MUTATION = graphql`
  mutation loginMutation($input: LoginInput!) {
    login(loginInput: $input) {
      id
      email
      name
      displayMode
      darkMode
    }
  }
`;

export default function LoginPage() {
  const { getInputProps, onSubmit, reset, errors } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules: {
      email: (val) => isEmail(val),
      password: (val) => val.length >= 8 && val.length <= 32,
    },
    errorMessages: {
      email: "Invalid Emali!",
      password: "Invalid Password!",
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  // const [, login] = useLoginMutation();
  const [login, isInFlight] = useMutation<loginMutation>(LOGIN_MUTATION);
  const setUser = useUserStore((store) => store.setUser);

  const loginHandler = onSubmit(async (data) => {
    login({
      variables: { input: data },
      onCompleted(response, errors) {
        setUser(response.login ?? null);
        reset();
        if (response) {
          navigate("/", { state: location });
        }
      },
    });
  });

  return (
    <>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor<typeof Link> to="/register" size="sm" component={Link}>
          Create account
        </Anchor>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        component="form"
        onSubmit={loginHandler}
      >
        <TextInput
          label="Email"
          placeholder="john@doe.com"
          type="email"
          name="email"
          required
          {...getInputProps("email")}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          name="password"
          {...getInputProps("password")}
          error={errors.password}
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor<"a">
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" type="submit" loading={isInFlight}>
          Log in
        </Button>
      </Paper>
    </>
  );
}
