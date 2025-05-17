import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
font-size:3rem;
font-weight: 600;
font-family: 'sans-serif';
color: var(--color-grey-800);
cursor:pointer;
`

const Logo = () => {
  return <StyledLogo>Stay Here</StyledLogo>;
};

export default Logo;
