import { generateJWTToken } from "../config/jwt.token.js";
import { Cabin } from "../models/cabin.model.js";
import User from "../models/user.model.js";
import * as fs from "node:fs";

import { exractSearchData } from "../utills/extractSearchNLP.js";
import Booking from "../models/booking.model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, nationalId, country } = req.body;

    if (!name || !email || !password || !nationalId || !country) {
      return res
        .status(403)
        .json({ success: false, message: "Missing Details" });
    }
    const userCheck = await User.findOne({
      $or: [{ email }, { nationalId }],
    });
    if (userCheck) {
      return res
        .status(403)
        .json({ success: false, message: "User Exist with these credentials" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Entere Strong Password" });
    }

    const user = await User.create({
      name,
      email,
      password,
      nationalId,
      country,
    });

    res
      .status(200)
      .json({ success: true, message: "user regesterd Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internel Error while registering user ${error.message}`,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Does Not Exist." });
    }

    const passwordCheck = await user.isPasswordCorrect(password);
    if (!passwordCheck) {
      return res.json({
        success: false,
        message: "Your Password is incorrect!",
      });
    }
    const token = await generateJWTToken(user._id, res);

    res
      .status(200)
      .json({ success: true, message: "User loggedIn SuccessFully!", token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Error while logging user ${error.message}`,
    });
  }
};

export const getCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const cabin = await Cabin.findById(id);
    return res.json({ cabin });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error While Error ${error?.message}`,
    });
  }
};

export const getAllCabins = async (req, res) => {
  try {
    const cabins = await Cabin.find({});
    return res.json({ cabins });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error While Error ${error?.message}`,
    });
  }
};

export const getRecommendation = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    const { viewedCabins, searchHistory, bookedCabins } = user;

    const recommendCabins = await Cabin.aggregate([
      {
        $match: {
          _id: { $nin: bookedCabins },
          // endDate: {$gte: Date.now()}
        },
      },
      {
        $addFields: {
          similaritScore: {
            $sum: [
              { $cond: [{ $in: ["$description", searchHistory] }, 3, 0] },
              { $cond: [{ $in: ["$_id", viewedCabins] }, 2, 0] },
              { $cond: [{ $in: ["$_id", bookedCabins] }, 5, 0] },
            ],
          },
        },
      },
      { $sort: { similaritScore: -1, ratings: -1, discount: -1 } },
      { $limit: 5 },
    ]);

    if (recommendCabins.length === 0) {
      const cabins = await Cabin.find({}).limit(3);
      return res.json({ recommended: cabins });
    }
    res.json({ recommended: recommendCabins });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while getting recommendation cabins`,
    });
  }
};

