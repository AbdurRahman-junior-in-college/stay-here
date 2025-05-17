import styled from "styled-components";

const StyledErrorFallback = styled.div`
  height: 100vh;
  background-color: var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p{
    color: var(--color-grey-500);
    margin-bottom: 3.6rem;
  }
`;

import React from "react";
import Heading from "./Heading";
import GlobalStyles from "../styles/globleStyles";
import Button from "./Button";

const ErrorFallBack = ({ error, resetErrorBoundary }) => {
  return (
    <>
    <GlobalStyles />
    <StyledErrorFallback>
      <Box>
        <Heading as="h1">Something went wrong</Heading>
        <p>{error.message}</p>
        <Button size="large" onClick={resetErrorBoundary}>Try agian</Button>
      </Box>
    </StyledErrorFallback>
    </>
  );
};

export default ErrorFallBack;
