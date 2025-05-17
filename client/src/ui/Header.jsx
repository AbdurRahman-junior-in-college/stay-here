import React from "react";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import HeaderUser from "./HeaderUser";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";
import Logo from "./Logo";

const StyleHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-200);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
`;

const StyledRight = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <StyleHeader>
      <Logo />
      <HeaderMenu />
      <StyledRight>
        <UserAvatar />
        <DarkModeToggle />
        <HeaderUser />
      </StyledRight>
    </StyleHeader>
  );
};

export default Header;
