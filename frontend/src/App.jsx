import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

import { DarkModeProvider } from "./features/conext/DarkModeContext";
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Setting from "./pages/Setting";
import NewUser from "./pages/User";
import GlobalStyles from "./styles/globleStyles";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

const socket = io("http://localhost:5000");
const App = () => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on("notify_booking", (data) => {
      setNotification(`New Booking Available`);
      toast.info("New Booking Available");
    });

    return () => socket.off("notify_booking");
  }, []);

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to={"dashboard"} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="booking" element={<Bookings />} />
            <Route path="booking/:id" element={<Booking />} />
            <Route path="checkin/:id" element={<CheckIn />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="user" element={<NewUser />} />
            <Route path="setting" element={<Setting />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
