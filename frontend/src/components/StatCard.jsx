export default function StatCard({ icon, value, label, change, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${color}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
