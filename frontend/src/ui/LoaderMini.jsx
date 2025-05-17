import styled, { keyframes } from "styled-components";
import "./Loader.css";

const rotate = keyframes`
from {
  rotate: 0deg;
} to {
  rotate: 360deg;
}
`;

const StyledLoader = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 2px solid var(--color-brand-600);
  border-color: var(--color-brand-600) var(--color-grey-0);
`;

const LoaderMini = () => {
  return <StyledLoader className="my-loader"></StyledLoader>;
};

export default LoaderMini;
