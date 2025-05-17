import React from "react";
import styled from "styled-components";

const StyledTableOperation = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const TableOpperation = ({ children }) => {
  return <StyledTableOperation>{children}</StyledTableOperation>;
};

export default TableOpperation;
