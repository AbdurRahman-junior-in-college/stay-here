import styled from "styled-components";

const TextArea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  color:var(--color-grey-600);
  background-color:var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 5rem;
  font-size: 1rem;
  resize: none;
`;

export default TextArea;
