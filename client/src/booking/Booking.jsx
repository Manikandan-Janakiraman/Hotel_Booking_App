// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Plus, Minus } from "lucide-react";
// import axios from "axios";

// const Booking = () => {

//   const navigate = useNavigate();

//   const [guests, setGuests] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [step, setStep] = useState(1);

//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [paymentMobile, setPaymentMobile] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     aadhar: "",
//     checkIn: "",
//     checkOut: ""
//   });

//   const [guestDetails, setGuestDetails] = useState([
//     { name: "", age: "", proof: "" }
//   ]);

//   const totalSteps = 4;

//   const increment = () => {
//     setGuests(prev => prev + 1);
//     setGuestDetails([...guestDetails, { name: "", age: "", proof: "" }]);
//   };

//   const decrement = () => {
//     if (guests > 1) {
//       setGuests(prev => prev - 1);
//       setGuestDetails(guestDetails.slice(0, -1));
//     }
//   };

//   const nextStep = () => {
//     if (step < totalSteps) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleSubmit = async () => {

//     if (!selectedPayment) {
//       alert("Select payment method");
//       return;
//     }

//     try {

//       await axios.post("http://localhost:5000/api/bookings", {
//         ...formData,
//         guests,
//         guestDetails,
//         paymentMethod: selectedPayment,
//         paymentMobile
//       });

//       alert("Payment Processed ✅\nRoom Booked Successfully!");

//       setShowModal(false);
//       navigate("/");

//     } catch (err) {
//       alert("Booking Failed");
//       console.log(err);
//     }
//   };

//   const progressPercentage = (step / totalSteps) * 100;

//   return (
//     <div className="bg-gradient-to-br from-red-100 to-red-200 min-h-screen p-10">

//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">

//         <h1 className="text-3xl font-bold mb-6 text-gray-800">
//           Premium Luxe Room ⭐⭐⭐⭐
//         </h1>

//         <div className="flex items-center justify-between border rounded-xl px-4 py-3 w-52 mb-6">
//           <button onClick={decrement}><Minus size={18} /></button>
//           <span className="text-lg font-semibold">{guests}</span>
//           <button onClick={increment}><Plus size={18} /></button>
//         </div>

//         <h2 className="text-2xl font-bold mb-2">₹ 4,599</h2>
//         <p className="text-sm text-gray-500 mb-6">+ ₹230 taxes & fees</p>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
//         >
//           Book Now
//         </button>
//       </div>

//       {/* ================= MODAL ================= */}

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

//           <div className="bg-white w-[600px] p-8 rounded-3xl shadow-2xl relative">

//             {/* Progress Bar */}
//             <div className="mb-6">
//               <div className="w-full bg-gray-200 h-2 rounded-full">
//                 <div
//                   className="bg-red-500 h-2 rounded-full transition-all duration-500"
//                   style={{ width: `${progressPercentage}%` }}
//                 ></div>
//               </div>
//               <p className="text-right text-sm mt-2 text-gray-500">
//                 Step {step} of {totalSteps}
//               </p>
//             </div>

//             {/* STEP CONTENT */}

//             {step === 1 && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="border p-3 w-full rounded-lg mb-3"
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 />

//                 <input
//                   type="text"
//                   placeholder="Mobile Number"
//                   className="border p-3 w-full rounded-lg mb-3"
//                   onChange={(e) => setFormData({...formData, mobile: e.target.value})}
//                 />

//                 <input
//                   type="text"
//                   placeholder="Aadhar Number"
//                   className="border p-3 w-full rounded-lg"
//                   onChange={(e) => setFormData({...formData, aadhar: e.target.value})}
//                 />
//               </div>
//             )}

//             {step === 2 && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Guest Details</h2>

