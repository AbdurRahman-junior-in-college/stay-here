import { axiosInstance } from "./axiosInstace";

export const userLogin = async ({ password, email }) => {
  console.log(password, email);
  const { data, error } = await axiosInstance.post("/user/user-login", {
    password,
    email,
  });
  console.log(data);
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data;
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("userToken");
  // if (!token) {
  //   return null;
  // }
  const { data, error } = await axiosInstance.get("/user/get-user-profile", {
    headers: { token },
  });

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data.user;
};
export const logout = () => {
  localStorage.removeItem("userToken");
};

export const registerUser = async (userDetails) => {
  const { error } = await axiosInstance.post(
    "/user/user-register",
    userDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (error) {
    console.error(error?.message);
    throw new Error(error?.message);
  }
};

export const updateUser = async ({ name, image }) => {
  const token = localStorage.getItem("userToken");
  let updateData;
  if (name) updateData = { name };
  if (image) updateData = { image };
  const { data, error } = await axiosInstance.post(
    "/user/user-update-profile",
    updateData,
    { headers: { "Content-Type": "multipart/form-data", token } }
  );
  console.log(data);

  if (error) {
    console.error(error.message);
    throw new Error(error?.message);
  }
  return data;
};

export const updatePassword = async ({ oldPassword, newPassword }) => {
  let updateData;
  if (oldPassword && newPassword) updateData = { oldPassword, newPassword };

  const { data, error } = await axiosInstance.post(
    "/admin/update-admin",
    updateData,
    { headers: { token } }
  );
  console.log(data);

  if (error) {
    console.error(error.message);
    throw new Error(error?.message);
  }
  return data;
};

export const getSearch = async (usedQuery) => {
  const token = localStorage.getItem("userToken");
  // const token = localStorage.getItem("adminToken");

  const { data, error } = await axiosInstance.get(
    `/user/search-cabins/${usedQuery}`,
    {
      headers: { token },
    }
  );

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data;
};

export const getCabins = async () => {
  const { data, error } = await axiosInstance.get(`/user/get-cabins`);

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data.cabins;
};

export const getRcommend = async () => {
  const { data, error } = await axiosInstance.get(`/user/get-recommend`);

  console.log(data);
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data.cabin;
};

// when user click the cabin this api will call
export const getCabin = async (id) => {
  const { data, error } = await axiosInstance.get(`/user/get-cabin/${id}`);

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data.cabin;
};

export const submitRatings = async ({ rating, review, id }) => {
  const token = localStorage.getItem("userToken");
  const { data, error } = await axiosInstance.post(
    `/user/submit-ratings/${id}`,
    { rating, review },
    {
      headers: { token },
    }
  );

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
};

export const getRecommendedCabins = async () => {
  const token = localStorage.getItem("userToken");
  const { data, error } = await axiosInstance.get("/user/get-recommendation", {
    headers: { token },
  });
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data.recommended;
};

export const storeUserClicks = async (id) => {
  const token = localStorage.getItem("userToken");
  console.log(id);
  const { data, error } = await axiosInstance.post(
    `/user/cabin-view/${id}`,
    {},
    {
      headers: { "Content-Type": "application/json", token },
    }
  );

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
};

export const addBooking = async ({ id, data }) => {
  const token = localStorage.getItem("userToken");

  const { data: recieveData, error } = await axiosInstance.post(
    `/user/add-booking/${id}`,
    data,
    {
      headers: { "Content-Type": "application/json", token },
    }
  );
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  console.log(data);
};

export const getBookingInformations = async () => {
  const token = localStorage.getItem("userToken");

  const { data, error } = await axiosInstance.get("/user/get-booking-info", {
    headers: { token },
  });
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  return data?.booking;
};

export const cancelUserBooking = async () => {
  const token = localStorage.getItem("userToken");

  const { data, error } = await axiosInstance.delete("/user/cancel-booking", {
    headers: { token },
  });
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  console.log(data);
};

// Api for checking that is the cabin booked from an user or not

export const checkBooking = async (id) => {
  const token = localStorage.getItem("userToken");

  const { data, error } = await axiosInstance.get(
    `/user/is-cabin-booked/${id}`,
    {
      headers: { token },
    }
  );
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  return data;
};

export const checked_in_Status = async (id) => {
  const token = localStorage.getItem("userToken");

  const { data, error } = await axiosInstance.post(
    `/user/checked-in/${id}`,
    {},
    {
      headers: { token },
    }
  );
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  console.log(data);
  return data;
};

export const checked_out_Status = async (id) => {
  const token = localStorage.getItem("userToken");

  const { data, error } = await axiosInstance.patch(
    `/user/checked-out/${id}`,
    {},
    {
      headers: { token },
    }
  );
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  console.log(data);
  return data;
};

// this api will call for storing the observation about the company
export const postMyObservation = async (observation) => {
  console.log(observation);
  const token = localStorage.getItem("userToken");

  const { data, error } = await axiosInstance.post(
    "/user/observation",
    { observation },
    {
      headers: { token },
    }
  );
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  console.log(data);
  return data;
};

// This data will be accessable for anyone to see whether they are authenticated or not
export const getAllObservations = async () => {
  const { data, error } = await axiosInstance.get("/user/observations");
  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  console.log(data);
  return data.observations;
};
