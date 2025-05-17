import Booking from "../models/booking.model.js";

export const isAvailable = async (cabinId, startData, endDate) => {
  const overLappingBooking = await Booking.findOne({
    cabinId,
    $or: [{ startData: { $gt: endDate } }, { endDate: { $lt: startData } }],
  });

  return !overLappingBooking
};
