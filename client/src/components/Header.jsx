import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuRef]);

  const logoutHandler = () => {
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-white bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-surface/50 backdrop-blur-xl transition-all">
      <nav className="w-[90%] max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] transition-shadow">
                <span className="text-white font-bold text-lg leading-none tracking-tighter">S</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                SmartResume
              </span>
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {userInfo ? (
                  <>
                    <NavLink to="/analyze" className={navLinkClass}>
                      Analyze
                    </NavLink>
                    <NavLink to="/customize" className={navLinkClass}>
                      Customize
                    </NavLink>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* Right side of Navbar */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {userInfo ? (
                // Profile Dropdown
                <div className="ml-3 relative" ref={profileMenuRef}>
                  <div>
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary transition-all hover:scale-105"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* User Avatar Initial */}
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold border border-white/20 shadow-lg">
                        {userInfo?.name?.charAt(0).toUpperCase()}
                      </div>
                    </button>
                  </div>
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-3 w-48 rounded-xl shadow-2xl py-1 bg-surface border border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm text-white font-medium truncate">{userInfo?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{userInfo?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="w-full text-left block px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Links for LOGGED OUT users
                <div className="flex items-center space-x-3">
                  <NavLink to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Log in
                  </NavLink>
                  <Link
                    to="/register"
                    className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out bg-primary rounded-lg group hover:bg-primary-glow shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-surface"
                  >
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu Button (for mobile) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-surface/95 backdrop-blur-3xl border-b border-white/10 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {userInfo ? (
            <>
              <div className="flex items-center gap-3 py-3 mb-2 border-b border-white/10">
                 <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold border border-white/20">
                    {userInfo?.name?.charAt(0).toUpperCase()}
                 </div>
                 <div>
                    <p className="text-sm font-medium text-white">{userInfo?.name}</p>
                    <p className="text-xs text-slate-400">{userInfo?.email}</p>
                 </div>
              </div>
              <Link
                to="/analyze"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/5 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              >
                Analyze
              </Link>
              <Link
                to="/customize"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/5 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              >
                Customize
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/5 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={logoutHandler}
                className="w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/5 block px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center w-full bg-primary hover:bg-primary-glow text-white block px-3 py-2.5 rounded-lg text-base font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] mt-2"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
