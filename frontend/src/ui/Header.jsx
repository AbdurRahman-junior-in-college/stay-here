import React from "react";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";

const StyleHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-200);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;
const Header = () => {
  return (
    <StyleHeader>
      <UserAvatar />
      <DarkModeToggle />
      <HeaderMenu />
    </StyleHeader>
  );

};

export default Header;
