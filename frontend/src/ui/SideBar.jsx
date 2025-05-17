import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyleSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grye-100);
  grid-row: 1 / -1;

  display:flex;
  flex-direction: column;
  gap:1.3rem;
`;
const SideBar = () => {
  return <StyleSideBar>
    <Logo />
    <MainNav />
  </StyleSideBar>;
};

export default SideBar;
