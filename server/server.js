import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import menuRoutes from  "./routes/menuRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"



dotenv.config();

const app = express();


// middleware
app.use(express.json());

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use(cors())

app.use(cors({
  origin: "https://hotel-booking-app-2lg2.onrender.com",
  credentials: true
}));

// connect DB
connectDB();
    
// ROUTES
app.use("/api/auth", authRoutes);
app.use("https://hotel-booking-app-2lg2.onrender.com/api/properties", propertyRoutes);
app.use("https://hotel-booking-app-2lg2.onrender.com/api/menus", menuRoutes);


app.use("https://hotel-booking-app-2lg2.onrender.com/api/bookings", bookingRoutes);


// app.use("/api/admin/adminprofile", administrator)


app.use("/uploads", express.static("uploads"));



app.listen(process.env.PORT || 5000, () => {
  console.log("Server started");
});



app.get("/", (req, res) => {
  res.send("Hotel Booking API Running");
});

