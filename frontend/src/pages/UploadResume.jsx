import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import FileUpload from "../components/FileUpload";
import { Brain, Cpu, Wand2, ArrowRight, Loader2 } from 'lucide-react';

const UploadResume = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) return;

    setAnalyzing(true);
    const formData = new FormData();
    formData.append('file', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch('http://localhost:8080/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
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
              AI Resume Screening
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
                Job Details
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

          {result && (
            <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* Result Summary Placeholder - Details will be in Dashboard */}
              <div className="glass-card p-8 border-green-500/20 bg-green-500/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full border-4 border-green-500/30 flex items-center justify-center text-2xl font-bold text-green-400">
                    {result.matchPercentage}%
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Analysis Complete</h3>
                    <p className="text-gray-400">Match found: {result.status}</p>
                  </div>
                </div>
                <button className="premium-btn" onClick={() => window.location.href = '/'}>
                  View on Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

import { FileText } from 'lucide-react';
export default UploadResume;
