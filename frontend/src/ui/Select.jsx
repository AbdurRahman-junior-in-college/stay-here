import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px sold
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

import React from "react";

const Select = ({ options, value, onChange, ...props }) => {
  return (
    <StyledSelect value={value} {...props} onChange={onChange}>
      {options.map((option, i) => (
        <option value={option.value} key={i}>
          {option.lable}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
