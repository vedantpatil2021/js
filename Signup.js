import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { NumberInput, TextInput, Button, Box, Group, Select } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { OtpContext } from "./context.js";
import { useContext, useState } from "react";
import "./Signup.css";

const schema = z.object({
  name: z.string().max(20, { message: "Name should have atmost 20 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 to create an account" }),
  username: z.string().min(6, { message: "Invalid Username" }),
  password: z
    .string()
    .min(6, { message: "Password length should be min 6 characters" }),
});

function Signup() {
  let Navigate = useNavigate();
  const { userId, setUserId } = useContext(OtpContext);

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "",
      surname: "",
      email: "",
      age: 18,
      username: "",
      password: "",
    },
  });

  async function signUp(values) {
    console.log(values);
    document.getElementById('nextbtn').click();

    const result = await fetch("http://localhost:5000/user/create_user", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await result.json();
    console.log(data);
    setUserId({
      userId: data.data.userId,
    });
    Navigate("/otpvr", { replace: true });
  }

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form
        className="form"
        onSubmit={form.onSubmit((values) => signUp(values))}
      >
        <div className="row">
          <TextInput
            required
            className=" col-md-6"
            label="Name"
            placeholder="Enter your Name"
            mt="sm"
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            className=" col-md-6"
            label="Surname"
            placeholder="Enter your Surname"
            {...form.getInputProps("surname")}
            
          />
        </div>
        <div className="row">
          <NumberInput
            required
            className=" col-md-6"
            label="Age"
            placeholder="Your age"
            mt="sm"
            {...form.getInputProps("age")}
          />
          <TextInput
            required
            className=" col-md-6"
            label="Email"
            placeholder="Enter your Email"
            {...form.getInputProps("email")}
          />
        </div>
        <div className="row">
          <TextInput
            required
            className=" col-md-6"
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            required
            className=" col-md-6"
            label="Your password"
            placeholder="Your password"
            {...form.getInputProps("password")}
          />
        </div>
        <Group position="center" mt="xl">
          <div className="flex items-center">
            <Button type="submit">Sign Up</Button>
          </div>
        </Group>
      </form>
    </Box>
  );
}

export default Signup;
