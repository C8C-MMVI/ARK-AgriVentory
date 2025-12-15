function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold font-lexend">Welcome to ARK Agriventory</h1>
      <p className="text-gray-600 mt-2">
        Manage inventory, sales, and users efficiently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="font-semibold">Inventory</h2>
          <p className="text-sm text-gray-500">Products, categories, stock</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="font-semibold">Sales</h2>
          <p className="text-sm text-gray-500">POS and transactions</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="font-semibold">Users</h2>
          <p className="text-sm text-gray-500">Accounts and profiles</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
