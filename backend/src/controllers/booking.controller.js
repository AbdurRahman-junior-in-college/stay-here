import Booking from "../models/booking.model.js";
import { Cabin } from "../models/cabin.model.js";
import User from "../models/user.model.js";
import { io } from "../socket.js";
import moment from "moment";
import { sendEmail } from "../utills/male.send.js";
import { generatePdf } from "../utills/generatePdf.js";
import AppSetting from "../models/appSetting.model.js";

// this function for creation of the booking the params of this function are the essentials part of the booking
const bookingCreation = async (
  id,
  hasBreakFast,
  guestsNum,
  nightsNum,
  userId,
  startData,
  endDate
) => {
  try {
    const cabin = await Cabin.findById(id);
    const appSetting = await AppSetting.findOne();
    const {} = appSetting;

    var extraPrice = 0;

    if (hasBreakFast) {
      extraPrice =
        Number(guestsNum) * Number(nightsNum) * appSetting?.breakfastPrice;
    }

    const totalPrice = cabin?.regularPrice + Number(extraPrice);

    const newBooking = await Booking.create({
      startData,
      endDate,
      nightsNum,
      guestsNum,
      cabinPrice: cabin?.regularPrice,
      extraPrice,
      totalPrice,
      hasBreakFast,
      cabinId: id,
      guestId: userId,
    });

    return newBooking;
  } catch (error) {
    return error;
  }
};

const modifyingUserBookedCabins = async (id, cabinId) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return { success: false, message: "User not find" };
    }

    const { bookedCabins } = user;
    if (!bookedCabins.includes(cabinId)) {
      user.bookedCabins.push(cabinId);
      await user.save();
    }
    return { message: "booked already" };
  } catch (error) {
    return error;
  }
};

