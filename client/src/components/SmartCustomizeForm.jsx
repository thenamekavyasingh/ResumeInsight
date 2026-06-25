import React, { useState } from "react";
import axios from "axios";
import { renderResumeText } from "../utils/renderResume.jsx";

const SmartCustomizeForm = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [customizedResumeText, setCustomizedResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription)
      return alert("Please upload a resume and paste the job description");

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return alert("Please log in to customize a resume.");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc", jobDescription);

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/customize-resume`, formData, config);
      setCustomizedResumeText(data.customizedText);
    } catch (error) {
      alert("Something went wrong while customizing the resume");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 transition-all duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 lg:col-span-4 lg:sticky lg:top-28 lg:self-start flex flex-col"
        >
          {/* File Upload Section */}
          <div>
            <label htmlFor="resume-upload" className="block text-sm font-medium text-slate-300 mb-2">
              1. Upload Your Resume
            </label>
            <div className="relative group">
              <input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                required
              />
              <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 flex flex-col items-center justify-center bg-surface/30 
                ${file ? 'border-secondary bg-secondary/5' : 'border-white/20 group-hover:border-secondary/50 group-hover:bg-surfaceHover'}`}>
                
                <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center transition-colors duration-300
                  ${file ? 'bg-secondary/20 text-secondary-glow' : 'bg-white/5 text-slate-400 group-hover:text-secondary-glow group-hover:bg-secondary/10'}`}>
                  {file ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  )}
                </div>
                <p className="text-sm font-medium text-white truncate max-w-full px-2">
                  {file ? file.name : "Select or drop PDF"}
                </p>
              </div>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="flex-grow flex flex-col">
            <label htmlFor="job-description" className="block text-sm font-medium text-slate-300 mb-2">
              2. Paste Job Description
            </label>
            <textarea
              id="job-description"
              rows={8}
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full flex-grow rounded-2xl border border-white/10 bg-surface/50 text-white placeholder-slate-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all shadow-inner px-4 py-4 custom-scrollbar resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-secondary-glow text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-lg"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Customizing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Customize with AI
              </>
            )}
          </button>
        </form>

        {/* Preview Section */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            3. AI-Generated Preview
          </label>
          <div className="flex-grow bg-surface/30 backdrop-blur-md rounded-2xl border border-white/5 shadow-inner p-6 min-h-[500px] overflow-auto custom-scrollbar relative">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/50 backdrop-blur-sm z-10 animate-in fade-in duration-300">
                <div className="relative w-24 h-24 mb-4">
                  <div className="absolute inset-0 rounded-full border-t-2 border-secondary-glow animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-r-2 border-primary-glow animate-spin animation-delay-200"></div>
                  <div className="absolute inset-4 rounded-full border-b-2 border-accent-glow animate-spin animation-delay-400"></div>
                </div>
                <p className="text-secondary-glow font-medium animate-pulse">
                  Analyzing job requirements and rewriting...
                </p>
              </div>
            ) : customizedResumeText ? (
              <div className="text-sm leading-relaxed text-slate-300 font-mono animate-in fade-in slide-in-from-bottom-4 duration-500">
                {renderResumeText(customizedResumeText, jobDescription)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-50">
                 <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                 </div>
                 <p className="text-slate-400 font-medium">Your customized resume will magically appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCustomizeForm;
