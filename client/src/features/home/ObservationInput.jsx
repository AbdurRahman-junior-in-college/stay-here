import React from "react";
import styled from "styled-components";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useState } from "react";
import { useObservation } from "./useObservation";

const StyledObservationInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.5rem;
  gap: 2rem;
`;

const ObservationInput = () => {
  const [observation, setObservation] = useState("");
  const {observationPost, isLoading}  = useObservation()

  const handleSubmition = () => {
    observationPost(observation, {
      onSuccess: () => {
        setObservation("");
      }
    });
  }

  return (
    <StyledObservationInput>
      <Input
        type="text"
        placeholder="what is in your mind"
        value={observation}
        onChange={(e) => setObservation(e.target.value)}
      />

      <Button size="medium" onClick={handleSubmition}>
        Submit
      </Button>
    </StyledObservationInput>
  );
};

export default ObservationInput;
