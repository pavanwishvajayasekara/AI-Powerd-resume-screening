import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import CandidatesTable from "../components/CandidatesTable";
import { Users, Search, Filter } from 'lucide-react';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCandidates = candidates.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#030712]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold premium-gradient-text mb-2">Elite Talent Pool</h1>
          <p className="text-gray-500">
            A comprehensive list of all candidates processed through the neural screening engine.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by name or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-all">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="glass-card p-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <CandidatesTable candidates={filteredCandidates} />
          )}

          {!loading && filteredCandidates.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 italic">No candidates matching your search criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Candidates;
