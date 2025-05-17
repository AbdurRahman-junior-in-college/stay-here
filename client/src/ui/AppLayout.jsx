import React, { useState } from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

const Main = styled.main`
  background-color: var(--color-grey-0);
`;

const StyledAppLayOout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledAppLayOout>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </StyledAppLayOout>
  );
};

export default AppLayout;
