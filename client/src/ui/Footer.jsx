import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Heading from "./Heading";

const StyledFooterLayout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5rem;
  margin-top:2rem;
`;

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  font-size:1.2rem;
  font-weight:550;

  & h4 {
    mrgin: 1.5rem 0;
  }
`;

const CopyRightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-top: 1px solid var(--color-grey-600);
  color: var(--color-grey-800);
`;

const Footer = () => {
  return (
    <>
      <StyledFooterLayout>
        <Logo />

        <FooterBox>
          <Heading as="h4">About us</Heading>
          <ul>
            <li>Products</li>
            <li>Foods</li>
            <li>Stays</li>
            <li>Bookings</li>
          </ul>
        </FooterBox>

        <FooterBox>
          <Heading as="h4">Jobs</Heading>
          <ul>
            <li>Checf</li>
            <li>Developers</li>
            <li>Drivers</li>
            <li>Manager</li>
          </ul>
        </FooterBox>
        <FooterBox>
          <Heading as="h4">Contact us</Heading>
          <ul>
            <li>Email:abdra5679@gmail.com</li>
            <li>Phone:0093766753168</li>
            <li>WhatsApp:0093766753168</li>
            <li>Facebook: STAY HERE</li>
          </ul>
        </FooterBox>
      </StyledFooterLayout>

      <CopyRightBox>CopyRight &copy; 2025 StayHere.com</CopyRightBox>
    </>
  );
};

export default Footer;
