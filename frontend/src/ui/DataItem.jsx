import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--color-grey-700);
  font-size:1.4rem;
  margin-top:1rem;
  & p {
    color: var(--color-grey-900);
    font-size: 1.3rem;
    font-weight: 650;
  }
`;

import React from "react";

const DataItem = ({ icon, lable, children }) => {
  return (
    <StyledDataItem>
      {icon && icon}
      <label htmlFor={lable}>
        <p>{lable}</p>
      </label>
      {children}
    </StyledDataItem>
  );
};

export default DataItem;