//                 {guestDetails.map((guest, index) => (
//                   <div key={index} className="border p-4 rounded-xl mb-3">
//                     <input
//                       type="text"
//                       placeholder="Guest Name"
//                       className="border p-2 w-full rounded mb-2"
//                       onChange={(e) => {
//                         const updated = [...guestDetails];
//                         updated[index].name = e.target.value;
//                         setGuestDetails(updated);
//                       }}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Age"
//                       className="border p-2 w-full rounded mb-2"
//                       onChange={(e) => {
//                         const updated = [...guestDetails];
//                         updated[index].age = e.target.value;
//                         setGuestDetails(updated);
//                       }}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Proof ID"
//                       className="border p-2 w-full rounded"
//                       onChange={(e) => {
//                         const updated = [...guestDetails];
//                         updated[index].proof = e.target.value;
//                         setGuestDetails(updated);
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {step === 3 && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Stay Dates</h2>

//                 <label className="text-sm text-gray-600">Check In</label>
//                 <input
//                   type="date"
//                   className="border p-3 w-full rounded-lg mb-3"
//                   onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
//                 />

//                 <label className="text-sm text-gray-600">Check Out</label>
//                 <input
//                   type="date"
//                   className="border p-3 w-full rounded-lg"
//                   onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
//                 />
//               </div>
//             )}

//             {step === 4 && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Payment</h2>

//                 <div className="flex flex-col gap-3 mb-4">
//                   <label className="border p-3 rounded-lg cursor-pointer">
//                     <input
//                       type="radio"
//                       value="GPay"
//                       name="payment"
//                       onChange={(e) => setSelectedPayment(e.target.value)}
//                     /> GPay
//                   </label>

//                   <label className="border p-3 rounded-lg cursor-pointer">
//                     <input
//                       type="radio"
//                       value="PhonePe"
//                       name="payment"
//                       onChange={(e) => setSelectedPayment(e.target.value)}
//                     /> PhonePe
//                   </label>
//                 </div>

//                 {(selectedPayment === "GPay" || selectedPayment === "PhonePe") && (
//                   <input
//                     type="text"
//                     placeholder="Payment Mobile Number"
//                     className="border p-3 w-full rounded-lg"
//                     onChange={(e) => setPaymentMobile(e.target.value)}
//                   />
//                 )}
//               </div>
//             )}

//             {/* Buttons */}
//             <div className="flex justify-between mt-8">

//               {step > 1 && (
//                 <button
//                   onClick={prevStep}
//                   className="px-5 py-2 border rounded-lg"
//                 >
//                   Back
//                 </button>
//               )}

//               {step < totalSteps ? (
//                 <button
//                   onClick={nextStep}
//                   className="ml-auto bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSubmit}
//                   className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//                 >
//                   Confirm & Pay
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Booking;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import axios from "axios";

const Booking = () => {

  const navigate = useNavigate();

  /* ================= PRICE ================= */
  const basePrice = 4599;
  const tax = 230;

  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentMobile, setPaymentMobile] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    aadhar: "",
    checkIn: "",
    checkOut: ""
  });

  const [guestDetails, setGuestDetails] = useState([
    { name: "", age: "", proof: "" }
  ]);

  const totalSteps = 4;

  /* ================= ROOM CONTROLS ================= */

  const incrementRoom = () => setRooms(prev => prev + 1);
  const decrementRoom = () => rooms > 1 && setRooms(prev => prev - 1);

  /* ================= GUEST CONTROLS ================= */

  const incrementGuest = () => {
    setGuests(prev => prev + 1);
    setGuestDetails([...guestDetails, { name: "", age: "", proof: "" }]);
  };

  const decrementGuest = () => {
    if (guests > 1) {
      setGuests(prev => prev - 1);
      setGuestDetails(guestDetails.slice(0, -1));
    }
  };

  /* ================= PRICE CALCULATION ================= */

  // const totalPrice = rooms * basePrice;
  // const totalTax = rooms * tax;
  // const grandTotal = totalPrice + totalTax;

  /* ================= PRICE CALCULATION ================= */

  // Extra charge per additional guest
  const extraGuestCharge = 1000;

  // Guest price calculation
  const guestExtraAmount =
    guests > 1 ? (guests - 1) * extraGuestCharge : 0;

  const totalPrice = (rooms * basePrice) + guestExtraAmount;
  const totalTax = rooms * tax;
  const grandTotal = totalPrice + totalTax;

  /* ================= STEP CONTROLS ================= */

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const progressPercentage = (step / totalSteps) * 100;

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {

    if (!selectedPayment) {
      alert("Select payment method");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...formData,
        rooms,
        guests,
        guestDetails,
        paymentMethod: selectedPayment,
        paymentMobile,
        totalAmount: grandTotal,
        status: "Booked"
      });

      alert("Payment Processed ✅\nRoom Booked Successfully!");
      setShowModal(false);
      navigate("/");

    } catch (err) {
      alert("Booking Failed");
      console.log(err);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">

      {/* ===== HERO SECTION ===== */}
      <div className="relative h-[500px] w-full">

        <img
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-6">
          <h1 className="text-5xl font-bold tracking-wide mb-4">
            Premium Luxe Room
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Experience unmatched comfort, world-class amenities,
            and breathtaking ambience designed for luxury travelers.
          </p>
        </div>
      </div>

      {/* ===== FLOATING GLASS CARD ===== */}
      <div className="-mt-32 px-6">
        <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl p-10 border border-white/40">

          {/* PROPERTY INFO */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div>

              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                5 Star Luxury Stay ⭐⭐⭐⭐⭐
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                Indulge in elegance with panoramic balcony views,
                private lounge seating, curated interiors, and
                complimentary gourmet breakfast.
              </p>


              {/* AMENITIES */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Free WiFi",
                  "Infinity Pool",
                  "Private Balcony",
                  "24/7 Room Service",
                  "Smart TV",
                  "Premium AC",
                  "Free Parking",
                  "Breakfast Included"
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-xl p-3 text-center text-sm font-medium hover:shadow-lg transition"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                * Room tariff includes 1 guest. 
                Additional guest charges: ₹1000 per person.
              </p>

            </div>

            {/* RIGHT SIDE BOOKING PANEL */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border">

              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Reserve Your Stay
              </h3>

              {/* ROOM SELECTOR */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-medium text-gray-600">Rooms</span>
                <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-2">
                  <button onClick={decrementRoom} className="hover:scale-110 transition">
                    <Minus size={18} />
                  </button>
                  <span className="font-semibold text-lg">{rooms}</span>
                  <button onClick={incrementRoom} className="hover:scale-110 transition">
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* GUEST SELECTOR */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-medium text-gray-600">Guests</span>
                <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-2">
                  <button onClick={decrementGuest}>
                    <Minus size={18} />
                  </button>
                  <span className="font-semibold text-lg">{guests}</span>
                  <button onClick={incrementGuest}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* PRICE SECTION */}
              <div className="border-t pt-6 mb-6">

                <div className="flex justify-between mb-2">
                  <span>Room Price</span>
                  <span>₹ {totalPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between mb-2 text-gray-500">
                  <span>Taxes</span>
                  <span>₹ {totalTax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span className="text-red-500">
                    ₹ {grandTotal.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all shadow-lg"
              >
                Book Now
              </button>

            </div>

          </div>
        </div>
      </div>


      {/* ================= MODAL ================= */}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white w-[650px] p-8 rounded-3xl shadow-2xl">

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-right text-sm mt-2 text-gray-500">
                Step {step} of {totalSteps}
              </p>
            </div>

            {/* STEP CONTENT */}

            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-3 w-full rounded-lg mb-3"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <input
                  type="text"
                  placeholder="Mobile"
                  className="border p-3 w-full rounded-lg mb-3"
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />

                <input
                  type="text"
                  placeholder="Aadhar"
                  className="border p-3 w-full rounded-lg"
                  onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                />
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Guest Details</h2>

                {guestDetails.map((guest, index) => (
                  <div key={index} className="border p-4 rounded-xl mb-3">
                    <input
                      type="text"
                      placeholder="Guest Name"
                      className="border p-2 w-full rounded mb-2"
                      onChange={(e) => {
                        const updated = [...guestDetails];
                        updated[index].name = e.target.value;
                        setGuestDetails(updated);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      className="border p-2 w-full rounded mb-2"
                      onChange={(e) => {
                        const updated = [...guestDetails];
                        updated[index].age = e.target.value;
                        setGuestDetails(updated);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Proof ID"
                      className="border p-2 w-full rounded"
                      onChange={(e) => {
                        const updated = [...guestDetails];
                        updated[index].proof = e.target.value;
                        setGuestDetails(updated);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Stay Dates</h2>

                <input
                  type="date"
                  className="border p-3 w-full rounded-lg mb-3"
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                />

                <input
                  type="date"
                  className="border p-3 w-full rounded-lg"
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                />
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment</h2>

                <label className="block mb-3">
                  <input
                    type="radio"
                    value="GPay"
                    name="payment"
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  /> GPay
                </label>

                <label className="block mb-3">
                  <input
                    type="radio"
                    value="PhonePe"
                    name="payment"
                    onChange={(e) => setSelectedPayment(e.target.value)}
                  /> PhonePe
                </label>

                <input
                  type="text"
                  placeholder="Payment Mobile Number"
                  className="border p-3 w-full rounded-lg mt-3"
                  onChange={(e) => setPaymentMobile(e.target.value)}
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button onClick={prevStep} className="px-5 py-2 border rounded-lg">
                  Back
                </button>
              )}

              {step < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="ml-auto bg-red-500 text-white px-6 py-2 rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="ml-auto bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Confirm & Pay ₹ {grandTotal.toLocaleString()}
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Booking;
