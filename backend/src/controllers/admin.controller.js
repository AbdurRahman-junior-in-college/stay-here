import Admin from "../models/admin.model.js";
import { generateJWTToken } from "../config/jwt.token.js";
import bcrypt from "bcrypt";
import * as fs from "node:fs";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(402)
        .json({ success: false, message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(403)
        .json({ success: false, message: "Admin not found" });
    }
    const checkPassword = await admin.isPasswordCorrect(password);
    if (!checkPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Your password is incorrect" });
    }
    const token = await generateJWTToken(admin._id, res); // to generate cookie and give response

    res.status(200).json({
      success: true,
      message: "Admin Logged in Successfully",
      admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while loging admin ${error?.message}`,
    });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const id = req.admin;
    if (!id) {
      res.status(401).json({ message: "Invalid Access" });
    }
    const admin = await Admin.findById(id);
    if (!admin) {
      res.status(401).json({ message: "Invalid Access" });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Interal Error while getting admin ${error.message}`,
    });
  }
};

// export const register = async (req, res) => {
//   let name = "Khan",
//     password = 12345678,
//     email = "khan@gmail.com",
//     confirmPassword = 12345678;

//   const admin = await Admin.create({
//     name,
//     email,
//     password,
//   });

//   if (admin) {
//     console.log("Created");
//   }
// };
export const registerAdmin = async (req, res) => {
  try {
    const { name, password, email, confirmPassword } = req.body;

    if (!name || !password || (!email && password !== confirmPassword)) {
      return res.status(403).json({
        success: false,
        message: "Something missing or Check your Credentails againg",
      });
    }
    // Check if the user exist already
    const checkAdmin = await Admin.findOne({
      $or: [{ name, email }],
    });

    if (checkAdmin) {
      return res.status(405).json({
        success: false,
        message: "User with these credntials already exist",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    if (admin)
      res
        .status(200)
        .json({ success: true, message: "User Registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internale Error while registering user${error?.message}`,
    });
  }
};

export const updateAdminData = async (req, res) => {
  try {
    const id = req.admin;
    const { name, oldPassword, newPassword } = req.body;
    const imageFile = `${req.file}`;

    if (!id) {
      res.status(401).json({ message: "Invalid Access" });
    }

    const admin = await Admin.findById(id);

    if (name) {
      await admin.updateOne({ $set: { name } });
    }
    if (oldPassword && newPassword) {
      const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);
      const hashPassword = await bcrypt.hash(newPassword, 10);
      if (isPasswordCorrect) {
        await admin.updateOne({ $set: { password: hashPassword } });
      }
    }
    if (imageFile) {
      if (admin?.avatar) {
        // delete it from server file
        //   fs.unlink(`upload/${admin.avatar}`, () => {});
        //   const delete_from_cloud = await cloudinary.destroy(admin?.avatar);
        //   if (delete_from_cloud) {
        //     const uploaded_image = await cloudinary.uploader.upload(
        //       imageFile.path,
        //       {
        //         resource_type: "image",
        //       }
        //     );
        //     await admin.updateOne({
        //       $set: { avatar: uploaded_image?.secure_url },
        //     });
        //   }
        // } else {
        //   const uploaded_image = await cloudinary.uploader.upload(
        //     imageFile.path,
        //     {
        //       resource_type: "image",
        //     }
        //   );
        // await admin.updateOne({
        //   $set: { avatar: uploaded_image?.secure_url },
        // });
      }
    } else {
      const updateAdmin = await admin.findById(id);
      res.status(200).json({ success: true, data: updateAdmin });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Error while updating admin` });
  }
};
