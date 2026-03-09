import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, default: 1 }
});

export default mongoose.model("Menu", menuSchema);
