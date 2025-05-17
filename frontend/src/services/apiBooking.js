import { PAGE_SIZE } from "../utils/constants";
import { axiosInstance } from "./axiosInstace";

export const getBookings = async ({ filter, sortBy, page }) => {
  const limit = PAGE_SIZE;
  const response = await axiosInstance.get("/bookings/get-bookings", {
    params: { filters: filter, sortBy, page, limit },
  });

  const data = response?.data?.bookings;
  const count = response?.data?.count;
  return { data, count };
};

export const getBooking = async (id) => {
  const { data, error } = await axiosInstance.get(`/bookings/booking/${id}`);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
};

export const updateStatus = async (bookingId) => {
  const { error, data } = await axiosInstance.patch(
    `/bookings/booking/${bookingId}`
  );
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data?.booking;
};

export const updatePrices = async (id, updateData) => {
  const { error, data } = await axiosInstance.post(
    `/bookings/update-prices/${id}`,
    updateData
  );

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data?.booking;
};

export const deleteBooking = async (id) => {
  const { data, error } = await axiosInstance.delete(
    `/bookings/delete-booking/${id}`
  );
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data?.data;
};

export const getLatesBooking = async (latest) => {
  const { data, error } = await axiosInstance.post(
    "/bookings/get-latest-bookings",
    {
      latest,
    }
  );

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data?.bookings;
};

export const getTodayActivities = async () => {
  const token = localStorage.getItem("adminToken");

  const { data, error } = await axiosInstance.get(
    "/bookings/get-today-activity",
    {
      headers: { token },
    }
  );
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data?.bookings;
};

export const sendBookingDetails = async (details) => {
  const token = localStorage.getItem("adminToken");


  const { data, error } = await axiosInstance.post(
    "/bookings/send-booking-details",details,
    {
      headers: { "Content-Type": "application/json", token },
    }
  );
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  // return data?.bookings;
};
