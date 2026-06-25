import React, { useState } from "react";
import axios from "axios";

// --- Helper Icons ---
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0 text-success" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>);
const CrossIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>);
const InfoIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0 text-primary-glow" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>);

const SuggestionItem = ({ suggestion }) => {
  const replaceWithMatch = suggestion.match(/Replace '(.+?)' with '(.+?)'/i);
  if (replaceWithMatch) {
    const before = replaceWithMatch[1];
    const after = replaceWithMatch[2];
    return (
      <div className="bg-surface/50 border border-white/5 p-4 rounded-xl transition-colors hover:bg-surfaceHover">
        <div className="flex items-start text-sm text-red-400">
          <span className="font-mono bg-red-500/20 px-1.5 rounded mr-2 border border-red-500/30 text-xs mt-0.5">-</span>
          <span className="line-through">{`'${before}'`}</span>
        </div>
        <div className="flex items-start text-sm text-success mt-2">
          <span className="font-mono bg-success/20 px-1.5 rounded mr-2 border border-success/30 text-xs mt-0.5">+</span>
          <span>{`'${after}'`}</span>
        </div>
      </div>
    );
  }

  if (suggestion.includes("→")) {
    const parts = suggestion.split("→");
    const before = parts[0].replace("Replace", "").trim();
    const after = parts[1].trim();

    return (
      <div className="bg-surface/50 border border-white/5 p-4 rounded-xl transition-colors hover:bg-surfaceHover">
        <div className="flex items-center text-sm text-red-400">
          <span className="font-mono bg-red-500/20 px-1.5 rounded mr-2 border border-red-500/30 text-xs">-</span>
          <span className="line-through">{before}</span>
        </div>
        <div className="flex items-center text-sm text-success mt-2">
          <span className="font-mono bg-success/20 px-1.5 rounded mr-2 border border-success/30 text-xs">+</span>
          <span>{after}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start text-slate-300 bg-surface/50 p-4 rounded-xl border border-white/5 hover:bg-surfaceHover transition-colors">
      <InfoIcon />
      <span className="text-sm leading-relaxed">{suggestion}</span>
    </div>
  );
};

const ScoreMeter = ({ score, label, colorClass, shadowClass }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 10) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center w-24 h-24 mb-3">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
          <circle 
            cx="48" cy="48" r={radius} 
            stroke="currentColor" strokeWidth="8" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            className={`${colorClass} ${shadowClass} transition-all duration-1000 ease-out`} 
            strokeLinecap="round" 
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{score}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider -mt-1">/ 10</span>
        </div>
      </div>
      <div className="text-sm font-medium text-slate-300 capitalize text-center">{label}</div>
    </div>
  );
}