export const addBooking = async (req, res) => {
  try {
    const { start, end, guestsNum, nightsNum, hasBreakFast } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    if (!start || !end || !guestsNum || !nightsNum || !id) {
      return res
        .status(402)
        .json({ success: false, message: "Fields are missing" });
    }

    const startData = new Date(start);
    const endDate = new Date(end);
    const today = new Date();

    const allBookings = await Booking.find({ cabinId: id });

    if (allBookings.length > 0) {
      // it will loop throug the booking and will check wether the new coming booking should not overlap the old one
      let overlaps = [];
      for (let booking of allBookings) {
        if (
          (startData <= booking.startData && endDate <= booking.endDate) ||
          (startData >= booking.startData && endDate < booking.endDate)
        ) {
          overlaps.push(booking.startData, booking.endDate);
        }
      }

      // these are the conditions for edge case if overlaps or happenning then do not allow the new booking in given time slots

      if (
        overlaps.length > 0 ||
        startData < today ||
        endDate < today ||
        endDate < startData
      ) {
        return res.json({
          success: false,
          message: "This time slots is already booked",
        });
      }

      console.log(startData > endDate);

      // if(startData > endDate) {
      //   console.log("Start Data is less bro!")
      // }

      // if not overlapsing create the booking
      const booking = await bookingCreation(
        id,
        hasBreakFast,
        guestsNum,
        nightsNum,
        userId,
        startData,
        endDate
      );
      // if the booking completed then that id will be stored in user bookedCabin field

      if (booking) {
        await modifyingUserBookedCabins(userId, id);
      }
    }

    // this is the else part of allbooking.length maybe this cabin will be not booked from anyone in this case this part will be execute

    if (startData > endDate || startData < today) {
      return res.json({ success: false, message: "Wrong details" });
    }
    const booking = await bookingCreation(
      id,
      hasBreakFast,
      guestsNum,
      nightsNum,
      userId,
      startData,
      endDate
    );

    // if the booking completed then that id will be stored in user bookedCabin field

    if (booking) {
      await modifyingUserBookedCabins(userId, id);
    }

    // const allBookings = await Booking.aggregate([
    //   {

    //     $match: {
    //       hasBreakFast:false
    //     }
    //   }
    //   // {
    //   //   $sort: {
    //   //     startData: 1,
    //   //   },
    //   // },

    //   // {
    //   //   $group: {
    //   //     _id: "$cabinId",
    //   //     bookings: {
    //   //       $push: {
    //   //         startData: "$startData",
    //   //         endDate: "$endDate",
    //   //       },
    //   //     },
    //   //   },
    //   // },

    //   // {
    //   //   $project: {
    //   //     overlapping: {
    //   //       $filter: {
    //   //         input: "$bookings",
    //   //         as: "b",
    //   //         cond: {
    //   //           $and: [
    //   //             {
    //   //               $lte: [startData, "$$b.endDate"],
    //   //             },
    //   //             {
    //   //               $gte: [endDate, "$$b.startData"],
    //   //             },
    //   //           ],
    //   //         },
    //   //       },
    //   //     },
    //   //   },
    //   // },
    // ]);

    // const allBookings = await Booking.find({cabinId: id})

    // const allBookings = await Booking.aggregate([])

    // const { bookings } = allBookings[0];
    // console.log(allBookings);

    // const cabin = await Cabin.findById(id);
    // const appSetting = await AppSetting.findOne();

    // var extraPrice = 0;

    // if (hasBreakFast) {
    //   extraPrice =
    //     Number(guestsNum) * Number(nightsNum) * appSetting?.breakfastPrice;
    // }

    // const totalPrice = cabin?.regularPrice + Number(extraPrice);

    // const newBooking = await Booking.create({
    //   startData,
    //   endDate,
    //   nightsNum,
    //   guestsNum,
    //   cabinPrice: cabin?.regularPrice,
    //   extraPrice,
    //   totalPrice,
    //   hasBreakFast,
    //   cabinId: id,
    //   guestId: userId,
    // });

    // if (newBooking) {
    //   return res
    //     .status(200)
    //     .json({ success: true, message: "Cabin Booked Successfully" });
    // }
    // const isCabinAvailable = await isAvailable(id, startData, endDate);
    // console.log(isCabinAvailable);

    // console.log()

    // if (!isCabinAvailable) {
    //   return res.json({ success: false, isCabinAvailable });
    // }
    // const cabin = await Cabin.findById(id);

    // const appSetting = await AppSetting.findOne();

    // var extraPrice = 0;

    // if (hasBreakFast) {
    //   extraPrice =
    //     Number(guestsNum) * Number(nightsNum) * appSetting?.breakfastPrice;
    // }

    // const totalPrice = cabin?.regularPrice + Number(extraPrice);

    // const booking = await Booking.create({
    //   startData,
    //   endDate,
    //   nightsNum,
    //   guestsNum,
    //   cabinPrice: cabin?.regularPrice,
    //   extraPrice,
    //   totalPrice,
    //   hasBreakFast,
    //   cabinId: id,
    //   guestId: userId,
    // });
    // if (booking) {
    //   await cabin.updateOne({ isBooked: true });
    //   io.emit("notify_booking", booking);
    // }
    res
      .status(200)
      .json({ success: true, message: "Booking completed successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while adding booking${error.message}`,
    });
  }
};

export const getBookings = async (req, res) => {
  const filter = req.query.filters;
  const sortBy = req.query.sortBy;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    let query = Booking.find({});
    const count = await Booking.countDocuments();
    const totalPages = Math.ceil(count / limit);

    if (sortBy) {
      if (sortBy.direction === "desc") {
        query = query.sort({ [sortBy.field]: -1 });
      } else {
        query = query.sort({ [sortBy.field]: 1 });
      }
    }
    if (filter) {
      // TODO: Modify this section for status because of modifying the schema
      if (filter.value === "checked-out") {
        query = query.where({ status: { $eq: true } });
      } else if (filter.value === "checked-in") {
        query = query.where({ status: { $eq: true } });
      } else {
        query = query.where({ status: { $eq: false } });
      }
    } else {
      query = query;
    }

    const bookings = await Booking.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ success: true, bookings, count });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while getting bookings${error.message}`,
    });
  }
};

export const getBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res
        .status(400)
        .json({ success: false, message: "Booking not found" });
    }
    const guestId = booking.guestId;
    const cabinId = booking.cabinId;
    const guest = await User.findById(guestId).select("-password");
    const cabin = await Cabin.findById(cabinId).select(
      "-maxCapacity -regularPrice -discount -description -image"
    );
    if (!guest || !cabin) {
      return res
        .status(400)
        .json({ success: false, message: "Guest or Cabin not found" });
    }

    const data = {
      booking,
      guest,
      cabin,
    };
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while getting booking ${error.message}`,
    });
  }
};

