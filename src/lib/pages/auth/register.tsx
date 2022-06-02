import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Button,
  InputWrapper,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { validate as isEmail } from "is-it-email";
import { useForm } from "@mantine/hooks";
import { useCreateAccountMutation } from "$lib/graphql/generated";

export function RegisterPage() {
  const { getInputProps, onSubmit, reset, errors } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      termsAndConditions: false,
    },
    validationRules: {
      name: (val) => val.length >= 6,
      email: (val) => isEmail(val),
      password: (val) => val.length >= 8 && val.length <= 32,
      termsAndConditions: (val) => val,
    },
    errorMessages: {
      name: "Name Too Short!",
      email: "Invalid Emali!",
      password: "Invalid Password!",
      termsAndConditions: "You must agree to our Terms & Conditions!",
    },
  });

  const [{ data }, createAccount] = useCreateAccountMutation();

  const registerHandler = onSubmit(async (data) => {
    await createAccount({ input: data }, { suspense: false });
    reset();
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
        Create New Account!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor<typeof Link> to="/login" size="sm" component={Link}>
          Log in
        </Anchor>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        component="form"
        onSubmit={registerHandler}
      >
        <TextInput
          label="Full Name"
          placeholder="John Doe"
          name="name"
          required
          {...getInputProps("name")}
          error={errors.name}
        />
        <TextInput
          label="Email"
          placeholder="john@doe.com"
          type="email"
          name="email"
          mt="md"
          required
          {...getInputProps("email")}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="********"
          required
          mt="md"
          name="password"
          {...getInputProps("password")}
          error={errors.password}
        />
        <InputWrapper error={errors.termsAndConditions}>
          <Checkbox
            mt="md"
            label="I accept the Terms & Conditions."
            name="terms-conditions"
            {...getInputProps("termsAndConditions", { type: "checkbox" })}
          />
        </InputWrapper>
        <Button fullWidth mt="xl" type="submit">
          Sign up
        </Button>
      </Paper>
    </>
  );
}
