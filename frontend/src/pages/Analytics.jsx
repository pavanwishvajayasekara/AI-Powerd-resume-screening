import Sidebar from "../components/Sidebar";

const Analytics = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-600">Analytics page.</p>
      </div>
    </div>
  );
};

export default Analytics;
