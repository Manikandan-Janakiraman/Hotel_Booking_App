import { useEffect, useState } from "react";
import axios from "axios";

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [menu, setMenu] = useState({
    title: "",
    path: "",
    order: 1,
  });

  // FETCH MENUS
  const fetchMenus = async () => {
    try {
      const res = await axios.get("https://hotel-booking-app-2lg2.onrender.com/api/menus");
      setMenus(res.data);
    } catch (err) {
      console.error("Fetch menus error:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // ADD MENU
  const addMenu = async () => {
    if (!menu.title || !menu.path) {
      alert("Menu name and path are required");
      return;
    }

    try {
      await axios.post("https://hotel-booking-app-2lg2.onrender.com/api/menus", {
        title: menu.title,
        path: menu.path,
        order: Number(menu.order),
      });

      setMenu({ title: "", path: "", order: 1 });
      fetchMenus();
    } catch (err) {
      console.error("Add menu error:", err);
      alert("Failed to add menu");
    }
  };

  // DELETE MENU
  const deleteMenu = async (id) => {
    try {
      await axios.delete(`https://hotel-booking-app-2lg2.onrender.com/api/menus/${id}`);
      fetchMenus();
    } catch (err) {
      console.error("Delete menu error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CREATE MENU CARD */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-700">
            ➕ Create Menu
          </h2>

          <input
            className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition p-3 w-full mb-4 rounded-lg"
            placeholder="Menu Title"
            value={menu.title}
            onChange={(e) =>
              setMenu({ ...menu, title: e.target.value })
            }
          />

          <input
            className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition p-3 w-full mb-4 rounded-lg"
            placeholder="/admin/dashboard"
            value={menu.path}
            onChange={(e) =>
              setMenu({ ...menu, path: e.target.value })
            }
          />

          <input
            type="number"
            className="border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition p-3 w-full mb-6 rounded-lg"
            value={menu.order}
            onChange={(e) =>
              setMenu({ ...menu, order: e.target.value })
            }
          />

          <button
            onClick={addMenu}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-semibold shadow-md"
          >
            Add Menu
          </button>
        </div>

        {/* MENU LIST CARD */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-700">
            📋 Menu List
          </h2>

          {menus.length === 0 && (
            <p className="text-gray-500 text-center">
              No menus found
            </p>
          )}

          <div className="space-y-4">
            {menus.map((m) => (
              <div
                key={m._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border border-gray-200 p-4 rounded-xl hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-700">
                    {m.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {m.path}
                  </p>
                </div>

                <button
                  onClick={() => deleteMenu(m._id)}
                  className="mt-3 sm:mt-0 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MenuManagement;
