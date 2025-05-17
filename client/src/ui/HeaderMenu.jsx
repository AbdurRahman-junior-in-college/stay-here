import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const StyledLink = styled(NavLink)`
  font-size: 17px;
  font-weight: 500;
  padding: 0.5rem 2rem;
  border-radius: var(--border-radius-lg);
  transition: all 0.5s;
  cursor: pointer;

  &.active {
    background-color: var(--color-blue-700);
    color: var(--color-grey-0);
  }

  &:hover {
    background-color: var(--color-blue-700);
    color: var(--color-grey-0);
  }
`;

const HeaderMenu = () => {
  const options = ["Home", "About", "Contact", "Cabins"];

  return (
    <StyledHeaderMenu>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/about">About</StyledLink>
      <StyledLink to="/cabins">Cabins</StyledLink>
      <StyledLink to="/contact">Contact</StyledLink>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