export const recommendOneCabin = async (req, res) => {
  try {
    const cabin = await Cabin.aggregate([
      { $match: { isBooked: false } },
      {
        $addFields: {
          averageRatings: {
            $avg: {
              $map: {
                input: "$ratings",
                as: "r",
                in: "$$r.rating",
              },
            },
          },
        },
      },
      { $sort: { averageRatings: -1 } },
      { $limit: 1 },
    ]);
    // console.log(cabin);

    res.json({ cabin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Error while getting recommended cabins${error.messsage}`,
    });
  }
};

export const searchCabins = async (req, res) => {
  try {
    const { search } = req.params;
    // 1. NLP Processing

    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }
    user.searchHistory.push(search);
    await user.save();

    // // 2. Extract Keywords
    const { price, name, description, discount } = exractSearchData(search);

    let searchQuery = {};
    if (description?.length || name?.length) {
      let keywords = description.join(" ") + name.join(" ");
      searchQuery.$text = { $search: keywords };
    }

    if (discount) {
      searchQuery.discount = { $gt: 0 };
    }

    if (price.length) {
      let priceRange = parseInt(price[0]);
      searchQuery.regularPrice = { $lte: priceRange };
    }

    const results = await Cabin.aggregate([
      { $match: searchQuery },
      { $addFields: { averageRating: { $avg: "$ratings.rating" } } },
      { $sort: { averageRating: -1, discount: -1, regularPrice: 1 } },
      { $limit: 4 },
    ]);

    // let discountFilter = {};

    // if (numbers.length) {
    //   const price = numbers.find((num) => num > 200);

    //   if (price) priceFilter = { regularPrice: { $lte: price } };

    //   const discount = numbers.find((num) => num < 15);
    //   if (discount) discountFilter = { discount: { $gte: discount } };
    //   // console.log(discountFilter.discount);
    // }

    // const pipeline = [
    //   {
    //     $match: {
    //       $and: [
    //         { $text: { $search: search } },
    //         {
    //           regularPrice: priceFilter.regularPrice,
    //           discount: discountFilter.discount,
    //         },
    //       ]?.filter((obj) => Object.keys(obj).length > 0), // remove empty filters
    //     },
    //   },

    //   {
    //     $addFields: { score: { $meta: "textScore" } }, //relevence score
    //   },
    //   {
    //     $sort: { score: -1, regularPrice: 1 },
    //   },
    // ];

    // const results = await Cabin.aggregate(pipeline);

    // if (results.length === 0) {
    //   // message  "No exact macth found, Here are some similar",
    //   const suggestions = await Cabin.find().limit(3);
    //   return res.json({ cabins: suggestions });
    //   // console.log(suggestions)
    // }

    // // const { maxCapacity, name, regularPrice, discount } =
    // //   extractSearchParams(search);

    // // console.log(maxCapacity, name, regularPrice, discount);

    // // const cabins = await Cabin.find({
    // //   ...(name ? { name: { $regex: name, $options: "i" } } : {}),
    // //   ...(regularPrice ? { regularPrice: { $lte: regularPrice } } : {}),
    // //   ...(discount ? { discount: { $gt: 1 } } : {}),
    // //   ...(maxCapacity ? { maxCapacity: { $gte: maxCapacity } } : {}),
    // // });
    // console.log(results.length);

    res.json({ cabins: results });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internel Error while registering user ${error.message}`,
    });
  }
};

export const ratingsToCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Ratings must be between 1 and 5 stars",
      });
    }

    const cabin = await Cabin.findById(id);
    if (!cabin) {
      return res
        .status(400)
        .json({ success: false, message: "Cabin not found" });
    }

    // Check if user has already rated
    const existingRatings = cabin.ratings.find(
      (rating) => rating?.userId.toString() === userId
    );

    if (existingRatings) {
      existingRatings.rating = rating;
      existingRatings.review = review;
    } else {
      cabin.ratings.push({ userId, rating, review });
    }

    await cabin.save();
    res.json({ message: "Rating Submitted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal Error While submitting ratings ${error.message}`,
    });
  }
};

export const getRatings = async (req, res) => {
  try {
    const { id } = req.params;
    const cabin = await Cabin.findById(id).populate("ratings.userId", "name");

    if (!cabin) {
      return res
        .status(404)
        .json({ success: false, message: "Cabin Not Found" });
    }
    res.json({ cabin });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Error while getting ratings",
    });
  }
};

export const storeUserViews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id || !userId) {
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const { viewedCabins } = user;

    if (viewedCabins.includes(id)) {
      return res
        .status(205)
        .json({ success: true, message: "Cabin already clicked" });
    }
    // if not view yet then pusht the id to viewedCabins field of user collection
    viewedCabins.push(id);
    await user.save();
    return res
      .status(205)
      .json({ success: true, message: "Cabin already clicked" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Error while storing views` });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(403)
        .json({ success: false, message: "Something missing" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internel Error while getting user profile ${error.message}`,
    });
  }
};

export const updateProfileOrImage = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const imageFile = req.file.filename;

    const updateFields = {};

    if (name) updateFields.name = name;
    if (imageFile) updateFields.image = imageFile;

    if (Object.keys(updateFields).length == 0) {
      return res
        .status(403)
        .json({ success: false, message: "Missing details" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    if (user.image) {
      fs.unlink(`upload/${user.image}`, () => {});
      // await user.updateOne(updateFields);
      await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    // if (imageFile) {
    //   const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    //     resource_type: "image",
    //   });

    //   // await user.findByIdAndUpdate(userId, { image: imageUpload.secure_url });
    //   await user.updateOne({ image: imageUpload.secure_url });
    // }
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: `Internel Error while updating user profile ${error.message}`,
    });
  }
};

