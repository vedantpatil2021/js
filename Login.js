import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { PasswordInput, TextInput, Button, Box, Group } from "@mantine/core";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  password: z.string().min(6, {
    message:
      "Password length should be min 6 characters and max 100 characters",
  }),
});



function Login() {
  let Navigate = useNavigate();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      username: "",
      password: "",
    },
  });

  async function login(values) {

    console.log(values);
  
    const result = await fetch("http://localhost:5000/user/login_user", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
    // Navigate("/", { replace: true });
  }

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => login(values))}>
        <TextInput
          className="user"
          required
          label="Username"
          placeholder="Username"
          mt="sm"
          {...form.getInputProps("username")}
        />

        <PasswordInput
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          required
          {...form.getInputProps("password")}
        />

        <div className="flex ">
          <input id="remember" type="checkbox" />
          <label for="remember">Remember</label>
          <a className="forgot " href="/">
            Forgot your password?
          </a>
        </div>

        <Group position="center" mt="xl">
          <Button  type="submit" >
            Submit
          </Button>
        </Group>

      </form>
    </Box>
  );
}

export default Login;
