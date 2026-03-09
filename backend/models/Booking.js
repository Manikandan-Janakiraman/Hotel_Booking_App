import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: String,
  age: Number,
  proof: String
});

const bookingSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  aadhar: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  guestDetails: Array,
  paymentMethod: String,
  paymentMobile: String,
  status: {
    type: String,
    default: "Booked"
  }
}, { timestamps: true });


export default mongoose.model("Booking", bookingSchema);
