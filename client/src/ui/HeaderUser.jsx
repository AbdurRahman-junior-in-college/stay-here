import styled from "styled-components";

const StyledHeaderUser = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

import React from "react";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";

const HeaderUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const authenticated = Boolean(token);
  return (
    <StyledHeaderUser>
      <li>
        <ButtonIcon
          onClick={() => {
            authenticated ? navigate("/account") : navigate("/auth");
          }}
        >
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderUser>
  );
};

export default HeaderUser;
