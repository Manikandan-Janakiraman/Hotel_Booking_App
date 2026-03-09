import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();

  // FILTER STATES
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [facility, setFacility] = useState("");
  const [essential, setEssential] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [review, setReview] = useState("");

  // FETCH DATA
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await axios.get("https://hotel-booking-app-2lg2.onrender.com/api/properties");
    setProperties(res.data);
    setFilteredProperties(res.data);
  };

  // APPLY FILTERS
  useEffect(() => {
    const filtered = properties.filter((p) => {
      return (
        (!city || p.city?.toLowerCase().includes(city.toLowerCase())) &&
        (!type || p.type === type) &&
        (!description || p.description === description) &&
        (!facility || p.facilities?.includes(facility)) &&
        (!essential || p.essentials?.includes(essential)) &&
        (!accessibility || p.accessibility?.includes(accessibility)) &&
        (!review || p.review === review)
      );
    });

    setFilteredProperties(filtered);
  }, [
    city,
    type,
    description,
    facility,
    essential,
    accessibility,
    review,
    properties,
  ]);

  return (
    <div className="bg-red-100 min-h-screen px-4 md:px-14 py-6 md:py-10 flex flex-col md:flex-row gap-6">

      {/* FILTER PANEL */}
      <div className="w-full md:w-[22%] bg-white rounded-2xl shadow-lg p-6 h-fit md:sticky md:top-5 mt-5">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <label className="text-sm font-medium">Where to?</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mt-2 mb-4"
          placeholder="Search city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <FilterSection title="Property Type">
          <FilterButton onClick={() => setType("Apartment")}>Apartment</FilterButton>
          <FilterButton onClick={() => setType("Hotel")}>Hotel</FilterButton>
          <FilterButton onClick={() => setType("Resort")}>Resort</FilterButton>
        </FilterSection>

        <FilterSection title="Essentials">
          <FilterButton onClick={() => setEssential("Washing Machine")}>Washing Machine</FilterButton>
          <FilterButton onClick={() => setEssential("Dryer")}>Dryer</FilterButton>
          <FilterButton onClick={() => setEssential("Iron")}>Iron</FilterButton>
        </FilterSection>

        <FilterSection title="Facilities">
          <FilterButton onClick={() => setFacility("AC")}>AC</FilterButton>
          <FilterButton onClick={() => setFacility("SPA")}>Spa</FilterButton>
          <FilterButton onClick={() => setFacility("Beach View")}>Beach View</FilterButton>
        </FilterSection>

        {/* <FilterSection title="Distance">
          <FilterButton onClick={() => setDistance(5)}>Under 5 km</FilterButton>
          <FilterButton onClick={() => setDistance(25)}>Under 25 km</FilterButton>
          <FilterButton onClick={() => setDistance(50)}>Under 50 km</FilterButton>
        </FilterSection> */}

        <FilterSection title="Accessibility">
          <FilterButton onClick={() => setAccessibility("Emergency")}>Emergency</FilterButton>
          <FilterButton onClick={() => setAccessibility("Lower Sink")}>Lower Sink</FilterButton>
        </FilterSection>

        <FilterSection title="Review">
          <FilterButton onClick={() => setReview("Excellent")}>Excellent</FilterButton>
          <FilterButton onClick={() => setReview("Good")}>Good</FilterButton>
        </FilterSection>

        <button
          className="mt-6 w-full border border-red-400 text-red-500 py-2 rounded-xl hover:bg-red-400 hover:text-white transition"
          onClick={() => {
            setCity("");
            setType("");
            setDescription("");
            setFacility("");
            setEssential("");
            setAccessibility("");

            setReview("");
            setFilteredProperties(properties);
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* PROPERTY LIST */}
      <div className="w-full md:w-[45%] flex flex-col gap-5 mt-5">
        {filteredProperties.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">
            No properties found
          </p>
        ) : (
          filteredProperties.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-lg flex flex-col md:flex-row overflow-hidden hover:shadow-xl rounded-2xl transition"
            >
              {/* IMAGE */}
              <div className="w-full md:w-[40%]">
                {p.image ? (
                  <img
                    src={`https://hotel-booking-app-2lg2.onrender.com/uploads/${p.image}`}
                    alt={p.name}
                    className="w-full h-60 md:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="p-5 flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Premium stay in {p.city}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    About {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Tag>{p.type}</Tag>
                    <Tag>{p.review}</Tag>
                    {p.facilities?.map((f, i) => (
                      <Tag key={i}>{f}</Tag>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/booking/${p._id}`)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl w-full md:w-fit hover:bg-red-600"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* COMPONENTS */

const FilterSection = ({ title, children }) => (
  <div className="mb-5">
    <h3 className="font-medium text-sm mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const FilterButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="border px-3 py-1 rounded-lg text-sm hover:bg-red-400 hover:text-white transition"
  >
    {children}
  </button>
);

const Tag = ({ children }) => (
  <span className="border px-2 py-1 rounded-md text-xs text-gray-600">
    {children}
  </span>
);

export default Properties;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Properties = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const navigate = useNavigate();

//   // FILTER STATES
//   const [city, setCity] = useState("");
//   const [type, setType] = useState("");
//   const [description, setDescription] = useState("");
//   const [facility, setFacility] = useState("");
//   const [essential, setEssential] = useState("");
//   const [accessibility, setAccessibility] = useState("");
//   const [distance, setDistance] = useState(null);
//   const [review, setReview] = useState("");

//   // FETCH DATA
//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     const res = await axios.get("http://localhost:5000/api/properties");
//     setProperties(res.data);
//     setFilteredProperties(res.data);
//   };

//   // APPLY FILTERS
//   useEffect(() => {
//     const filtered = properties.filter((p) => {
//       return (
//         (!city || p.city?.toLowerCase().includes(city.toLowerCase())) &&
//         (!type || p.type === type) &&
//         (!description || p.description === description) &&
//         (!facility || p.facilities?.includes(facility)) &&
//         (!essential || p.essentials?.includes(essential)) &&
//         (!accessibility || p.accessibility?.includes(accessibility)) &&
//         (!distance || Number(p.distance) <= distance) &&
//         (!review || p.review === review)
//       );
//     });

//     setFilteredProperties(filtered);
//   }, [
//     city,
//     type,
//     description,
//     facility,
//     essential,
//     accessibility,
//     distance,
//     review,
//     properties,
//   ]);

//   return (
//     <div className="bg-red-100 min-h-screen px-4 md:px-14 py-6 md:py-10 flex flex-col md:flex-row gap-6">

//       {/* FILTER PANEL */}
//       <div className="w-full md:w-[25%] bg-white rounded-2xl shadow-lg p-6 h-fit md:sticky md:top-5 mt-5">
//         <h2 className="text-xl font-semibold mb-4">Filters</h2>

//         <label className="text-sm font-medium">Where to?</label>
//         <input
//           className="w-full border rounded-lg px-3 py-2 mt-2 mb-4"
//           placeholder="Search city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />

//         <FilterSection title="Property Type">
//           <FilterButton onClick={() => setType("Apartment")}>Apartment</FilterButton>
//           <FilterButton onClick={() => setType("Hotel")}>Hotel</FilterButton>
//           <FilterButton onClick={() => setType("Resort")}>Resort</FilterButton>
//         </FilterSection>

//         <FilterSection title="Essentials">
//           <FilterButton onClick={() => setEssential("Washing Machine")}>Washing Machine</FilterButton>
//           <FilterButton onClick={() => setEssential("Dryer")}>Dryer</FilterButton>
//           <FilterButton onClick={() => setEssential("Iron")}>Iron</FilterButton>
//         </FilterSection>

//         <FilterSection title="Facilities">
//           <FilterButton onClick={() => setFacility("AC")}>AC</FilterButton>
//           <FilterButton onClick={() => setFacility("SPA")}>Spa</FilterButton>
//           <FilterButton onClick={() => setFacility("Beach View")}>Beach View</FilterButton>
//         </FilterSection>

//         <FilterSection title="Distance">
//           <FilterButton onClick={() => setDistance(5)}>Under 5 km</FilterButton>
//           <FilterButton onClick={() => setDistance(25)}>Under 25 km</FilterButton>
//           <FilterButton onClick={() => setDistance(50)}>Under 50 km</FilterButton>
//         </FilterSection>

//         <FilterSection title="Accessibility">
//           <FilterButton onClick={() => setAccessibility("Emergency")}>Emergency</FilterButton>
//           <FilterButton onClick={() => setAccessibility("Lower Sink")}>Lower Sink</FilterButton>
//         </FilterSection>

//         <FilterSection title="Review">
//           <FilterButton onClick={() => setReview("Excellent")}>Excellent</FilterButton>
//           <FilterButton onClick={() => setReview("Good")}>Good</FilterButton>
//         </FilterSection>

//         <button
//           className="mt-6 w-full border border-red-400 text-red-500 py-2 rounded-xl hover:bg-red-400 hover:text-white transition"
//           onClick={() => {
//             setCity("");
//             setType("");
//             setDescription("");
//             setFacility("");
//             setEssential("");
//             setAccessibility("");
//             setDistance(null);
//             setReview("");
//             setFilteredProperties(properties);
//           }}
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* PROPERTY CARDS GRID */}
//       <div className="w-full md:w-[70%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
//         {filteredProperties.length === 0 ? (
//           <p className="text-center text-gray-500 col-span-full mt-20">
//             No properties found
//           </p>
//         ) : (
//           filteredProperties.map((p) => (
//             <div
//               key={p._id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col"
//             >
//               <div className="h-48 w-full">
//                 {p.image ? (
//                   <img
//                     src={`http://localhost:5000/uploads/${p.image}`}
//                     alt={p.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                     No Image
//                   </div>
//                 )}
//               </div>

//               <div className="p-4 flex flex-col">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
//                   <p className="text-gray-500 text-sm mt-1">Premium stay in {p.city}</p>
//                   <p className="text-gray-500 text-sm mt-1">About {p.description}</p>

//                   <div className="flex flex-wrap gap-2 mt-3">
//                     <Tag>{p.type}</Tag>
//                     <Tag>{p.review}</Tag>
//                     {p.facilities?.map((f, i) => (
//                       <Tag key={i}>{f}</Tag>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => navigate(`/booking/${p._id}`)}
//                   className="mt-4 bg-red-500 text-white py-2 rounded-xl w-full hover:bg-red-600"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// /* COMPONENTS */

// const FilterSection = ({ title, children }) => (
//   <div className="mb-5">
//     <h3 className="font-medium text-sm mb-2">{title}</h3>
//     <div className="flex flex-wrap gap-2">{children}</div>
//   </div>
// );

// const FilterButton = ({ children, onClick }) => (
//   <button
//     onClick={onClick}
//     className="border px-3 py-1 rounded-lg text-sm hover:bg-red-400 hover:text-white transition"
//   >
//     {children}
//   </button>
// );

// const Tag = ({ children }) => (
//   <span className="border px-2 py-1 rounded-md text-xs text-gray-600">
//     {children}
//   </span>
// );

// export default Properties;
