import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import CandidatesTable from "../components/CandidatesTable";

export default function Dashboard() {
  const stats = [
    { icon: "📄", value: "1,248", label: "Total Resumes", change: "+12%", color: "bg-indigo-100" },
    { icon: "👥", value: "342", label: "Active Candidates", change: "+8%", color: "bg-green-100" },
    { icon: "📈", value: "87%", label: "Avg. Match Score", change: "+3%", color: "bg-indigo-100" },
    { icon: "⏱️", value: "2.3s", label: "Processing Time", change: "-15%", color: "bg-purple-100" }
  ];

  const candidates = [
    { name: "Sarah Johnson", initial: "S", position: "Senior Frontend Developer", score: 95, status: "Recommended", processed: "2 hours ago" },
    { name: "Michael Chen", initial: "M", position: "Full Stack Engineer", score: 88, status: "Under Review", processed: "5 hours ago" },
    { name: "Emily Rodriguez", initial: "E", position: "UI/UX Designer", score: 92, status: "Recommended", processed: "1 day ago" },
    { name: "David Kim", initial: "D", position: "Backend Developer", score: 78, status: "Under Review", processed: "1 day ago" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome back! Here's an overview of your resume screening activity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        <CandidatesTable candidates={candidates} />
      </main>
    </div>
  );
}

