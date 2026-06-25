import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/auth/register`, { name, email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-secondary/10 blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="glass-panel rounded-2xl p-8 sm:p-10 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Create an Account
            </h2>
            <p className="text-slate-400 font-light">
              Get started with your AI resume assistant.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-left flex items-start gap-3 animate-in slide-in-from-top-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all shadow-inner"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all shadow-inner"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all shadow-inner"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 mt-2 bg-secondary hover:bg-secondary-glow text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-surface"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-secondary-glow hover:text-white transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;