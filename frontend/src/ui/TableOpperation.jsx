import React from "react";
import styled from "styled-components";

const StyledTableOperation = styled.div`
display: flex;
justify-content: space-between;
width:100%;
`;

const TableOpperation = ({ children }) => {
  return <StyledTableOperation>{children}</StyledTableOperation>;
};

export default TableOpperation;
