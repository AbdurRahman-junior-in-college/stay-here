import React from "react";
import { useState } from "react";
import { HiStar } from "react-icons/hi2";
import Heading from "../../ui/Heading";
import Label from "../../ui/Label";
import styled from "styled-components";
import Button from "../../ui/Button";
import TextArea from "../../ui/Textarea";
import { useSubmitRating } from "./useSubmitRating";

const StyledStarBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);

  & h5 {
    width: 100%;
  }
`;

const StyleRatingBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Input = styled.input`
  display: none;
`;

const StartBox = styled.div``;

const Stars = styled.div`
  display: flex;
`;

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");

  const { submitRatingsAndReviews, isLoading } = useSubmitRating();

  const handleSubmit = () => {
    if (!rating && !review) return;
    submitRatingsAndReviews({ rating, review });
  };

  return (
    <StyledStarBox>
      <Heading as="h5">Rate this cabin</Heading>
      <StyleRatingBox>
        <Stars>
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;

            return (
              <Label key={index}>
                <Input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <HiStar
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </Label>
            );
          })}
        </Stars>
        <TextArea
          placeholder="Write your comment"
          onChange={(e) => setReview(e.target.value)}
        />
      </StyleRatingBox>
      <Button size="medium" onClick={handleSubmit}>
        Submit review
      </Button>
    </StyledStarBox>
  );
};

export default StarRating;
