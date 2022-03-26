import mongoose from "mongoose";

const User = mongoose.Schema({
  name: String,
  email: String,
  ID: String,
  password: String,
  type: String,
});

export default mongoose.model("User_Details", User);
