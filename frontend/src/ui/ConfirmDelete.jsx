import styled from "styled-components";

const StyledConfirmDelete = styled.div`
  padding: 2rem 1.4rem;
  width: 30vw;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const StyledDiv = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

import React from "react";
import Heading from "./Heading";
import Button from "./Button";

export const ConfirmDelete = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) => {
  return (
    <StyledConfirmDelete>
      <Heading as={"h3"}>Delete {resourceName}</Heading>
      <p>
        Are you sure to delete this {resourceName} permenantly? this action
        cannot be undone
      </p>
      <StyledDiv>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </StyledDiv>
    </StyledConfirmDelete>
  );
};
