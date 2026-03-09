// components/admin/StatCard.jsx
const StatCard = ({ title, value, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded shadow p-6 cursor-pointer hover:shadow-lg transition"
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-2">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
