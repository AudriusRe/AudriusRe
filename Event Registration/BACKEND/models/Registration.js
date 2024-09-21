import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  dob: {
    type: String,
    require: true,
  },
});

export default mongoose.model("registration", registrationSchema);
