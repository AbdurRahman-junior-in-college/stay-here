import AppSetting from "../models/appSetting.model.js";
import { Cabin } from "../models/cabin.model.js";

export const updateSetting = async (req, res) => {
  try {
    const bodyValue = req.body;
    if (!bodyValue) {
      return res.json({
        success: false,
        message: "New Value does not provided",
      });
    }

    // let minNightsValue = bodyValue["minNights"];
    // const setting = await AppSetting.findOneAndUpdate(
    //   { minNights: bodyValue["minNights"] },
    //   { $set: { minNights: bodyValue["minNights"] } },
    // );
    const setting = await AppSetting.findOne({});
    // console.log(setting);

    if (bodyValue["minNights"]) {
      const minNightsValue = bodyValue["minNights"];
      await setting.updateOne({ $set: { minNights: minNightsValue } });
      return res.json({
        success: true,
        message: "Setting updated successfully",
      });
    } else if (bodyValue["maxNights"]) {
      const maxNightsValue = bodyValue["maxNights"];
      await setting.updateOne({ $set: { maxNights: maxNightsValue } });
      return res.json({
        success: true,
        message: "Setting updated successfully",
      });
    } else if (bodyValue["maxGuests"]) {
      const maxGuestsValue = bodyValue["maxGuests"];
      await setting.updateOne({ $set: { maxGuests: maxGuestsValue } });
      return res.json({
        success: true,
        message: "Setting updated successfully",
      });
    } else if (bodyValue["breakfastPrice"]) {
      const breakfastPriceValue = bodyValue["breakfastPrice"];
      await setting.updateOne({
        $set: { breakfastPrice: breakfastPriceValue },
      });
      return res.json({
        success: true,
        message: "Setting updated successfully",
      });
    } else {
      return res.json({ success: false, message: "No Value Provided" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Error" });
  }
};

export async function addAppSetting() {
  try {
    const setting = await AppSetting.create({
      maxGuests: 90,
      maxNights: 6,
      minNights: 1,
      breakfastPrice: 20,
    });
    if (setting) {
      console.log("Addedd");
    }
  } catch (error) {
    console.log(error);
  }
}

export const getAppSetting = async (req, res) => {
  try {
    // // const cabins = await Cabin.find({});

    // // const maxGuests = cabins.reduce((prev, max) => {
    // //   return (prev += max.maxCapacity);
    // // });
    // // let maxGuests = 0;

    // // for (let i = 0; i < cabins.length - 1; i++) {
    // //   maxGuests += cabins[i].maxCapacity;
    // // }
    // const setting = {
    //   maxGuests,
    //   maxNights: 3,
    //   minNights: 2,
    //   breakfastPrice: 20,
    // };

    // // console.log(setting);
    // await AppSetting.create({
    //   maxGuests,
    //   maxNights: 3,
    //   minNights: 2,
    //   breakfastPrice: 20,
    // });

    const setting = await AppSetting.find();
    res.json({ success: true, setting });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal Error while getting settings ${error.message}`,
    });
  }
};
