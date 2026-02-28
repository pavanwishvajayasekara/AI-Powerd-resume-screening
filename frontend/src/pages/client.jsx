import { useState, useRef } from "react";

async function analyzeMatch(cvText, jobDescription) {
  const prompt = `You are an expert HR analyst and career coach. Analyze the following CV against the job description and return a JSON object with this exact structure (no markdown, no explanation, just raw JSON):

{
  "matchPercentage": <number 0-100>,
  "matchLabel": <"Excellent Match" | "Strong Match" | "Good Match" | "Partial Match" | "Low Match">,
  "summary": <2-3 sentence analysis string>,
  "strengths": [<array of 3-6 strength strings from CV that match the job>],
  "gaps": [<array of 3-6 skill/experience gaps strings the CV is missing for this job>],
  "recommendedCourses": [
    {
      "title": <course title string>,
      "provider": <e.g. "Coursera", "Udemy", "edX", "LinkedIn Learning">,
      "duration": <estimated duration string e.g. "~10 hrs">,
      "url": "#",
      "tag": <"High Priority" | "Medium Priority" | "Low Priority">
    }
  ],
  "keywordMatches": {
    "matched": [<array of keywords/skills found in both CV and job description>],
    "missing": [<array of important keywords in job description missing from CV>]
  },
  "atsScore": <number 0-100, ATS compatibility score>,
  "experienceMatch": <number 0-100>,
  "skillsMatch": <number 0-100>,
  "educationMatch": <number 0-100>
}

Recommend 3-5 courses targeted at closing the identified skill gaps.

CV:
${cvText}

Job Description:
${jobDescription}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) throw new Error("API request failed");

  const data = await response.json();
  const text = data.content.map((b) => b.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

const tagColors = {
  "High Priority": "bg-rose-100 text-rose-700 border border-rose-200",
  "Medium Priority": "bg-amber-100 text-amber-700 border border-amber-200",
  "Low Priority": "bg-emerald-100 text-emerald-700 border border-emerald-200",
};

function CircleProgress({ value, size = 120, stroke = 10, color = "#7c3aed" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

function MiniBar({ label, value, color = "bg-violet-600" }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="text-slate-800 font-bold">{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%`, transition: "width 1.2s ease" }}
        />
      </div>
    </div>
  );
}

