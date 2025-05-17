import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  height: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

import React from "react";
import { useUserProfile } from "../features/authentication/useUserProfile";
import { host } from "../utils/constants";
// import { useAdmin } from "../features/authentication/useAdmin";

const UserAvatar = () => {
  // const { admin } = useAdmin();
  const { user } = useUserProfile();
 
  return (
    <StyledUserAvatar>
      <Avatar src={`${host}/images/${user?.image}` || ""} alt="User" />
      <span>{user?.name}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
