import { axiosInstance } from "./axiosInstace";

export const adminLogin = async ({ password, email }) => {
  const { data, error } = await axiosInstance.post("/admin/login-admin", {
    password,
    email,
  });
  console.log(email, password);

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }

  return data;
};

export const getAdmin = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return null;
  }
  const { data, error } = await axiosInstance.get("/admin/get-admin", {
    headers: { token },
  });

  if (error) {
    console.log(error?.message);
    throw new Error(error?.message);
  }
  return data;
};
export const logout = () => {
  localStorage.removeItem("adminToken");
};

export const registerAdmin = async (adminCredentials) => {
  const { error } = await axiosInstance.post(
    "/admin/register-admin",
    adminCredentials
  );
  if (error) {
    console.error(error?.message);
    throw new Error(error?.message);
  }
};

export const updateAdmin = async ({ name, avatar }) => {
  const token = localStorage.getItem("adminToken");
  let updateData;
  if (name) updateData = { name };
  if (avatar) updateData = { avatar };
  const { data, error } = await axiosInstance.post(
    "/admin/update-admin",
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
