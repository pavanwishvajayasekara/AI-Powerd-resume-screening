import Sidebar from "../components/Sidebar";

export default function UploadResume() {
  return (
    <div className="flex h-screen bg-[#030712]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Upload Resume (Admin)</h1>
          <p className="text-slate-500 text-sm">Upload candidate resumes directly to the internal database for processing.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-3xl">
          <div className="border-2 border-dashed border-slate-200 hover:border-violet-400 bg-slate-50 hover:bg-violet-50/50 rounded-2xl p-12 text-center transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Drag and drop resumes here</h3>
            <p className="text-slate-400 text-sm mb-6">Support for PDF, DOCX, and TXT files up to 10MB</p>
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors">
              Browse Files
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}