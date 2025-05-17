import { axiosInstance } from "./axiosInstace";

export const getSetting = async () => {
  const { data, error } = await axiosInstance.get("/setting/get-setting");

  if (error) {
    console.log(error.message);
    throw new Error("Setting does not loaded");
  }
  return data.setting[0];
};

export const updateSetting = async (value) => {
  const { data, error } = await axiosInstance.patch("/setting/update", value);
  if (error) {
    console.log(error.message);
    throw new Error("Setting does not loaded");
  }

  return data;
};
