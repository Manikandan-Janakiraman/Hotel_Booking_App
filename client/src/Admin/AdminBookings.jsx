// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   const showMessage = (msg, type = "success") => {
//     setMessage(msg);
//     setMessageType(type);
//     setTimeout(() => setMessage(""), 3000);
//   };

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/bookings");
//       setBookings(res.data);
//     } catch (err) {
//       showMessage("Failed to fetch bookings", "error");
//     }
//   };

//   const cancelBooking = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/bookings/${id}/cancel`);
//       showMessage("Booking Cancelled");
//       fetchBookings();
//     } catch (err) {
//       showMessage("Cancel failed", "error");
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">

//       {/* ALERT MESSAGE */}
//       {message && (
//         <div
//           className={`mb-6 p-4 rounded-xl text-white font-semibold shadow-lg ${
//             messageType === "success" ? "bg-green-500" : "bg-red-500"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-[600px] overflow-y-auto">

//         <h2 className="text-2xl font-bold text-gray-700 mb-6">
//           Booking List
//         </h2>

//         {bookings.length === 0 && (
//           <p className="text-gray-500 text-center mt-10">
//             No bookings found
//           </p>
//         )}

//         <div className="space-y-6">

//           {bookings.map((b) => (
//             <div
//               key={b._id}
//               className={`border rounded-xl p-6 shadow-md ${
//                 b.status === "Cancelled"
//                   ? "bg-red-50 border-red-400"
//                   : "border-gray-200"
//               }`}
//             >

//               {/* MAIN INFO */}
//               <h3 className="text-xl font-bold text-red-500 mb-2">
//                 {b.name}
//               </h3>

//               <p className="text-sm text-gray-600">
//                 📱 Mobile: {b.mobile}
//               </p>

//               <p className="text-sm text-gray-600">
//                 🆔 Aadhar: {b.aadhar}
//               </p>

//               <p className="text-sm text-gray-600">
//                 📅 Check In: {new Date(b.checkIn).toLocaleDateString()}
//               </p>

//               <p className="text-sm text-gray-600">
//                 📅 Check Out: {new Date(b.checkOut).toLocaleDateString()}
//               </p>

//               <p className="text-sm text-gray-600">
//                 👥 Guests: {b.guests}
//               </p>

//               {/* GUEST DETAILS */}
//               {b.guestDetails && b.guestDetails.length > 0 && (
//                 <div className="mt-3">
//                   <p className="font-semibold text-gray-700">
//                     Guest Details:
//                   </p>

//                   {b.guestDetails.map((guest, index) => (
//                     <div key={index} className="text-sm text-gray-600 ml-3">
//                       • {guest.name} | Age: {guest.age} | Proof: {guest.proof}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* PAYMENT INFO */}
//               <div className="mt-3 text-sm text-gray-600">
//                 💳 Payment Method: {b.paymentMethod}
//               </div>

//               <div className="text-sm text-gray-600">
//                 📲 Payment Mobile: {b.paymentMobile}
//               </div>

//               {/* STATUS */}
//               <div className="mt-3">
//                 Status:{" "}
//                 <span
//                   className={
//                     b.status === "Cancelled"
//                       ? "text-red-600 font-semibold"
//                       : "text-green-600 font-semibold"
//                   }
//                 >
//                   {b.status || "Booked"}
//                 </span>
//               </div>

//               {/* CREATED DATE */}
//               <div className="text-xs text-gray-400 mt-2">
//                 Created At: {new Date(b.createdAt).toLocaleString()}
//               </div>

//               {/* CANCEL BUTTON */}
//               {b.status !== "Cancelled" && (
//                 <button
//                   onClick={() => cancelBooking(b._id)}
//                   className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                 >
//                   Cancel Booking
//                 </button>
//               )}

//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminBookings;

import { useEffect, useState } from "react";
import axios from "axios";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      showMessage("Failed to fetch bookings", "error");
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/cancel`);
      showMessage("Booking Cancelled");
      fetchBookings();
    } catch (err) {
      showMessage("Cancel failed", "error");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-white p-10">

      {message && (
        <div
          className={`mb-6 p-4 rounded-xl text-white font-semibold shadow-md ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {bookings.length === 0 && (
        <p className="text-gray-400 text-center mt-20">
          No bookings available
        </p>
      )}

      {/* 3 COLUMN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {bookings.map((b) => (
          <div
            key={b._id}
            className="relative bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >

            {/* Soft Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-200/20 to-purple-200/20 pointer-events-none"></div>

            <div className="relative z-10">

              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {b.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(b.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    b.status === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {b.status || "Booked"}
                </span>
              </div>

              <div className="my-4 border-t border-gray-200"></div>

              {/* Info */}
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-medium text-gray-500">Mobile:</span> {b.mobile}</p>
                <p><span className="font-medium text-gray-500">Aadhar:</span> {b.aadhar}</p>
                <p><span className="font-medium text-gray-500">Check In:</span> {new Date(b.checkIn).toLocaleDateString()}</p>
                <p><span className="font-medium text-gray-500">Check Out:</span> {new Date(b.checkOut).toLocaleDateString()}</p>
                <p><span className="font-medium text-gray-500">Guests:</span> {b.guests}</p>
                <p><span className="font-medium text-gray-500">Payment:</span> {b.paymentMethod}</p>
                <p><span className="font-medium text-gray-500">Payment Mobile:</span> {b.paymentMobile}</p>
              </div>

              {/* Guest Details */}
              {b.guestDetails?.length > 0 && (
                <div className="mt-4 bg-white/40 backdrop-blur-md rounded-xl p-3 border border-white/20">
                  <p className="font-semibold text-gray-700 mb-1 text-sm">
                    Guests
                  </p>
                  {b.guestDetails.map((guest, index) => (
                    <p key={index} className="text-xs text-gray-600">
                      • {guest.name} | {guest.age} yrs | {guest.proof}
                    </p>
                  ))}
                </div>
              )}

              {/* Cancel */}
              {b.status !== "Cancelled" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="mt-5 w-full bg-red-500 text-white py-2 rounded-xl text-sm font-semibold hover:bg-red-600 transition"
                >
                  Cancel Booking
                </button>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminBookings;
