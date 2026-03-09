import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    city: String,
    type: String,
    facilities: [String],
    essentials: [String],
    accessibility: [String],
    distance: Number,
    review: String,
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);



export default Property;
