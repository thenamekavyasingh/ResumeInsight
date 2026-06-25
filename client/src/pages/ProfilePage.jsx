import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { renderResumeText } from "../utils/renderResume.jsx";

const ResultModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-white/10 bg-surfaceHover/50">
          <h3 className="text-xl font-semibold text-white truncate pr-4">
            {item.originalFileName}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
          {item.customizedText && (
            <div className="text-sm leading-relaxed text-slate-300 font-mono bg-background p-4 rounded-xl border border-white/5">
              {renderResumeText(item.customizedText)}
            </div>
          )}
          {item.aiFeedback && <FeedbackDisplay feedback={item.aiFeedback} />}
        </div>
        <div className="p-4 border-t border-white/10 bg-surfaceHover/50 text-right">
          <button
            onClick={onClose}
            className="bg-white/10 text-white px-5 py-2 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedbackDisplay = ({ feedback }) => (
  <div className="space-y-6 mt-4">
    {feedback.summary && (
      <div className="glass-panel p-5 rounded-xl">
        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Summary
        </h4>
        <p className="text-slate-300 text-sm leading-relaxed">{feedback.summary}</p>
      </div>
    )}
    {feedback.score && (
      <div className="glass-panel p-5 rounded-xl flex items-center justify-between">
        <h4 className="font-semibold text-white">Overall Score</h4>
        <div className="relative flex items-center justify-center w-16 h-16">
           <svg className="w-16 h-16 transform -rotate-90">
             <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
             <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="175" strokeDashoffset={175 - (175 * feedback.score.overall) / 10} className="text-primary-glow drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" strokeLinecap="round" />
           </svg>
           <span className="absolute text-xl font-bold text-white">{feedback.score.overall}</span>
        </div>
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {feedback.pros?.length > 0 && (
        <div className="glass-panel p-5 rounded-xl border-t-2 border-t-success">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Pros
          </h4>
          <ul className="space-y-2">
            {feedback.pros.map((p, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-success mt-0.5">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {feedback.cons?.length > 0 && (
        <div className="glass-panel p-5 rounded-xl border-t-2 border-t-red-500">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Cons
          </h4>
          <ul className="space-y-2">
            {feedback.cons.map((c, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        navigate("/login");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      try {
        const { data } = await axios.get(`/api/users/profile`, config);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        localStorage.removeItem("userInfo");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const openModalWithItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-primary-glow rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 animate-pulse">Loading profile...</p>
      </div>
    );

  return (
    <>
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none"></div>
        
        <div className="w-[90%] max-w-screen-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div className="md:flex md:items-center md:justify-between mb-10 pb-6 border-b border-white/10 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-5">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                 {profile?.name?.charAt(0).toUpperCase()}
               </div>
               <div>
                 <h1 className="text-3xl font-bold text-white tracking-tight">My Profile</h1>
                 {profile && (
                   <p className="text-slate-400 mt-1 font-light">
                     Welcome back, <span className="text-white font-medium">{profile.name}</span>
                   </p>
                 )}
               </div>
            </div>
            <button
              onClick={logoutHandler}
              className="mt-4 md:mt-0 bg-white/5 border border-white/10 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
            >
              Logout
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6 text-white tracking-tight animate-in fade-in slide-in-from-left-4 duration-500 delay-100 fill-mode-both">
              Activity History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile && profile.history.length > 0 ? (
                profile.history.map((item, index) => (
                  <div
                    key={item._id}
                    className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md border ${
                            item.customizedText
                              ? "bg-secondary/10 text-secondary-glow border-secondary/20"
                              : "bg-primary/10 text-primary-glow border-primary/20"
                          }`}
                        >
                          {item.customizedText ? (
                            <><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>Tailored</>
                          ) : (
                            <><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Analysis</>
                          )}
                        </span>
                        <p className="text-xs text-slate-500 font-mono">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2" title={item.originalFileName}>
                        {item.originalFileName}
                      </h3>
                      {item.aiFeedback?.score?.overall && (
                         <div className="flex items-center gap-2 mt-2 mb-4">
                            <span className="text-sm text-slate-400">Score:</span>
                            <span className="text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded">{item.aiFeedback.score.overall}/10</span>
                         </div>
                      )}
                    </div>
                    <button
                      onClick={() => openModalWithItem(item)}
                      className="mt-auto w-full bg-white/5 border border-white/10 text-slate-300 font-medium py-2.5 rounded-xl hover:bg-white/10 hover:text-white transition-all shadow-sm"
                    >
                      View Result
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full glass-panel p-10 rounded-2xl text-center flex flex-col items-center justify-center animate-in fade-in duration-700">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Activity Yet</h3>
                  <p className="text-slate-400 max-w-md">
                    Your analyzed and customized resumes will securely appear here. Start your journey by analyzing your first resume.
                  </p>
                  <Link
                    to="/analyze"
                    className="mt-6 bg-primary hover:bg-primary-glow text-white font-medium px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all"
                  >
                    Start Analysis
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </>
  );
};

export default ProfilePage;
