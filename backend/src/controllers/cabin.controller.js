import { Cabin } from "../models/cabin.model.js";
import cloudinary from "cloudinary";
import * as fs from "node:fs";
import { uploadCloudinary } from "../config/cloudinary.js";

export const addCabin = async (req, res) => {
  try {
    const { name, maxCapacity, regularPrice, discount, description } = req.body;
    const imageFile = req.file.filename;
    if (
      !name ||
      !maxCapacity ||
      !regularPrice ||
      !discount ||
      !description ||
      !imageFile
    ) {
      return res
        .status(401)
        .json({ success: true, message: "All Fields are required" });
    }

    // const uploaded_image = await cloudinary.uploader.upload(imageFile?.path, {
    //   resource_type: "image",
    // });

    // const uploaded_image = uploadCloudinary(imageFile?.path);

    const cabin = await Cabin.create({
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      // image: uploaded_image?.secure_url || "",
      image: imageFile,
    });

    res.json({ success: true, message: "Cabin Added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while adding cabin${error.message}`,
    });
  }
};

export const deleteCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const cabin = await Cabin.findById(id);
    if (!cabin) return res.json({ success: false, message: "Not Found Cabin" });
    if (cabin?.image) {
      // delete from cloudinary
      fs.unlink(`upload/${cabin.image}`, () => {});
    }
    await cabin.deleteOne();

    res.json({ success: true, message: "Cabin deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `internal Error while deleting cabin${error.message}`,
    });
  }
};

export const updateCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maxCapacity, regularPrice, discount, description } = req.body;
    if (
      !name ||
      !maxCapacity ||
      !regularPrice ||
      !discount ||
      !description ||
      !id
    ) {
      return res
        .status(401)
        .json({ success: true, message: "All Fields are required" });
    }

    const cabin = await Cabin.findById(id);

    if (!cabin) {
      return res.json({ success: false, message: "Not Found Cabin" });
    }

    await cabin.updateOne({
      $set: { name, maxCapacity, regularPrice, discount, description },
    });
    res.json({ success: true, message: "Cabin Editted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `internal Error while updatin cabin${error.message}`,
    });
  }
};

export const getAllCabins = async (req, res) => {
  try {
    const cabins = await Cabin.find({});
    res.json({ success: true, cabins });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `internal Error while getting cabins${error.message}`,
    });
  }
};
