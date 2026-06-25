import React from 'react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 mt-auto z-10 bg-surface/30 backdrop-blur-md">
      <div className="w-[90%] max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
        
        {/* Copyright Notice */}
        <p className="text-sm mb-2 font-medium">
          &copy; {new Date().getFullYear()} SmartResume. All Rights Reserved.
        </p>

        {/* AI Disclaimer */}
        <p className="text-xs text-slate-500/80 max-w-lg mx-auto">
          Disclaimer: SmartResume is an AI-powered tool and can make mistakes. Please review and verify all generated content before submitting your resume to employers.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;