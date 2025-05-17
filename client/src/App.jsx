import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";

import { DarkModeProvider } from "./features/conext/DarkModeContext";
import GlobalStyles from "./styles/globleStyles";
import SideBar from "./ui/SideBar";
import Cabins from "./pages/Cabins";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Cabin from "./pages/Cabin";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />

        <Routes>
          {/* <Route index element={<Home />} path="/"/> */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<Cabins />} path="/cabins" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<Account />} path="/account" />
            <Route element={<Cabin />} path="/cabin/:id" />
            <Route element={<Booking />} path="/booking/:id" />
            <Route element={<Bookings />} path="/bookings" />
          </Route>
          <Route element={<Login />} path="/auth" />
        </Routes>
        <ToastContainer />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
