import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { useState } from "react";

const StyleSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  position: relative;
`;
const StyledArrowIcon = styled.span`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  background-color: var(--color-grey-50);
  position: absolute;
  top: 10%;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    color: var(--color-grey-900);
  }
`;

const SideBar = ({ isOpen }) => {
  return (
    <StyleSideBar isOpen={isOpen}>
      <StyledArrowIcon>
        <HiArrowLeft />
      </StyledArrowIcon>
      <Logo />
      <MainNav />
    </StyleSideBar>
  );
};

export default SideBar;
