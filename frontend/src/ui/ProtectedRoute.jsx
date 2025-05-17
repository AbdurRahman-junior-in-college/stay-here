import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAdmin } from "../features/authentication/useAdmin";
import { isTokenExpired } from "../utils/JWTExpiration";
import Loader from "./Loader";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  //1. Load the authenticated user;
  const { admin, isLoading } = useAdmin();

  //2. If there is no authenticated user redirect it to the user

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!admin && !isLoading) {
      navigate("/login", { replace: true });
    }
    if (isTokenExpired(token)) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, admin, navigate, token]);
  //3. While Loading Show Spinner Loader

  if (isLoading) {
    return (
      <FullPage>
        <Loader />
      </FullPage>
    );
  }

  //4. If there is an user render the app

  if (admin) return children;
};

export default ProtectedRoute;