export const userBookingInformation = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong." });
    }

    const booking = await Booking.findOne({
      guestId: userId,
    });

    // const booking = await Booking.aggregate([{ $match: { guestId: userId } }]);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, mesage: "No Booking Found." });
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internel Error while getting user booking info ${error.message}`,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong." });
    }

    const booking = await Booking.findOne({
      guestId: userId,
    });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, mesage: "No Booking Found." });
    }
    const today = new Date().toISOString();
    if (today >= booking?.endDate) {
      return res.json({ mesage: "You have not cancel it now" });
    }

    // TODO: Modify this section for the status to be canceled because this is user not admin
    // const cabinId = booking?.cabinId;
    // const cabin = await Cabin.findById(cabinId);
    // await cabin.updateOne({ isBooked: false });

    booking.status = "unconfirmed";

    // await booking.deleteOne();
    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "Booking Caneceld successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internel Error while Canceling booking info ${error.message}`,
    });
  }
};

// it will check and return if the cabin is already booked from certain user

export const cabinIsAlreadyBookedFromYou = async (req, res) => {
  try {
    const { id } = req.params; // the id of cabin

    const userId = req.user.id; //come through middleware of authentication

    const activeBooking = await Booking.findOne({
      cabinId: id,
      guestId: userId,
      // status:{$in:["reserved", "checked-in"]}
      // status: true
    }).select(
      "-nightsNum -guestsNum -cabinPrice -extraPrice -totalPrice -hasBreakFast -isPaid"
    );

    let active = false;

    if (activeBooking) {
      active = true;
    }
    res.json({ active, activeBooking });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Error while checking activating ${error.message}`,
    });
  }
};

// Function that converting the status from unconfirmed to check-in which means that user is arriving

export const checked_IN_Status_Arrive = async (req, res) => {
  try {
    const { id } = req.params; //it is the id of cabin
    const userId = req.user.id;

    if (!id || !userId) {
      return res
        .status(402)
        .json({ success: false, message: "id and user id is essential" });
    }

    // Finding the exact booking where above credentials match
    const booking = await Booking.findOne({
      _id: id,
      guestId: userId,
    });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // if it is already checked-in then leave it
    if (booking?.status === "checked-in") {
      return res.json({ message: "You already here." });
    }

    // if the start date of booking is far from today then not allowed
    const today = new Date();
    if (booking?.startData > today) {
      return res.json({ message: "Your time is not reached yet." });
    }
    booking.status = "checked-in";
    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "you checked-in your booking" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `internal Error while Checked-in booking`,
    });
  }
};

export const checked_out_Status_leaving = async (req, res) => {
  try {
    const { id } = req.params; //it is the id of cabin
    const userId = req.user.id;

    if (!id || !userId) {
      return res
        .status(402)
        .json({ success: false, message: "Id and userid is essential" });
    }

    // Finding the exact booking where above credentials match
    const booking = await Booking.findOne({
      _id: id,
      guestId: userId,
    });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // if it is already checked-in then leave it
    if (booking?.status === "checked-out") {
      return res.json({ message: "You have already gone." });
    }

    // if the start date of booking is far from today then not allowed
    const today = new Date();
    if (booking?.endDate > today) {
      return res.json({ message: "Your have some time to enjoy here." });
    }
    booking.status = "checked-out";
    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "you checked-out your booking" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `internal Error while Checked-out booking`,
    });
  }
};

// this function will used to add the user observation about the company in user collection

export const userObservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { observation } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Something went wrong" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await user.updateOne({ observation });

    // user.observation = observation;
    // await user.save();
    res
      .status(200)
      .json({ success: true, message: "Observation recieved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while storing observation`,
    });
  }
};

export const getUsersObservations = async (req, res) => {
  try {
    const observations = await User.find({}).select(
      "-name -email -password -nationalId -searchHistory -viewedCabins -bookedCabins"
    );

    res.json({ success: true, observations });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while getting observations`,
    });
  }
};
