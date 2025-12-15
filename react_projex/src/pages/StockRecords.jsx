function StockRecords() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold font-lexend">Stock Records</h1>

      <div className="bg-white rounded-xl shadow mt-6 p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th>Product</th>
              <th>Supplier</th>
              <th>Quantity</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td>Urea Fertilizer</td>
              <td>AgriCorp</td>
              <td>120</td>
              <td>2025-01-10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockRecords;
