import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
import {
  HiWifi,
  HiSun,
  HiVideoCamera,
  HiBuildingLibrary,
  HiClock,
  HiSwatch,
  HiStar,
} from "react-icons/hi2";
import { useState } from "react";
import SearcInput from "./SearchInput";
import { useSearchCabins } from "../features/home/useSearchCabins";
import { useCabins } from "../features/home/useCabins";
import LoaderMini from "./LoaderMini";
import { useNavigate } from "react-router-dom";
import { storeUserClicks } from "../services/apiAdmin";
import { useStoreClicks } from "../features/cabin/userStoreClicks";
import { useRecommendation } from "../features/home/useRecommendation";
import { host } from "../utils/constants";

const FacilityLayOut = styled.div`
  display: grid;
  grid-template-columns: 28rem 25rem 28rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  max-width: 1000px;
  gap: 7rem;
  margin: 0 auto;
  margin-top: -8rem;
  padding: 20px;
  box-shadow: var(--shadow-md);
  margin-bottom: 2rem;
`;

const FacilitesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const FacilitesHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    color: var(--color-yellow-700);
  }
`;

const Facilities = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
`;

const Facility = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  & span {
    color: var(--color-grey-700);
    font-size: 1.5rem;
    font-weight: bold;
  }

  &:nth-child(1) {
    color: var(--color-blue-700);
  }

  &:nth-child(2) {
    color: var(--color-yellow-100);
  }

  &:nth-child(3) {
    color: var(--color-green-700);
  }

  &:nth-child(4) {
    color: var(--color-indigo-700);
  }
`;

const FacilityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-900);

  & svg {
    font-size: 2rem;
  }
`;

const RecommendationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &:nth-child(3) {
    font-weight: 600;
    color: var(--color-blue-700);
    margin-top: 2rem;
  }

  & svg {
    font-size: 2rem;
    color: var(--color-yellow-100);
  }
  & p {
    color: var(--color-grey-500);
  }
`;

const VerifiedAndTime = styled.div`
  padding: 0.5rem 1rem;
  border: 1.5px solid var(--color-grey-600);
  border-radius: var(--border-radius-md);
  margin-top: 2.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;

  & svg {
    font-size: 3.5rem;
    color: var(--color-blue-700);
  }

  & span {
    color: var(--color-grey-700);
  }
`;

const CabinResultAndSearchBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
`;

const CabinResultAndSearch = styled.div`
  display: flex;
  justify-content: space-between;

  & svg {
    color: var(--color-blue-700);
    font-size: 2.5rem;
  }

  & span {
    color: var(--color-grey-500);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const CabinImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const SearcInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-grey-300);
  gap: 1rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-lg);

  & svg {
    color: var(--color-blue-700);
    font-size: 2.5rem;
  }
`;

const StyledEmptyRecommend = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--color-red-700);
`;

const SvgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border-radius: var(--border-radius-md);

  & svg {
    font-size: 2rem;
  }
`;

const FacilityContainer = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const { getSearchCabins, isLoading } = useSearchCabins();
  const { cabins, isLoading: isLoading1 } = useCabins();
  // const { recommend, isLoading: isLoading3 } = useRecommend();
  const { recommended, isLoading: isLoading3 } = useRecommendation();
  const { storeClicks, isLoading: isLoading2 } = useStoreClicks();

  // Calaculate the rates

  const ratingsCalculation = () => {
    const ratingsArr = recommended[0]?.ratings;
    const avgRatings =
      ratingsArr?.reduce((acc, occ) => acc + occ.rating, 0) / ratingsArr.length;
    return avgRatings;
  };

  // Handle the search functionality
  const handleClick = () => {
    if (showSearch && searchQuery) {
      getSearchCabins(searchQuery, {
        onSuccess: (data) => {
          setSearchData(data?.cabins);
        },
      });
    }
    setShowSearch((pre) => !pre);
  };

  return (
    <FacilityLayOut>
      <FacilitesContainer>
        <FacilitesHeading>
          <Heading as="h2">Facilities</Heading>
          <span>Check These</span>
        </FacilitesHeading>

        <Facilities>
          <Facility>
            <FacilityBox>
              <HiWifi />
            </FacilityBox>
            <span>Wifi</span>
          </Facility>

          <Facility>
            <FacilityBox>
              <HiSun />
            </FacilityBox>
            <span>Calm</span>
          </Facility>

          <Facility>
            <FacilityBox>
              <HiVideoCamera />
            </FacilityBox>
            <span>Scenries</span>
          </Facility>

          <Facility>
            <FacilityBox>
              <HiBuildingLibrary />
            </FacilityBox>
            <span>Library</span>
          </Facility>
        </Facilities>
      </FacilitesContainer>

      {recommended ? (
        <RecommendationBox>
          <Heading as="h3">{recommended[0]?.name} For You</Heading>
          <span>
            Ratings : {ratingsCalculation()} <HiStar />
          </span>
          <VerifiedAndTime>
            <HiClock />
            {isLoading3 ? (
              <LoaderMini />
            ) : (
              <p>Min 2+ | Max {recommended[0]?.maxCapacity}</p>
            )}
          </VerifiedAndTime>
        </RecommendationBox>
      ) : (
        <StyledEmptyRecommend>No Recommendatio for you</StyledEmptyRecommend>
      )}
      <CabinResultAndSearchBox>
        {showSearch ? (
          <SearcInputContainer>
            <SearcInput
              placeholder="What you looking for?"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <HiSwatch onClick={() => handleClick()} />
          </SearcInputContainer>
        ) : (
          <CabinResultAndSearch>
            {searchData.length <= 0 ? (
              <span>
                {isLoading1 ? <LoaderMini /> : cabins?.length} results
              </span>
            ) : (
              <span>
                {isLoading ? <LoaderMini /> : searchData?.length} results
              </span>
            )}
            <HiSwatch onClick={() => setShowSearch((pre) => !pre)} />
          </CabinResultAndSearch>
        )}
        <ImageContainer>
          {searchData.length <= 0
            ? cabins?.length > 0 &&
              cabins.slice(0, 5)?.map((cabin) => (
                <CabinImage
                  src={`${host}/images/${cabin?.image}`}
                  key={cabin._id}
                  onClick={() => {
                    storeClicks(cabin?._id);
                    navigate(`/cabin/${cabin._id}`);
                  }}
                />
              ))
            : searchData?.length > 0 &&
              searchData?.map((search) => (
                <CabinImage
                  src={`${host}/images/${search?.image}`}
                  key={search?._id}
                  onClick={() => {
                    storeUserClicks(search?._id);
                    navigate(`/cabin/${search._id}`);
                  }}
                />
              ))}
          {/* 
          <CabinImage src={image} />
          <CabinImage src={image} /> */}
        </ImageContainer>
      </CabinResultAndSearchBox>
    </FacilityLayOut>
  );
};

export default FacilityContainer;
