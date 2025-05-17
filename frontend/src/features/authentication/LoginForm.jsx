import React from "react";
import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import LoaderMini from "../../ui/LoaderMini";
import { useLogin } from "./useLogin";

const LoginForm = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const { adminLogin, isLoging } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password || !email) return;
    adminLogin(
      { password, email },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleLogin}>
      <FormRowVertical lable="Email adress">
        <Input
          type={"email"}
          id={"email"}
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical lable="Password">
        <Input
          type={"password"}
          id={"password"}
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button type="submit">{!isLoging ? "Login" : <LoaderMini />}</Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
