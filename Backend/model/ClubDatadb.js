import mongoose from "mongoose";

const clubData = mongoose.Schema({
  ID: String,
  name: {
    type: String,
  },
  descriptiom: {
    type: String,
  },
  members: {
    type: Array,
  },
  img: {
    type: String,
  },
  resources: {
    type: Array,
  },
  events: {
    type: Array,
  },
  projects: {
    type: Array,
  },
});

export default mongoose.model("clubs_data", clubData);
