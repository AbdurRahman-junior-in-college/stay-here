import axios from "axios";
import { axiosInstance } from "./axiosInstace";

export const getCabins = async () => {
  const { error, data } = await axiosInstance.get("/cabin/get-cabins");

  if (error) {
    console.log(error.message);
    throw new Error("Cabins could not be loaded");
  }
  return data.cabins;
};

// export const addCabin = async (newCabin) => {
//   console.log(newCabin)
//   const { error, data } = await axiosInstance.post(
//     "/cabin/add-cabin",
//     newCabin,
//   );
//   if (error) {
//     console.log(error.message);
//     throw new Error("Cabins could not be loaded");
//   }
//   return data;
// };

export const addCabin = async (newCabin) => {
  const { error, data } = await axios.post(
    "http://localhost:5000/api/v1/cabin/add-cabin",
    newCabin,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  if (error) {
    console.log(error);
    console.log(error.message);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const duplicateCabin = async (newCabin) => {
  const { error, data } = await axiosInstance.post("cabin/duplicate", newCabin);
  if (error) {
    console.log(error);
    console.log(error.message);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { error, data } = await axiosInstance.delete(`cabin/delete/${id}`);

  if (error) {
    console.log(error.message);
    throw new Error("Cabin could not be deleted");
  }
  return data;
};

export const editCabin = async (newCabin, id) => {
  const { data, error } = await axiosInstance.patch(
    `/cabin/update-cabin/${id}`,
    newCabin
  );
  if (error) {
    console.log(error.message);
    throw new Error("Cabin could not be deleted");
  }
  return data;
};
