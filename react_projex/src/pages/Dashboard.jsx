function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold font-lexend">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Total Products", value: 128 },
          { label: "Low Stock Items", value: 12 },
          { label: "Today’s Sales", value: "₱8,450" },
          { label: "Suppliers", value: 9 },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
