import { useEffect, useState } from "react";
import axios from "axios";

const initialState = {
  name: "",
  city: "",
  type: "",
  description: "",
  review: "",
  essentials: [],
  facilities: [],
  accessibility: [],
  image: null,
};

const normalizeProperty = (p) => ({
  ...p,
  essentials: Array.isArray(p.essentials) ? p.essentials : [],
  facilities: Array.isArray(p.facilities) ? p.facilities : [],
  accessibility: Array.isArray(p.accessibility) ? p.accessibility : [],
});

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [selectedId, setSelectedId] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchProperties = async () => {
    const res = await axios.get("https://hotel-booking-app-do1i.onrender.com/api/properties");
    setProperties(res.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // const handleAdd = async () => {
  //   // console.log("ADDING 👉", formData);
  //   const data = new FormData();

  //   for (let key in formData) {
  //     data.append(key, formData[key]);
  //   }

  //   await axios.post(
  //     "http://localhost:5000/api/properties",
  //     data,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );

  //   fetchProperties();
  //   setFormData(initialState);
  // };

  const handleAdd = async () => {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("city", formData.city);
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("review", formData.review);

    data.append("essentials", JSON.stringify(formData.essentials));
    data.append("facilities", JSON.stringify(formData.facilities));
    data.append("accessibility", JSON.stringify(formData.accessibility));

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.post(
        "https://hotel-booking-app-do1i.onrender.com/api/properties",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showMessage("Property Added Successfully");
      fetchProperties();
      setFormData(initialState);

    } catch (error) {
      showMessage("Failed to Add Property", "error");

    }
  };



  // const handleUpdate = async () => {
  //   if (!selectedId) return alert("Select property");
  //   await axios.put(
  //     `http://localhost:5000/api/properties/${selectedId}`,
  //     formData
  //   );
  //   fetchProperties();
  // };

  const handleUpdate = async () => {
    if (!selectedId) return showMessage("Select property");

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("city", formData.city);
      data.append("type", formData.type);
      data.append("description", formData.description);
      data.append("review", formData.review);

      data.append("essentials", JSON.stringify(formData.essentials));
      data.append("facilities", JSON.stringify(formData.facilities));
      data.append("accessibility", JSON.stringify(formData.accessibility));

      // Only append image if new file selected
      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      await axios.put(
        `https://hotel-booking-app-do1i.onrender.com/api/properties/${selectedId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showMessage("Property Updated Successfully");
      fetchProperties();
      setFormData(initialState);
      setSelectedId(null);
    } catch (err) {
      showMessage("Failed to Update Property", "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return showMessage("Select property");

    try {
      await axios.delete(
        `https://hotel-booking-app-do1i.onrender.com/api/properties/${selectedId}`
      );

      showMessage("Property Deleted Successfully");
      fetchProperties();
      setFormData(initialState);
      setSelectedId(null);

    } catch (err) {
      showMessage("Failed to Delete Property", "error");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* ALERT MESSAGE */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-xl text-white font-semibold shadow-lg transition ${messageType === "success"
              ? "bg-green-500"
              : "bg-red-500"
            }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= FORM SECTION ================= */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Property Management
          </h2>

          <div className="space-y-4">

            <input
              className="w-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 p-3 rounded-xl outline-none transition"
              placeholder="Property Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              className="w-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 p-3 rounded-xl outline-none transition"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />

            <input
              className="w-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 p-3 rounded-xl outline-none transition"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <select
              className="w-full border border-gray-300 p-3 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="">Select Type</option>
              <option>Hotel</option>
              <option>Apartment</option>
            </select>

            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.essentials[0] || ""}
              onChange={(e) =>
                setFormData({ ...formData, essentials: [e.target.value] })
              }
            >
              <option value="">Essentials</option>
              <option>Washing Machine</option>
              <option>Dryer</option>
              <option>Iron</option>
            </select>

            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.facilities[0] || ""}
              onChange={(e) =>
                setFormData({ ...formData, facilities: [e.target.value] })
              }
            >
              <option value="">Facilities</option>
              <option>AC</option>
              <option>SPA</option>
              <option>Beach View</option>
            </select>

            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.accessibility[0] || ""}
              onChange={(e) =>
                setFormData({ ...formData, accessibility: [e.target.value] })
              }
            >
              <option value="">Accessibility</option>
              <option>Emergency</option>
              <option>Lower Sink</option>
            </select>

            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
            >
              <option value="">Review</option>
              <option>Excellent</option>
              <option>Good</option>
            </select>

            <input
              type="file"
              className="w-full border border-gray-300 p-3 rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
            />

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={handleAdd}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl shadow-md transition"
              >
                Add
              </button>

              <button
                onClick={handleUpdate}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl shadow-md transition"
              >
                Update
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-md transition"
              >
                Delete
              </button>
            </div>

          </div>
        </div>


        {/* ================= PROPERTY LIST ================= */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 h-[600px] overflow-y-auto">

          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Property List
          </h2>

          <div className="space-y-4">

            {properties.map((p) => {
              const data = normalizeProperty(p);

              return (
                <div
                  key={p._id}
                  onClick={() => {
                    setSelectedId(p._id);
                    setFormData(data);
                  }}
                  className={`border rounded-xl p-4 cursor-pointer transition shadow-sm hover:shadow-md ${selectedId === p._id
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200"
                    }`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">

                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt=""
                      className="w-full sm:w-24 h-24 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-red-500 text-lg">
                        {p.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {p.city} • {p.type}
                      </p>

                      <p className="text-sm text-gray-500">
                        Review: {p.review}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Facilities: {data.facilities.join(", ")}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );

};

export default AdminProperties;
