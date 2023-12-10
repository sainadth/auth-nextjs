import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const con = mongoose.connection;

    con.on("connected", () => {
      console.log("mongoDB connected successfully");
    });

    con.on("error", (error) => {
      console.log("mongoDB connection failed " + error);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
