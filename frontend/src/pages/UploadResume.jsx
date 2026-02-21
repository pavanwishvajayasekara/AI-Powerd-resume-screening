import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import FileUpload from "../components/FileUpload";
import { Brain, Cpu, Wand2, ArrowRight, Loader2, AlertCircle, CheckCircle2, XCircle, Lightbulb, BookOpen, ExternalLink, FileText } from 'lucide-react';

const SkillTags = ({ skills, type }) => {
  if (!skills) return null;
  const skillList = skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {skillList.map((skill, i) => (
        <span key={i} className={`px-3 py-1.5 rounded-xl text-xs font-bold border animate-in zoom-in duration-300 ${type === 'strength'
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : 'bg-red-500/10 border-red-500/20 text-rose-400'
          }`}>
          {skill}
        </span>
      ))}
    </div>
  );
};

const LinkifiedText = ({ text }) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <div className="whitespace-pre-line leading-loose text-gray-400">
      {parts.map((part, i) => (
        urlRegex.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/30 font-bold transition-all group px-2 py-1 bg-indigo-500/5 rounded-lg border border-indigo-500/10 mx-1"
          >
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            Explore Resource
          </a>
        ) : part
      ))}
    </div>
  );
};

const UploadResume = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) return;

    setAnalyzing(true);
    setResult(null);
    setError(null);
    const formData = new FormData();
    formData.append('file', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch('http://localhost:8080/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume');
      }

      setResult(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError(error.message || 'An unexpected error occurred during analysis.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#030712]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold mb-3 premium-gradient-text">
              Neural Resume Screening
            </h1>
            <p className="text-gray-400 text-lg">
              Upload your candidate's resume and job description for a deep neural analysis.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="text-indigo-400" />
                Resume Upload
              </h2>
              <FileUpload
                onFileSelect={setResumeFile}
                file={resumeFile}
                label="Select Resume (PDF, DOCX)"
                accept=".pdf,.docx"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Wand2 className="text-purple-400" />
                Job Requirements
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description or specific requirements here..."
                className="w-full h-[180px] bg-white/5 border border-white/10 rounded-2xl p-6 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none text-gray-200"
              />
            </div>
          </div>

          <div className="flex justify-center flex-col items-center gap-6">
            <button
              onClick={handleAnalyze}
              disabled={!resumeFile || !jobDescription || analyzing}
              className={`premium-btn text-lg py-4 px-12 group ${(!resumeFile || !jobDescription || analyzing) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {analyzing ? (
                <>
                  <Loader2 className="animate-spin" />
                  Analyzing Neural Patterns...
                </>
              ) : (
                <>
                  Deep Analyze
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {analyzing && (
              <div className="w-full max-w-md space-y-4">
                <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-widest">
                  <span>Processing Neural Layers</span>
                  <span>{Math.floor(Math.random() * 30) + 70}%</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill w-3/4 animate-pulse-slow"></div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 pb-12">
              {/* Main Summary Header */}
              <div className="glass-card p-10 border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                  <div className="flex items-center gap-8">
                    <div className="relative">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64" cy="64" r="58"
                          fill="transparent"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="64" cy="64" r="58"
                          fill="transparent"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeDasharray={364}
                          strokeDashoffset={364 - (364 * result.matchPercentage) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#c084fc" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-3xl font-black text-white">
                        {result.matchPercentage}%
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-extrabold mb-1">Analysis Report</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${result.status === 'Recommended' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          result.status === 'Under Review' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                          {result.status}
                        </span>
                        <span className="text-gray-500 text-sm italic">Neural Confidence: High</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="premium-btn px-8" onClick={() => window.location.href = '/candidates'}>
                      View History
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Strengths */}
                <div className="glass-card p-6 border-green-500/10 hover:border-green-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <CheckCircle2 className="text-green-400" size={20} />
                    </div>
                    <h4 className="font-bold text-gray-200 uppercase text-xs tracking-widest">Neural Strengths</h4>
                  </div>
                  <SkillTags skills={result.matchedSkills} type="strength" />
                </div>

                {/* Gaps */}
                <div className="glass-card p-6 border-red-500/10 hover:border-red-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <XCircle className="text-rose-400" size={20} />
                    </div>
                    <h4 className="font-bold text-gray-200 uppercase text-xs tracking-widest">Detected Gaps</h4>
                  </div>
                  <SkillTags skills={result.missingSkills} type="gap" />
                </div>

                {/* Suggestions */}
                <div className="glass-card p-6 border-purple-500/10 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Lightbulb className="text-purple-400" size={20} />
                    </div>
                    <h4 className="font-bold text-gray-200 uppercase text-xs tracking-widest">Neural Insights</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    "{result.improvementSuggestions}"
                  </p>
                </div>
              </div>

              {/* Learning Roadmap & Resources */}
              <div className="glass-card p-8 border-indigo-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BookOpen size={120} className="text-indigo-400 -rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                      <BookOpen className="text-indigo-400" size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-100">Neural Learning Roadmap</h4>
                  </div>

                  <LinkifiedText text={result.learningResources} />

                  <div className="mt-10 flex flex-wrap gap-4 pt-8 border-t border-white/5">
                    <p className="w-full text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Verified Neural Platforms</p>
                    {['Coursera', 'Udemy', 'LinkedIn Learning', 'Pluralsight', 'edX'].map(platform => (
                      <span key={platform} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold text-gray-500 transition-all border border-white/5">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UploadResume;
