import { v2 as cloudinary } from "cloudinary";
import * as fs from "node:fs";

export const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

export const uploadCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("Uploaded successfully");
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
