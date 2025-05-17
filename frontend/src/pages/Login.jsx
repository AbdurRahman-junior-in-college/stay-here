import React from "react";
import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayOut = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;
const CenterLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  return (
    <LoginLayOut>
      <CenterLogo>
        <Logo />
      </CenterLogo>
      <Heading type="h4">Login to your account</Heading>
      <LoginForm />
    </LoginLayOut>
  );
};

export default Login;
