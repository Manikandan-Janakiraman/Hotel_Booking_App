import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const initialState = {
    name: "",
    description: "",
    city: "",
    type: "",
    facilities: [],
    essentials: [],
    accessibility: [],
    distance: "",
    review: "",
    image: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [properties, setProperties] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  /* ---------------- FETCH ---------------- */
  const fetchProperties = async () => {
    const res = await axios.get("https://hotel-booking-app-do1i.onrender.com/api/properties");
    setProperties(res.data);
  };

  /* ---------------- HELPERS ---------------- */
  const toggleValue = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const selectProperty = (item) => {
    setSelectedId(item._id);
    setFormData(item);
  };

  /* ---------------- CRUD ---------------- */
  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/properties", formData);
    fetchProperties();
    setFormData(initialState);
  };

  const handleUpdate = async () => {
    if (!selectedId) return alert("Select a property to update");
    await axios.put(
      `http://localhost:5000/api/properties/${selectedId}`,
      formData
    );
    fetchProperties();
  };

  const handleDelete = async () => {
    if (!selectedId) return alert("Select a property to delete");
    await axios.delete(
      `http://localhost:5000/api/properties/${selectedId}`
    );
    fetchProperties();
    setFormData(initialState);
    setSelectedId(null);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className='bg-[url("src/assets/banner5.jpg")] bg-cover bg-centerh-300 flex justify-center items-center h-300'>
      <div className="bg-white w-[50%] shadow-xl rounded-2xl p-10 gap-10">

        {/* ---------- FORM ---------- */}
        <div className="flex flex-col gap-4">

          <input
            className="border p-3"
            placeholder="Hotel Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            className="border p-3"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <input
            className="border p-3"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />

          <select
            className="border p-3"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          >
            <option value="">Select City</option>
            {["Chennai", "Mumbai", "Bangalore", "Hyderabad", "Kolkata"].map(
              (c) => (
                <option key={c}>{c}</option>
              )
            )}
          </select>

          {/* Property Type */}
          <label>Property Type</label>
          <div className="flex gap-2">
            {["Apartment", "Hotel", "Resort"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFormData({ ...formData, type: t })}
                className={`border p-2 w-28 ${
                  formData.type === t
                    ? "bg-red-400 text-white"
                    : "hover:bg-red-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Facilities */}
          <label>Facilities</label>
          <div className="flex gap-2">
            {["AC", "Spa", "Beach View"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleValue("facilities", f)}
                className={`border p-2 w-28 ${
                  formData.facilities.includes(f)
                    ? "bg-red-400 text-white"
                    : "hover:bg-red-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Essentials */}
          <label>Essentials</label>
          <div className="flex gap-2">
            {["Washing Machine", "Dryer", "Iron"].map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => toggleValue("essentials", e)}
                className={`border p-2 w-36 ${
                  formData.essentials.includes(e)
                    ? "bg-red-400 text-white"
                    : "hover:bg-red-400 hover:text-white"
                }`}
              >
                {e}
              </button>
            ))}
          </div>

          {/* Accessibility */}
          <label>Accessibility</label>
          <div className="flex gap-2">
            {["Emergency", "Lower Sink"].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => toggleValue("accessibility", a)}
                className={`border p-2 w-32 ${
                  formData.accessibility.includes(a)
                    ? "bg-red-400 text-white"
                    : "hover:bg-red-400 hover:text-white"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <input
            className="border p-3"
            placeholder="Distance (km)"
            value={formData.distance}
            onChange={(e) =>
              setFormData({ ...formData, distance: e.target.value })
            }
          />

          <select
            className="border p-3"
            value={formData.review}
            onChange={(e) =>
              setFormData({ ...formData, review: e.target.value })
            }
          >
            <option value="">Review</option>
            <option>Excellent</option>
            <option>Very Good</option>
            <option>Good</option>
          </select>

          {/* ACTIONS */}
          <div className="flex gap-3 mt-4">
            <button onClick={handleAdd} className="bg-green-500 p-2 text-white">
              Add
            </button>
            <button onClick={handleUpdate} className="bg-blue-500 p-2 text-white">
              Update
            </button>
            <button onClick={handleDelete} className="bg-red-500 p-2 text-white">
              Delete
            </button>
          </div>
        </div>

        {/* ---------- LIST ---------- */}
        <div className="overflow-y-auto h-[50px]">
          {properties.map((p) => (
            <div
              key={p._id}
              onClick={() => selectProperty(p)}
              className={`border p-4 mb-3 cursor-pointer ${
                selectedId === p._id ? "bg-red-100" : "bg-white"
              }`}
            >
              <h3 className="font-bold">{p.name}</h3>
              <p>{p.city} • {p.type}</p>
              <p className="text-sm">{p.review}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

