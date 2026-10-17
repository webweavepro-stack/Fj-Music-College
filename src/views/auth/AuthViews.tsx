import React, { useState } from 'react';
import { useCollege, DEMO_USERS } from '../../context/CollegeContext';
import { UserRole } from '../../types';
import { FjMusicLogo } from '../../components/brand/FjMusicLogo';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';

interface AuthViewsProps {
  mode: 'login' | 'register' | 'forgot-password' | 'reset-password';
  navigate: (path: string) => void;
}

export const AuthViews: React.FC<AuthViewsProps> = ({ mode, navigate }) => {
  const { currentUser, switchUserRole } = useCollege();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState(currentUser.name);
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('student@fjmusiccollege.edu');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    switchUserRole(role);
    setEmail(DEMO_USERS[role].email);
    setFullName(DEMO_USERS[role].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      switch (selectedRole) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'applicant':
          navigate('/student/application');
          break;
        case 'instructor':
          navigate('/instructor/dashboard');
          break;
        case 'admin':
          navigate('/admin');
          break;
      }
    }, 700);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <button onClick={() => navigate('/')} className="inline-block focus:outline-none mb-4">
            <FjMusicLogo size="lg" variant="full" showSlogan={false} />
          </button>
          <h1 className="font-heading text-2xl font-black text-slate-900">
            {mode === 'login'
              ? 'Sign in to FJMUSIC Portal'
              : mode === 'register'
              ? 'Create Student / Applicant Account'
              : 'Password Recovery'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your course player, practice room logs, and academic records.
          </p>
        </div>

        {/* Quick Role Persona Switcher for Evaluators */}
        {mode === 'login' && (
          <div className="mb-6 p-1.5 bg-stone-200 rounded-2xl">
            <div className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1 text-center">
              Select Demo Persona to Sign In:
            </div>
            <div className="grid grid-cols-4 gap-1 text-[11px] font-semibold">
              {(['student', 'applicant', 'instructor', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSelect(r)}
                  className={`py-2 px-1 rounded-xl capitalize transition-colors text-center cursor-pointer ${
                    selectedRole === r
                      ? 'bg-slate-950 text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {mode === 'forgot-password' ? (
            isSuccess ? (
              <div className="text-center space-y-3 py-4">
                <CheckCircle2 className="w-12 h-12 text-lime-600 mx-auto" />
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Password Reset Link Sent
                </h3>
                <p className="text-xs text-slate-600">
                  We have dispatched a secure password reset link to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl"
                >
                  Send Reset Link
                </button>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-slate-600 hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'register' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Adeleke"
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => navigate('/forgot-password')}
                      className="text-[11px] text-slate-500 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {mode === 'login' ? `Sign In as ${selectedRole.toUpperCase()}` : 'Create Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-3 border-t border-stone-100 text-slate-500">
                {mode === 'login' ? (
                  <span>
                    New applicant?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/register')}
                      className="font-bold text-slate-900 hover:underline"
                    >
                      Create an account
                    </button>
                  </span>
                ) : (
                  <span>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="font-bold text-slate-900 hover:underline"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
