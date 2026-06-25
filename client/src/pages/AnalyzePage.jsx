import React from "react";
import SmartAnalyzeForm from "../components/SmartAnalyzeForm";

const AnalyzePage = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            AI Resume <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary-glow to-secondary-glow">Analysis</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-400 font-light">
            Upload your resume and our advanced AI will provide a deep analysis of your strengths, weaknesses, and actionable improvements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <SmartAnalyzeForm />
        </div>

      </div>
    </div>
  );
};

export default AnalyzePage;