import Sidebar from "../components/Sidebar";

const UploadResume = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Upload Resumes</h1>
        <p className="text-gray-600">Upload resumes here.</p>
      </div>
    </div>
  );
};

export default UploadResume;
