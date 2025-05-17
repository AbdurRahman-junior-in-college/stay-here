import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Mongo Db Connected");
    });
    console.log(process.env.MONGODB_URL)
    await mongoose.connect(`${process.env.MONGODB_URL}/ecommercedash`);
  } catch (error) {
    console.log(`MONGODB CONNECTION FAILED ${error.message}`);
  }
};
export default dbConnection;
