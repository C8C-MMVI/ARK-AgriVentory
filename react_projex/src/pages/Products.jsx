function Products() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold font-lexend">Products</h1>

      <div className="bg-white rounded-xl shadow mt-6 p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Base Price</th>
              <th>List Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td>Urea Fertilizer</td>
              <td>Fertilizers</td>
              <td>₱850</td>
              <td>₱950</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
