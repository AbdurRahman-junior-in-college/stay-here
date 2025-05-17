import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  color: var(--color-brand-600);
  background-color: var(--color-grey-100);
  text-align: center;
  line-height: 10rem;
`;

const Logo = () => {
  return <StyledLogo>Logo</StyledLogo>;
};

export default Logo;
