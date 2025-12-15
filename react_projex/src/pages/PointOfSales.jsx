function PointOfSales() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
        <h2 className="font-bold">Products</h2>
        <p className="text-sm text-gray-500">Select items to add</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-bold">Cart</h2>
        <p className="text-sm text-gray-500">No items yet</p>
      </div>
    </div>
  );
}

export default PointOfSales;