const SmartAnalyzeForm = () => {
  const [file, setFile] = useState(null);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [showParsed, setShowParsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF resume");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return alert("Please log in to analyze a resume");

    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/resume/upload`, formData, config);
      setResumeText(data.resumeText);
      setAiFeedback(data.aiFeedback);
      setResumeUrl(data.resumeUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong during analysis.");
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 transition-all duration-500">
      
      {!aiFeedback && (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              required
            />
            <div className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 flex flex-col items-center justify-center bg-surface/30 
              ${file ? 'border-primary bg-primary/5' : 'border-white/20 group-hover:border-primary/50 group-hover:bg-surfaceHover'}`}>
              
              <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center transition-colors duration-300
                ${file ? 'bg-primary/20 text-primary-glow' : 'bg-white/5 text-slate-400 group-hover:text-primary-glow group-hover:bg-primary/10'}`}>
                {file ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                )}
              </div>
              
              <p className="text-lg font-medium text-white mb-1">
                {file ? file.name : "Click or drag your PDF here"}
              </p>
              <p className="text-sm text-slate-400">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF up to 5MB"}
              </p>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-glow text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 text-lg"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : "Analyze Resume"}
          </button>
        </form>
      )}

      {aiFeedback && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Header Action to Analyze Another */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
             <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
             <button 
               onClick={() => { setAiFeedback(null); setFile(null); }}
               className="text-sm font-medium text-slate-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
             >
               Analyze another
             </button>
          </div>

          {aiFeedback.score && (
            <div className="mb-10 bg-surface/30 rounded-2xl p-6 sm:p-8 border border-white/5 shadow-inner">
              <h3 className="text-xl font-bold text-white mb-6">Score Breakdown</h3>
              <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
                {/* Overall Score */}
                <ScoreMeter 
                  score={aiFeedback.score.overall} 
                  label="Overall" 
                  colorClass="text-primary-glow" 
                  shadowClass="drop-shadow-[0_0_12px_rgba(129,140,248,0.8)]" 
                />
                
                {Object.entries(aiFeedback.score).filter(([key]) => key !== 'overall').map(([key, value]) => {
                  // Determine color based on score or just cycle
                  let color = "text-secondary-glow";
                  let shadow = "drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]";
                  if (value >= 8) { color = "text-success"; shadow = "drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"; }
                  else if (value < 6) { color = "text-red-500"; shadow = "drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"; }
                  else if (key === 'formatting') { color = "text-accent-glow"; shadow = "drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]"; }

                  return (
                    <ScoreMeter 
                      key={key}
                      score={value} 
                      label={key} 
                      colorClass={color} 
                      shadowClass={shadow} 
                    />
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {aiFeedback.summary && (
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary-glow"></div>
                  <h3 className="text-lg font-bold text-white mb-3">Executive Summary</h3>
                  <p className="text-slate-300 leading-relaxed font-light">{aiFeedback.summary}</p>
                </div>
              )}

              {aiFeedback.pros?.length > 0 && (
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-success"></div>
                  <h3 className="text-lg font-bold text-white mb-4">Strengths & Pros</h3>
                  <ul className="space-y-3">
                    {aiFeedback.pros.map((item, idx) => (
                      <li key={idx} className="flex items-start text-slate-300 text-sm leading-relaxed">
                        <CheckIcon /> 
                        <span className="pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {aiFeedback.cons?.length > 0 && (
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <h3 className="text-lg font-bold text-white mb-4">Areas for Improvement</h3>
                  <ul className="space-y-3">
                    {aiFeedback.cons.map((item, idx) => (
                      <li key={idx} className="flex items-start text-slate-300 text-sm leading-relaxed">
                        <CrossIcon /> 
                        <span className="pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {aiFeedback.suggestions?.length > 0 && (
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary-glow"></div>
                  <h3 className="text-lg font-bold text-white mb-4">Actionable Suggestions</h3>
                  <div className="space-y-3">
                    {aiFeedback.suggestions.map((item, idx) => (
                      <SuggestionItem key={idx} suggestion={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-12 mb-4">
            <button
              onClick={() => setShowParsed(!showParsed)}
              className="bg-surface border border-white/20 text-slate-300 hover:text-white font-medium py-3 px-8 rounded-xl hover:bg-white/5 hover:border-white/40 transition-all duration-300 focus:outline-none"
            >
              {showParsed ? "Hide Uploaded Resume" : "View Parsed Resume Document"}
            </button>
          </div>

          {/* Smooth expanding area for iframe/text */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showParsed ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
            <h3 className="font-bold text-lg mb-4 text-white">Parsed Document Preview</h3>
            {resumeUrl ? (
              <iframe src={resumeUrl} title="Uploaded Resume" className="w-full h-[700px] border border-white/10 rounded-2xl shadow-2xl bg-white/5" />
            ) : (
              <div className="whitespace-pre-wrap bg-surface font-mono text-sm text-slate-300 border border-white/10 p-6 rounded-2xl overflow-auto max-h-[700px] custom-scrollbar shadow-inner">
                {resumeText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartAnalyzeForm;