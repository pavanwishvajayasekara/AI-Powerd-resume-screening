import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Export credentials checker for use in App.jsx ─────────────────────────────
export const USERS = [
  { email: "Admin", password: "Admin123", role: "admin", name: "Administrator" },
  { email: "Client", password: "Client123", role: "client", name: "Client User" },
];

export function checkCredentials(email, password) {
  return USERS.find((u) => u.email === email.trim() && u.password === password) || null;
}


// ── Laptop hero image (purple-tinted workspace) ───────────────────────────────
const HeroPanel = ({ title, subtitle }) => (
  <div className="hidden lg:flex relative w-1/2 flex-col justify-end overflow-hidden">
    {/* Background image via unsplash */}
    <motion.div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80')" }}
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 10, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
    />
    {/* Purple gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-700/80 via-violet-600/70 to-indigo-800/80" />
    {/* Text */}
    <AnimatePresence mode="popLayout">
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 p-12 pb-14"
      >
        <h2 className="text-white text-4xl font-black leading-tight mb-4 whitespace-pre-line">{title}</h2>
        <p className="text-violet-200 text-base leading-relaxed max-w-sm">{subtitle}</p>
      </motion.div>
    </AnimatePresence>
  </div>
);

// ── Eye icon ──────────────────────────────────────────────────────────────────
const EyeIcon = ({ open }) => open ? (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
) : (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

// ── Input Field ───────────────────────────────────────────────────────────────
const Field = ({ label, type = "text", value, onChange, placeholder, error, rightSlot }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {rightSlot}
    </div>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all bg-white
          ${error ? "border-rose-400 focus:ring-2 focus:ring-rose-100" : "border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"}`}
      />
    </div>
    {error && <p className="text-xs text-rose-500 mt-1.5 font-medium">{error}</p>}
  </div>
);

// ── Password Field ────────────────────────────────────────────────────────────
const PasswordField = ({ label, value, onChange, error, rightSlot }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        {rightSlot}
      </div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all bg-white
            ${error ? "border-rose-400 focus:ring-2 focus:ring-rose-100" : "border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"}`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <EyeIcon open={show} />
        </button>
      </div>
      {error && <p className="text-xs text-rose-500 mt-1.5 font-medium">{error}</p>}
    </div>
  );
};

// ── Login Form ────────────────────────────────────────────────────────────────
function LoginForm({ onSwitch, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalErr, setGlobalErr] = useState("");

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email / username is required.";
    if (!password.trim()) e.password = "Password is required.";
    return e;
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setGlobalErr("");
    setLoading(true);

    // Simulate network delay — replace with real API call
    await new Promise((r) => setTimeout(r, 800));

    const user = USERS.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (!user) {
      setGlobalErr("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    // Store session
    sessionStorage.setItem("resumatch_user", JSON.stringify(user));

    setLoading(false);
    if (onLogin) onLogin(user);

    // Role-based navigation
    if (user.role === "admin") navigate("/admin");
    else navigate("/client");
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-sm mx-auto px-4">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200">
          <span className="text-white text-xs font-black tracking-tight">CV</span>
        </div>
        <span className="text-slate-900 font-bold text-xl tracking-tight">ResuMatch</span>
      </div>

      <h1 className="text-3xl font-black text-slate-900 mb-1">Welcome back</h1>
      <p className="text-slate-400 text-sm mb-8">Sign in to continue analyzing your resume</p>

      <div className="space-y-4">
        <Field
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />
        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          rightSlot={
            <button type="button" className="text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors">
              Forgot password?
            </button>
          }
        />
      </div>

      {globalErr && (
        <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium rounded-xl px-4 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {globalErr}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-200 transition-all active:scale-[0.98]"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in...
          </>
        ) : (
          <>
            Sign In
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="text-violet-600 font-bold hover:text-violet-800 transition-colors">
          Create one
        </button>
      </p>
    </div>
  );
}

// ── Register Form ─────────────────────────────────────────────────────────────
function RegisterForm({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Full name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address.";
    if (!password.trim()) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);

    // TODO: replace with real API call → POST /api/register
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col justify-center w-full max-w-sm mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5"
        >
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Account Created!</h2>
        <p className="text-slate-400 text-sm mb-8">Your account has been set up. Sign in to get started.</p>
        <button
          onClick={onSwitch}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-violet-200 hover:from-violet-700 hover:to-purple-700 transition-all"
        >
          Go to Sign In
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full max-w-sm mx-auto px-4">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200">
          <span className="text-white text-xs font-black tracking-tight">CV</span>
        </div>
        <span className="text-slate-900 font-bold text-xl tracking-tight">ResuMatch</span>
      </div>

      <h1 className="text-3xl font-black text-slate-900 mb-1">Create your account</h1>
      <p className="text-slate-400 text-sm mb-8">Get started with free CV analysis</p>

      <div className="space-y-4">
        <Field
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          error={errors.name}
        />
        <Field
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />
        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-200 transition-all active:scale-[0.98]"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating account...
          </>
        ) : (
          <>
            Create Account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-violet-600 font-bold hover:text-violet-800 transition-colors">
          Sign in
        </button>
      </p>
    </div>
  );
}

// ── Dashboard placeholder after login ────────────────────────────────────────
function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 p-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 flex flex-col items-center text-center gap-4 max-w-sm w-full">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
          <span className="text-white text-2xl font-black">{user.name[0]}</span>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">Welcome, {user.name}!</h2>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${user.role === "admin"
              ? "bg-violet-50 border border-violet-200 text-violet-700"
              : "bg-emerald-50 border border-emerald-200 text-emerald-700"
            }`}>
            {user.role}
          </span>
          <p className="text-slate-400 text-sm mt-2">
            {user.role === "admin"
              ? "You have full admin access to all features."
              : "You have client access to CV analysis tools."}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
        >
          Sign Out
        </button>
      </div>
      <p className="text-xs text-slate-400">
        Replace this dashboard with your actual app pages using <code className="bg-slate-100 px-1.5 py-0.5 rounded text-violet-600">user.role</code> for routing.
      </p>
    </div>
  );
}

// ── Root AuthPage ─────────────────────────────────────────────────────────────
export default function AuthPage({ onLogin }) {
  const [view, setView] = useState("login"); // "login" | "register"
  const [user, setUser] = useState(null);

  const handleLogin = (u) => {
    setUser(u);
    if (onLogin) onLogin(u); // propagate to App.jsx for routing
  };

  // Only show internal dashboard if no external onLogin handler provided
  if (user && !onLogin) return <Dashboard user={user} onLogout={() => setUser(null)} />;

  const isLogin = view === "login";

  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* Left — Hero */}
      <HeroPanel
        title={isLogin ? "Match Your CV to\nAny Job in Seconds" : "Start Your Career\nJourney Today"}
        subtitle={
          isLogin
            ? "AI-powered analysis that finds gaps, suggests improvements, and recommends courses to boost your career."
            : "Join thousands of professionals using AI to optimize their resumes and land their dream jobs."
        }
      />

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-16 px-6">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {isLogin
                ? <LoginForm onSwitch={() => setView("register")} onLogin={handleLogin} />
                : <RegisterForm onSwitch={() => setView("login")} />
              }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}