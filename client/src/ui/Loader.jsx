import styled, { keyframes } from "styled-components";
import "./loader.css";

const rotate = keyframes`
from {
  rotate: 0deg;
} to {
  rotate: 360deg;
}
`;

const StyledLoader = styled.div`
  margin: 4.8rem auto;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  border: 18px solid var(--color-brand-600);
  border-color: var(--color-brand-600) var(--color-grey-0)
    var(--color-brand-100);
`;

const Loader = () => {
  return <StyledLoader className="my-loader"></StyledLoader>;
};

export default Loader;
