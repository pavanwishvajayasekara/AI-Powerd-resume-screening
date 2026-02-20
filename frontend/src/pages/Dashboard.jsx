import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import CandidatesTable from "../components/CandidatesTable";
import { Brain, Cpu, Zap, Activity } from 'lucide-react';

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/candidates')
      .then(res => res.json())
      .then(data => {
        setCandidates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { icon: <Zap size={20} />, value: "98.2%", label: "AI Power", change: "System Active", color: "from-amber-500 to-orange-600" },
    { icon: <Brain size={20} />, value: "1.2T", label: "Neural Power", change: "Parameters", color: "from-indigo-500 to-purple-600" },
    { icon: <Activity size={20} />, value: "87%", label: "Screening Progress", change: "Current Batch", color: "from-green-500 to-emerald-600" },
    { icon: <Cpu size={20} />, value: "2.3ms", label: "Latency", change: "-15% Optimal", color: "from-blue-500 to-cyan-600" }
  ];

  return (
    <div className="flex h-screen bg-[#030712]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold premium-gradient-text mb-2">Neural Dashboard</h1>
          <p className="text-gray-500">
            Real-time insights from your AI-powered screening architecture.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="glass-card p-6 flex items-center gap-5 group hover:border-indigo-500/50 transition-all duration-500">
              <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {s.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{s.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{s.value}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{s.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Activity className="text-indigo-400" />
              Recent Analysis Stream
            </h3>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <CandidatesTable candidates={candidates.slice(0, 5)} />
            )}
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-lg font-bold mb-4">Neural Health</h3>
              <div className="space-y-6">
                <ProgressItem label="Synaptic Processing" value={92} />
                <ProgressItem label="Pattern Matching" value={85} />
                <ProgressItem label="Data Ingestion" value={78} />
              </div>
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-indigo-600/10 to-transparent border-indigo-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="text-indigo-400 animate-pulse" />
                <span className="font-bold">Core Optimization</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                The neural engine is currently operating at peak efficiency. All processing layers are verified.
              </p>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {!loading && candidates.length === 0 && (
          <div className="text-center py-20 glass-card">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="text-gray-600 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Candidates Yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">
              Start by uploading resumes to see the AI neural analysis in action.
            </p>
            <button className="premium-btn mx-auto" onClick={() => window.location.href = '/upload-resume'}>
              Initiate Screening
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function ProgressItem({ label, value }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-gray-400">{label}</span>
        <span className="text-indigo-400">{value}%</span>
      </div>
      <div className="progress-bg">
        <div className="progress-fill" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}
