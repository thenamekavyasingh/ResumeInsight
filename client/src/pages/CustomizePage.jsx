import React from "react";
import SmartCustomizeForm from "../components/SmartCustomizeForm";
import { Link } from "react-router-dom";

const HistoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CustomizePage = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none"></div>

      <div className="w-[95%] max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="md:flex md:items-center md:justify-between mb-10 pb-6 border-b border-white/10">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Smart Resume <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-secondary-glow to-primary-glow">Customizer</span>
            </h1>
            <p className="mt-2 text-lg text-slate-400 font-light">
              Tailor your resume to any job description in seconds with AI assistance.
            </p>
          </div>
          <div className="mt-6 flex md:mt-0 md:ml-4">
            <Link
              to="/profile"
              className="flex items-center bg-white/5 border border-white/10 text-slate-300 font-medium px-5 py-2.5 rounded-xl shadow-sm hover:bg-white/10 hover:text-white hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-surface"
            >
              <HistoryIcon />
              View History
            </Link>
          </div>
        </div>

        <SmartCustomizeForm />
      </div>
    </div>
  );
};

export default CustomizePage;