export default function ResuMatch() {
  const [cvText, setCvText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setCvText(ev.target.result);
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!cvText.trim() || !jobDesc.trim()) {
      setError("Please provide both your CV and the job description.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeMatch(cvText, jobDesc);
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const matchColor =
    result?.matchPercentage >= 80
      ? "#16a34a"
      : result?.matchPercentage >= 60
      ? "#7c3aed"
      : "#dc2626";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
            <span className="text-white text-xs font-black tracking-tight">CV</span>
          </div>
          <span className="text-slate-900 font-bold text-lg tracking-tight">ResuMatch</span>
        </div>
        <div className="flex items-center gap-5 text-sm text-slate-500">
          <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </nav>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-purple-800 px-8 py-12">
        {/* Decorative network nodes */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 260" preserveAspectRatio="xMidYMid slice">
          {[[900,40],[1050,120],[980,200],[800,90],[1120,60],[850,180],[1000,230],[700,50],[1150,190]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 10 : 5} fill="white" />
          ))}
          <line x1="900" y1="40" x2="1050" y2="120" stroke="white" strokeWidth="1" />
          <line x1="1050" y1="120" x2="980" y2="200" stroke="white" strokeWidth="1" />
          <line x1="980" y1="200" x2="850" y2="180" stroke="white" strokeWidth="1" />
          <line x1="900" y1="40" x2="800" y2="90" stroke="white" strokeWidth="1" />
          <line x1="1050" y1="120" x2="1120" y2="60" stroke="white" strokeWidth="1" />
          <line x1="1050" y1="120" x2="1150" y2="190" stroke="white" strokeWidth="1" />
          <line x1="900" y1="40" x2="700" y2="50" stroke="white" strokeWidth="1" />
          <line x1="1000" y1="230" x2="1150" y2="190" stroke="white" strokeWidth="1" />
        </svg>
        <div className="relative z-10">
          <h1 className="text-white text-3xl font-black tracking-tight mb-2">CV Analyzer</h1>
          <p className="text-violet-200 text-base">Upload your CV and job description to get an AI-powered analysis</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Input Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* CV Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">Your CV / Resume</h2>
                <p className="text-slate-400 text-sm">Paste text or upload a file</p>
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFile} />
            <button
              onClick={() => fileInputRef.current.click()}
              className="w-full border-2 border-dashed border-slate-200 hover:border-violet-400 rounded-xl py-3 px-4 text-slate-500 hover:text-violet-600 text-sm font-medium flex items-center justify-center gap-2 transition-all mb-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {fileName ? fileName : "Upload CV (PDF, DOCX, TXT)"}
            </button>
            <textarea
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Or paste your CV content here..."
              className="w-full h-52 resize-none bg-slate-50 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm text-slate-700 p-4 placeholder-slate-400 transition-all"
            />
          </div>

          {/* Job Description Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">Job Description</h2>
                <p className="text-slate-400 text-sm">Paste the job requirements</p>
              </div>
            </div>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-72 resize-none bg-slate-50 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm text-slate-700 p-4 placeholder-slate-400 transition-all"
            />
          </div>
        </div>

        {error && (
          <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Analyze Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-bold px-10 py-4 rounded-2xl text-base flex items-center gap-3 shadow-lg shadow-violet-200 transition-all active:scale-95"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                </svg>
                Analyze Match
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* ── Results ── */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Score Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-slate-900 font-black text-lg mb-6">Match Overview</h3>
              <div className="flex flex-col md:flex-row items-center gap-10">
                {/* Big circle */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="relative">
                    <CircleProgress value={result.matchPercentage} size={140} stroke={12} color={matchColor} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-slate-900">{result.matchPercentage}%</span>
                      <span className="text-xs font-semibold text-slate-400 mt-0.5">Match</span>
                    </div>
                  </div>
                  <span
                    className="text-sm font-bold px-3 py-1 rounded-full"
                    style={{ background: matchColor + "18", color: matchColor }}
                  >
                    {result.matchLabel}
                  </span>
                </div>

                {/* Breakdown bars */}
                <div className="flex-1 w-full">
                  <MiniBar label="Skills Match" value={result.skillsMatch} color="bg-violet-600" />
                  <MiniBar label="Experience Match" value={result.experienceMatch} color="bg-indigo-500" />
                  <MiniBar label="Education Match" value={result.educationMatch} color="bg-purple-500" />
                  <MiniBar label="ATS Score" value={result.atsScore} color="bg-fuchsia-500" />
                </div>

                {/* Summary */}
                <div className="flex-1 bg-slate-50 rounded-xl p-4 text-sm text-slate-600 leading-relaxed border border-slate-100">
                  <p className="font-bold text-slate-800 mb-1.5">AI Summary</p>
                  {result.summary}
                </div>
              </div>
            </div>

            {/* Strengths & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Your Strengths
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  Skill Gaps
                </h3>
                <ul className="space-y-2">
                  {result.gaps.map((g, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Keyword Analysis */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-slate-900 mb-5">Keyword Analysis</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Matched Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywordMatches.matched.map((k) => (
                      <span key={k} className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                        ✓ {k}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2">Missing Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywordMatches.missing.map((k) => (
                      <span key={k} className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full">
                        ✗ {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-slate-900 mb-1">Recommended Courses</h3>
              <p className="text-slate-400 text-sm mb-5">Bridge your skill gaps with these curated courses</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.recommendedCourses.map((course, i) => (
                  <a
                    key={i}
                    href={course.url}
                    className="group flex flex-col gap-3 border border-slate-200 hover:border-violet-300 hover:shadow-md rounded-xl p-4 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${tagColors[course.tag] || "bg-slate-100 text-slate-600"}`}>
                        {course.tag}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm group-hover:text-violet-700 transition-colors">{course.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{course.provider} · {course.duration}</p>
                    </div>
                    <div className="flex items-center gap-1 text-violet-600 text-xs font-semibold">
                      View Course
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease forwards; }
      `}</style>
    </div>
  );
}