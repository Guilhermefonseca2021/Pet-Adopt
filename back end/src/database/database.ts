import mongoose from "mongoose";
import connect from "../config/connect";

async function connectDatabase() {
  await mongoose.connect(`${connect.database}`);
}

export default connectDatabase;
