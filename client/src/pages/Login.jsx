import React from "react";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
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
`;


const CenterLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  const [state, setState] = useState("Login");

  return (
    <>
      <LoginLayOut>
        <CenterLogo>
          <Logo />
        </CenterLogo>
        <Heading type="h3">{state} to your account</Heading>
        <LoginForm state={state} setState={setState} />
      </LoginLayOut>
    </>
  );
};

export default Login;
