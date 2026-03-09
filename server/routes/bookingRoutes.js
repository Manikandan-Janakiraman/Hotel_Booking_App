import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* ================= CREATE BOOKING ================= */

router.post("/", async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      date: new Date(),   // auto save booking date
      status: "Booked"
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      booking
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/* ================= GET ALL BOOKINGS (Admin) ================= */

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Cancel booking
router.put("/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );

    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
