import Sidebar from "../components/Sidebar";

const Candidates = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Candidates</h1>
        <p className="text-gray-600">Candidate list page.</p>
      </div>
    </div>
  );
};

export default Candidates;
