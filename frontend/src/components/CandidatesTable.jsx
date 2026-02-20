import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Zap, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function CandidatesTable({ candidates }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Recommended": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Under Review": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Not Matching": return "text-red-400 bg-red-400/10 border-red-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-gray-500 text-xs uppercase tracking-widest">
            <th className="px-6 py-2">Candidate</th>
            <th className="px-6 py-2">Neural Match</th>
            <th className="px-6 py-2">Status</th>
            <th className="px-6 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <React.Fragment key={c.id}>
              <tr
                onClick={() => toggleExpand(c.id)}
                className={`group cursor-pointer transition-all duration-300 ${expandedId === c.id ? 'bg-white/5' : 'hover:bg-white/[0.02]'
                  }`}
              >
                <td className="px-6 py-5 rounded-l-2xl border-y border-l border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-indigo-300 font-bold">
                      {c.name ? c.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-200">{c.name || "Anonymous Candidate"}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-tighter">Processed: {new Date(c.processedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 border-y border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${c.matchPercentage}%` }}
                      ></div>
                    </div>
                    <span className="font-mono text-indigo-400">{c.matchPercentage}%</span>
                  </div>
                </td>
                <td className="px-6 py-5 border-y border-white/5">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${statusStyle(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-5 rounded-r-2xl border-y border-r border-white/5 text-right">
                  <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 transition-colors">
                    {expandedId === c.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </td>
              </tr>

              {expandedId === c.id && (
                <tr>
                  <td colSpan="4" className="px-6 pb-6 pt-2">
                    <div className="glass-card p-8 border-indigo-500/20 bg-indigo-500/5 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <CheckCircle2 size={16} /> Matched Skills
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{c.matchedSkills || "N/A"}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <XCircle size={16} /> Missing Skills
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{c.missingSkills || "N/A"}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-bold text-purple-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Zap size={16} /> Improvement Plan
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{c.improvementSuggestions || "N/A"}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Info size={16} /> Learning Resources
                          </h4>
                          <div className="text-gray-300 text-sm leading-relaxed p-4 bg-white/5 rounded-xl border border-white/10">
                            {c.learningResources || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';
