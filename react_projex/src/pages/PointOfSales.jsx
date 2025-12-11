function PointOfSales() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Point of Sales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Scan Product</h2>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter barcode or scan..."
          />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Cart</h2>
          <ul className="space-y-1">
            <li className="flex justify-between">
              Item 1 <span>$10</span>
            </li>
            <li className="flex justify-between">
              Item 2 <span>$25</span>
            </li>
            <li className="flex justify-between font-bold">
              Total <span>$35</span>
            </li>
          </ul>
          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default PointOfSales;
