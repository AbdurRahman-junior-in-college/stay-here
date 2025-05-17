import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import LoaderMini from "../../ui/LoaderMini";
import { useLogin } from "./useLogin";
import { useRegister } from "./useRegister";

const StyledP = styled.p`
  & a {
    color: var(--color-blue-700);
    cursor: pointer;
  }
`;

const LoginForm = ({ state, setState }) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [country, setCountry] = useState("");
  const [nationalId, setNationalId] = useState("");

  const { userRegister, isLoading } = useRegister();
  const { userLogin, isLoging } = useLogin();
  const handleLogin = (e) => {
    e.preventDefault();

    if (state === "Register") {
      if (!password || !email || !name || !country || !nationalId) return;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("country", country);
      formData.append("nationalId", nationalId);
      userRegister(formData, {
        onSuccess: () => {
          setPassword("");
          setName("");
          setEmail("");
          setCountry("");
          setNationalId("");
          setState("Login")
        },
      });
    } else if (state === "Login") {
      if (!password || !email) return;
      const formData = new FormData();
      formData.append("password", password);
      formData.append("email", email);

      userLogin({ email, password });
    } else {
      return;
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {state === "Register" && (
        <FormRowVertical lable="Full Name">
          <Input
            type={"text"}
            id={"name"}
            value={name}
            autoComplete="full-name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormRowVertical>
      )}
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
      {state === "Register" && (
        <FormRowVertical lable="Region info">
          <Input
            type={"text"}
            id={"country"}
            value={country}
            autoComplete="country"
            placeholder="country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            type={"text"}
            id={"nationa-id"}
            value={nationalId}
            placeholder="National Id..."
            autoComplete="nationa-id"
            onChange={(e) => setNationalId(e.target.value)}
          />
        </FormRowVertical>
      )}

      <FormRowVertical>
        {/* {!isLoging ? "Login" : <LoaderMini />} */}
        <Button size="large">{state}</Button>
      </FormRowVertical>
      <StyledP>
        Register yourself before login{" "}
        {state === "Login" ? (
          <a onClick={() => setState("Register")}>Register</a>
        ) : (
          <a onClick={() => setState("Login")}>Login</a>
        )}
      </StyledP>
    </Form>
  );
};

export default LoginForm;
