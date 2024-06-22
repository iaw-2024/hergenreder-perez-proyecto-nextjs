import { totalMovies, totalSeries, getLastTransactions, getTotalTransactions} from "@/app/lib/dataAdmin";

export async function AdminPage() {
  const countSeries = await totalSeries();
  const countMovies = await totalMovies();
  const transactions = await getLastTransactions();
  const countTransactions = await getTotalTransactions();
  return (
      <div className="flex flex-col min-h-screen text-white">
        <main className="flex-1 py-8 px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Total Movies</h2>
                <span className="text-2xl font-bold">{countMovies}</span>
              </div>
              <p className="text-gray-400">This is the total number of movies in your library.</p>
            </div>
            <div className="bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Total Series</h2>
                <span className="text-2xl font-bold">{countSeries}</span>
              </div>
              <p className="text-gray-400">This is the total number of series in your library.</p>
            </div>
            <div className="bg-gray-950 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Total Transactions</h2>
                <span className="text-2xl font-bold">{countTransactions}</span>
              </div>
              <p className="text-gray-400">This is the total number of transactions in your library.</p>
            </div>
            <div className="bg-gray-950 rounded-lg shadow-md p-6 col-span-1 md:col-span-3">
              <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-[#0f1629] text-left">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">User Email</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-[#0f1629]">
                      <td className="px-4 py-2">{transaction.id}</td>
                      <td className="px-4 py-2">{transaction.payer_email}</td>
                      <td className="px-4 py-2">{transaction.status}</td>
                      <td className="px-4 py-2">{transaction.amount}</td>
                      <td className="px-4 py-2">{transaction.date}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }