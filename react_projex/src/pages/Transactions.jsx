function Transactions() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Transaction ID</th>
            <th className="py-2 px-4 text-left">User</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="py-2 px-4">TX001</td>
            <td className="py-2 px-4">John Doe</td>
            <td className="py-2 px-4">$50</td>
            <td className="py-2 px-4 text-green-600 font-bold">Completed</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">TX002</td>
            <td className="py-2 px-4">Jane Smith</td>
            <td className="py-2 px-4">$75</td>
            <td className="py-2 px-4 text-yellow-600 font-bold">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
