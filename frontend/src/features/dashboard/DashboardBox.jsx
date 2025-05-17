import styled from "styled-components";

const DashboardBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 1.8rem;
  transition: all .3s
  & .recharts-line-lable-text {
    font-weight: 600;
  }
  & h1{
    margin-bottom: 1rem;
    font-family: 'sans-serif'
  }
`;

export default DashboardBox

