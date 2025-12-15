function Categories() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold font-lexend">Categories</h1>

      <div className="bg-white rounded-xl shadow mt-6 p-4">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td>Fertilizers</td>
              <td>Chemical and organic fertilizers</td>
            </tr>
            <tr className="border-t">
              <td>Seeds</td>
              <td>Crop and vegetable seeds</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
