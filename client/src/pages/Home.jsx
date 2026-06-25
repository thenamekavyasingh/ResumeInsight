import { Link } from "react-router-dom";

const AnalyzeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-primary-glow group-hover:scale-110 transition-transform duration-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
    {/* Animated scanning line effect */}
    <path
      className="animate-pulse-slow stroke-accent-glow opacity-50"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 8h10"
    />
  </svg>
);

const CustomizeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-secondary-glow group-hover:scale-110 transition-transform duration-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L4.5 15.75l9.077-4.436z"
    />
    <circle cx="15.5" cy="8.5" r="2.5" className="animate-pulse stroke-primary-glow opacity-50"/>
  </svg>
);

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"></div>

      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        {/* Header Text Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-4xl">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary-glow text-sm font-medium tracking-wide">
            Introducing SmartResume AI 2.0
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Build a Resume <br className="hidden sm:block" />
            <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary-glow via-accent-glow to-secondary-glow">
              Recruiters Notice.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Get instant, data-driven feedback or magically tailor your resume to any job
            description in seconds using our advanced AI reviewer.
          </p>
        </div>

        {/* Action Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 fill-mode-both">
          {/* Analyze Resume Card */}
          <Link
            to="/analyze"
            className="group relative rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md p-8 hover:bg-surfaceHover/80 hover:border-primary/50 transition-all duration-500 overflow-hidden"
          >
            {/* Card Hover Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                <AnalyzeIcon />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Analyze Resume
              </h2>
              <p className="text-slate-400 leading-relaxed font-light flex-grow">
                Upload your resume to get an instant AI-powered review. We scan for ATS compatibility, keyword gaps, and provide actionable improvements.
              </p>
              
              <div className="mt-6 flex items-center text-primary-glow font-medium group-hover:translate-x-2 transition-transform">
                Start Analysis
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          </Link>

          {/* Customize Resume Card */}
          <Link
            to="/customize"
            className="group relative rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md p-8 hover:bg-surfaceHover/80 hover:border-secondary/50 transition-all duration-500 overflow-hidden"
          >
             {/* Card Hover Gradient Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 inline-flex p-4 rounded-xl bg-secondary/10 border border-secondary/20 group-hover:bg-secondary/20 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                <CustomizeIcon />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Tailor to Job
              </h2>
              <p className="text-slate-400 leading-relaxed font-light flex-grow">
                Paste a target job description and we will automatically rewrite and optimize your resume content to ensure you stand out as the perfect fit.
              </p>
              
              <div className="mt-6 flex items-center text-secondary-glow font-medium group-hover:translate-x-2 transition-transform">
                Start Tailoring
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
