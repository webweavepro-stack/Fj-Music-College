import React, { useState } from 'react';
import { FjMusicLogo } from '../brand/FjMusicLogo';
import { useCollege } from '../../context/CollegeContext';
import { UserRole } from '../../types';
import {
  Menu,
  X,
  UserCheck,
  GraduationCap,
  Sparkles,
  ChevronDown,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const { currentUser, switchUserRole, settings } = useCollege();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Programmes', path: '/programmes' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Faculty', path: '/faculty' },
    { label: 'Practical Training', path: '/practical-training' },
    { label: 'Events & Recitals', path: '/events' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const getPortalPathForRole = (role: UserRole) => {
    switch (role) {
      case 'student':
        return '/student/dashboard';
      case 'applicant':
        return '/student/application';
      case 'instructor':
        return '/instructor/dashboard';
      case 'admin':
        return '/admin';
    }
  };

  return (
    <>
      {/* Top Advisory Strip & Role Switcher Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Institutional Banner */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-lime-400 uppercase tracking-wider">
              {settings.currentTerm}
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-300 truncate">
              Admissions Open for Diploma & Certificate Cohorts · Deadline: {settings.applicationDeadline}
            </span>
          </div>

          {/* Role Preview Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Interactive Role Mode:
            </span>
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-md border border-slate-700 font-medium text-[11px] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                <span className="capitalize">{currentUser.role}</span>
                <span className="text-slate-400">({currentUser.name.split(' ')[0]})</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 py-1 text-xs">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                    Switch Test Persona
                  </div>
                  {(['student', 'applicant', 'instructor', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchUserRole(r);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        currentUser.role === r ? 'text-lime-400 font-bold bg-slate-800/60' : 'text-slate-200'
                      }`}
                    >
                      <span className="capitalize">{r}</span>
                      {currentUser.role === r && (
                        <span className="text-[10px] text-lime-400 font-mono">ACTIVE</span>
                      )}
                    </button>
                  ))}
                  <div className="p-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setRoleMenuOpen(false);
                        navigate(getPortalPathForRole(currentUser.role));
                      }}
                      className="w-full py-1.5 px-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded text-center block text-[11px]"
                    >
                      Open {currentUser.role.toUpperCase()} Portal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header complying with Top Bar Contract (3 Zones, gap-8) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Element */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center text-left whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <FjMusicLogo size="md" variant="full" showSlogan={false} />
          </button>

          {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                    isActive
                      ? 'text-slate-950 border-b-2 border-slate-900 font-bold'
                      : 'hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Portal Quicklink */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav(getPortalPathForRole(currentUser.role))}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-slate-600" />
              <span>Portal ({currentUser.role})</span>
            </button>

            <button
              onClick={() => handleNav('/apply')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 flex items-center gap-2 group"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="space-y-1">
              <button
                onClick={() => handleNav('/')}
                className="w-full text-left py-2 text-sm font-semibold text-slate-900 border-b border-slate-100"
              >
                Home
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className="w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 border-b border-slate-100"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('/gallery')}
                className="w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 border-b border-slate-100"
              >
                Gallery & Performances
              </button>
              <button
                onClick={() => handleNav('/about')}
                className="w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 border-b border-slate-100"
              >
                About FJMUSIC
              </button>
              <button
                onClick={() => handleNav('/contact')}
                className="w-full text-left py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 border-b border-slate-100"
              >
                Contact & Visit
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleNav(getPortalPathForRole(currentUser.role))}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl border border-slate-300 text-slate-800 text-center"
              >
                Open {currentUser.role.toUpperCase()} Portal
              </button>
              <button
                onClick={() => handleNav('/apply')}
                className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-slate-950 text-white text-center"
              >
                Apply for Admission
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
