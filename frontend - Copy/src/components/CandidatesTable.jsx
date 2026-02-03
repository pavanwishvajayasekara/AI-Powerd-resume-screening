export default function CandidatesTable({ candidates }) {
  const scoreColor = (score) =>
    score >= 90 ? "bg-green-500" : score >= 80 ? "bg-blue-500" : "bg-yellow-500";

  const statusStyle = (status) =>
    status === "Recommended"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Candidates</h2>
          <p className="text-sm text-gray-600">Latest resumes processed by the AI</p>
        </div>
        <button className="text-indigo-600 font-medium hover:text-indigo-700">View All</button>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {["Candidate", "Position", "Match Score", "Status", "Processed"].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {candidates.map((c, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white font-semibold flex items-center justify-center">
                  {c.initial}
                </div>
                <span className="font-medium text-gray-900">{c.name}</span>
              </td>
              <td className="px-6 py-4 text-gray-700">{c.position}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${scoreColor(c.score)}`}
                      style={{ width: `${c.score}%` }}
                    />
                  </div>
                  <span className="font-medium">{c.score}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyle(c.status)}`}>
                  {c.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600">{c.processed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