// TODO: Modify this function because of status
export const updateStatusAndPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const checkBooking = await Booking.findById(id);
    if (!checkBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const booking = await checkBooking.updateOne(
      {
        $set: {
          isPaid: !checkBooking?.isPaid,
          status: !checkBooking?.status,
        },
      },
      {
        new: true,
      }
    );
    if (booking) res.status(200).json({ success: true, booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `internal Error while updating booking`,
    });
  }
};

export const updateBookingPrices = async (req, res) => {
  try {
    const { id } = req.params;
    const { hasBreakFast, totalPrice, extraPrice } = req.body;
    const checkBooking = await Booking.findById(id);
    if (!checkBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    const booking = await checkBooking.updateOne(
      {
        $set: {
          hasBreakFast,
          totalPrice,
          extraPrice,
        },
      },
      {
        new: true,
      }
    );
    console.log(booking);
    if (booking) res.status(200).json({ success: true, booking });
  } catch (error) {
    console.log(error);
  }
};

export const checkOutAndSendEmail = async (req, res) => {
  try {
    const id = req.admin;
    const bookingDetails = req.body;
    // console.log(bookingDetails);

    // console.log(req.body);

    const pdfFilePath = await generatePdf(bookingDetails);
    await sendEmail(
      bookingDetails?.guest?.email,
      "Your Booking Information.",
      "Here is Your Booking Reciept.",
      pdfFilePath
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not Found" });
    }

    const deleted = await booking.deleteOne();
    if (deleted)
      res.status(200).json({
        success: true,
        message: "Booking deleted successfully.",
        data: deleted,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while deleting booking${error?.message}`,
    });
  }
};

// For getting booking of last 7, 30 and 90 days
export const getStaysAfterDate = async (req, res) => {
  try {
    const latest = parseInt(req.body.latest);

    if (isNaN(latest) || latest < 1) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid number of days" });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - latest);
    startDate.setHours(0, 0, 0, 0);

    const bookings = await Booking.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $lookup: {
          from: "cabins",
          localField: "cabinId",
          foreignField: "_id",
          as: "cabinDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "guestId",
          foreignField: "_id",
          as: "guestDetails",
        },
      },
      { $unwind: "$cabinDetails" },
      { $unwind: "$guestDetails" },
      { $sort: { createdAt: -1 } },
    ]);

    // const bookings = await Booking.find({ createdAt: { $gte: startDate } })
    //   .papulate("cabins", "name regularPrice")
    //   .papulate("users", "name email")
    //   .sort({ createdAt: -1 });
    // let today = new Date();
    // let days = today.getDate() - latest;
    // let month = today.getMonth() + 1;
    // let year = today.getFullYear();

    // if (days < 0) {
    //   month -= 1;
    // }
    // if (month < 0) {
    //   year -= 1;
    // }
    // const lastDate = new Date(year, month, days);

    // const bookings = await Booking.find({
    //   createdAt: { $lt: today, $gt: lastDate },
    // });
    // let bookingsWithData = [];
    // for (let i = 0; i < bookings?.length; i++) {
    //   const cabinData = await Cabin.find(bookings[i].cabinId).select(
    //     "-maxCapacity -discount -description -image"
    //   );
    //   console.log(cabinData)
    //   // bookingsWithData.push(cabinData);
    // }
    // const userData = await User.findById(bookings[i].guestId).select(
    //   "-password"
    // );
    // console.log(userData)
    // bookings.push(userData);

    // console.log(bookings);
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while getting last stays booking ${error?.message}`,
    });
  }
};

export const getTodayActivity = async (req, res) => {
  try {
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    const bookings = await Booking.aggregate([
      {
        $match: {
          // $and: [{status: false},{isPaid: false}],
          // isPaid: false,
          // status: false,
          $or: [
            { startData: { $gte: todayStart, $lte: todayEnd } },
            { endDate: { $gte: todayStart, $lte: todayEnd } },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "guestId",
          foreignField: "_id",
          as: "guest",
        },
      },
      { $unwind: "$guest" },
    ]);
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while getting today activity${error.message}`,
    });
  }
};
