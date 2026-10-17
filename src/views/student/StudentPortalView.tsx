import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { PracticeLog } from '../../types';
import { PaystackModal } from '../../components/payment/PaystackModal';
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  Award,
  CreditCard,
  FileText,
  User,
  Plus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Printer,
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Volume2,
} from 'lucide-react';

interface StudentPortalViewProps {
  currentTab?: string;
  navigate: (path: string) => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  currentTab = 'dashboard',
  navigate,
}) => {
  const {
    currentUser,
    applications,
    courses,
    practiceLogs,
    assessments,
    certificates,
    payments,
    completedLessonIds,
    submitPracticeLog,
    settings,
  } = useCollege();

  // Active student tab
  const [activeTab, setActiveTab] = useState(currentTab);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [showTuitionModal, setShowTuitionModal] = useState(false);

  // New Practice Log Form State
  const [practiceDate, setPracticeDate] = useState(new Date().toISOString().slice(0, 10));
  const [practiceInstrument, setPracticeInstrument] = useState(currentUser.instrument || 'Voice');
  const [practiceDuration, setPracticeDuration] = useState<number>(45);
  const [practiceBpm, setPracticeBpm] = useState<number>(90);
  const [practiceObjective, setPracticeObjective] = useState('');
  const [practiceChallenges, setPracticeChallenges] = useState('');
  const [practiceNotes, setPracticeNotes] = useState('');

  // Find relevant student application
  const myApplication = applications.find(
    (a) => a.applicantEmail === currentUser.email || a.applicantId === currentUser.id
  ) || applications[0];

  const handleCreatePracticeLog = (e: React.FormEvent) => {
    e.preventDefault();
    submitPracticeLog({
      date: practiceDate,
      instrument: practiceInstrument,
      durationMinutes: Number(practiceDuration),
      bpm: Number(practiceBpm),
      learningObjective: practiceObjective,
      challengesEncountered: practiceChallenges,
      progressNotes: practiceNotes,
    });
    setShowPracticeModal(false);
    setPracticeObjective('');
    setPracticeChallenges('');
    setPracticeNotes('');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'application', label: 'Application & Admission', icon: FileText },
    { id: 'courses', label: 'Enrolled Courses', icon: BookOpen },
    { id: 'practice', label: 'Practice Room Logs', icon: Clock },
    { id: 'assessments', label: 'Assessments & Juries', icon: Award },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'payments', label: 'Payments & Fees', icon: CreditCard },
    { id: 'profile', label: 'Student Profile', icon: User },
  ];

  const totalPracticeMinutes = practiceLogs.reduce((acc, log) => acc + log.durationMinutes, 0);

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-slate-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-lime-600 to-amber-500 flex items-center justify-center text-slate-950 font-heading font-black text-2xl shadow-inner">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-wider">
                <span>FJMUSIC STUDENT PORTAL</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{currentUser.studentIdNumber || 'CANDIDATE'}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {currentUser.name}
              </h1>
              <div className="text-xs text-slate-300 mt-0.5">
                Primary Specialisation: <strong>{currentUser.instrument || 'Voice & Performance'}</strong> · Session 2026-2027
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPracticeModal(true)}
              className="px-4 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Practice Session</span>
            </button>
            <button
              onClick={() => navigate('/learn/course-voc-101')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Go to Classroom</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Tabs + Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-sm">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      navigate(`/student/${item.id}`);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-950 text-white font-bold shadow-sm'
                        : 'text-slate-600 hover:bg-stone-100 hover:text-slate-900'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-lime-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Practice Stats Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Practice Room Stats
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black font-mono text-slate-900">
                  {Math.round(totalPracticeMinutes / 60)}h {totalPracticeMinutes % 60}m
                </span>
                <span className="text-xs text-lime-700 font-semibold font-mono">
                  {practiceLogs.length} Sessions
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Consistent daily practice builds muscle memory and vocal cord resilience.
              </p>
            </div>
          </div>

          {/* Main Dashboard Area (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 4 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Application Status</span>
                    <div className="text-lg font-bold text-slate-900 mt-1 capitalize flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span>{myApplication?.status.replace('_', ' ') || 'Enrolled'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      Ref: {myApplication?.referenceNumber || 'N/A'}
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Completed Lessons</span>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                      {completedLessonIds.length} <span className="text-xs text-slate-400 font-normal">lessons</span>
                    </div>
                    <span className="text-[10px] text-lime-700 font-semibold mt-1 block">
                      Active In VOC-101
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Jury Average</span>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                      91% <span className="text-xs text-emerald-600 font-normal">Distinction</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Assessed by Dr. Adeleke
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Issued Certificates</span>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                      {certificates.length} <span className="text-xs text-slate-400 font-normal">verified</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('certificates')}
                      className="text-[10px] text-slate-900 font-bold hover:underline mt-1 block"
                    >
                      View Credentials →
                    </button>
                  </div>
                </div>

                {/* Enrolled Courses Progress */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-base font-bold text-slate-900">
                      My Academic Courses
                    </h2>
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      View All Courses
                    </button>
                  </div>

                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="p-4 rounded-xl border border-stone-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-[11px] font-mono font-bold text-lime-700">
                            {course.code} · {course.level}
                          </div>
                          <h3 className="font-heading font-bold text-sm text-slate-900">
                            {course.title}
                          </h3>
                          <div className="text-xs text-slate-500">
                            Instructor: {course.instructorName} · {course.totalLessons} Lessons
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => navigate(`/learn/${course.id}`)}
                            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
                          >
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Practice Log & Instructor Feedback */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-base font-bold text-slate-900">
                      Recent Practice Logs & Faculty Feedback
                    </h2>
                    <button
                      onClick={() => setShowPracticeModal(true)}
                      className="text-xs font-bold text-lime-700 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Practice Log</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {practiceLogs.slice(0, 2).map((log) => (
                      <div key={log.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-bold text-slate-900">{log.instrument} · {log.durationMinutes} Mins</span>
                          <span className="text-slate-500">{log.date}</span>
                        </div>
                        <p className="text-slate-700"><strong>Objective:</strong> {log.learningObjective}</p>
                        <p className="text-slate-600"><strong>Progress:</strong> {log.progressNotes}</p>

                        {log.instructorFeedback && (
                          <div className="mt-2 p-3 bg-lime-50 rounded-lg border border-lime-200 text-lime-950">
                            <div className="font-bold flex items-center justify-between">
                              <span>Feedback from {log.instructorFeedback.instructorName}:</span>
                              <span>Rating: {log.instructorFeedback.practicalRating}/5 ★</span>
                            </div>
                            <p className="mt-1">{log.instructorFeedback.feedback}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: APPLICATION */}
            {activeTab === 'application' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-slate-900">
                      Admissions Application File
                    </h2>
                    <p className="text-xs text-slate-500">
                      Official registry record tracking your admissions status and faculty board review.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-mono font-bold uppercase">
                    {myApplication?.status.replace('_', ' ') || 'UNDER REVIEW'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Reference Number</span>
                    <span className="text-base font-bold text-slate-900">{myApplication?.referenceNumber}</span>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Programme</span>
                    <span className="text-sm font-bold text-slate-900">{myApplication?.programmeTitle}</span>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Audition Format</span>
                    <span className="text-slate-900 capitalize">{myApplication?.auditionPreference.replace('_', ' ')}</span>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Fee Status</span>
                    <span className={myApplication?.applicationFeePaid ? 'text-lime-700 font-bold' : 'text-amber-700 font-bold'}>
                      {myApplication?.applicationFeePaid ? 'PAID VIA PAYSTACK' : 'PENDING PAYMENT'}
                    </span>
                  </div>
                </div>

                {myApplication?.auditionDate && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Audition Scheduled:</span>
                    </div>
                    <p className="font-mono text-sm font-bold">{myApplication.auditionDate}</p>
                    <p className="text-[11px] text-amber-800">
                      Please arrive 15 minutes before your scheduled slot. Check-in at Studio Reception Suite 2.
                    </p>
                  </div>
                )}

                {myApplication?.staffNotes && (
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1">
                    <span className="font-bold text-slate-800">Admissions Board Notes:</span>
                    <p className="text-slate-600">{myApplication.staffNotes}</p>
                  </div>
                )}

                {!myApplication?.applicationFeePaid && (
                  <div className="pt-2">
                    <button
                      onClick={() => setShowTuitionModal(true)}
                      className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Pay Application Fee with Paystack (NGN 15,000)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: COURSES */}
            {activeTab === 'courses' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Enrolled Courses & Curricula
                  </h2>
                  <p className="text-xs text-slate-500">
                    Access digital lectures, audio examples, practice assignments, and downloadable worksheets.
                  </p>
                </div>

                <div className="space-y-4">
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="p-6 rounded-2xl border border-stone-200 hover:border-slate-400 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-lime-700">
                          <span>{c.code}</span>
                          <span>·</span>
                          <span>{c.level}</span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-slate-900">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                          {c.description}
                        </p>
                        <div className="text-xs text-slate-400">
                          Lecturer: <strong>{c.instructorName}</strong> · Modules: {c.modules.length}
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/learn/${c.id}`)}
                        className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors shrink-0 cursor-pointer"
                      >
                        Launch Course Player
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PRACTICE LOGS */}
            {activeTab === 'practice' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-slate-900">
                      Practice Room Records
                    </h2>
                    <p className="text-xs text-slate-500">
                      Log your daily exercises, BPM, challenges, and receive feedback from your faculty mentor.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPracticeModal(true)}
                    className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Practice Log</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {practiceLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-5 rounded-2xl border border-stone-200 text-xs space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-stone-100 font-mono">
                        <span className="font-bold text-sm text-slate-900">
                          {log.instrument} · {log.durationMinutes} Minutes ({log.bpm} BPM)
                        </span>
                        <span className="text-slate-400">{log.date}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <strong className="text-slate-700 block mb-0.5">Objective:</strong>
                          <p className="text-slate-600">{log.learningObjective}</p>
                        </div>
                        <div>
                          <strong className="text-slate-700 block mb-0.5">Obstacles Encountered:</strong>
                          <p className="text-slate-600">{log.challengesEncountered}</p>
                        </div>
                      </div>

                      <div>
                        <strong className="text-slate-700 block mb-0.5">Progress Notes:</strong>
                        <p className="text-slate-600">{log.progressNotes}</p>
                      </div>

                      {log.instructorFeedback ? (
                        <div className="p-3.5 bg-lime-50 rounded-xl border border-lime-200 text-lime-950">
                          <div className="flex items-center justify-between font-bold mb-1">
                            <span>Instructor Feedback ({log.instructorFeedback.instructorName}):</span>
                            <span className="font-mono">Score: {log.instructorFeedback.practicalRating}/5 ★</span>
                          </div>
                          <p>{log.instructorFeedback.feedback}</p>
                          <span className="text-[10px] text-lime-800 font-mono mt-1 block">
                            Reviewed at {log.instructorFeedback.reviewedAt}
                          </span>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400 italic">
                          Pending instructor review during next studio session.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ASSESSMENTS & JURIES */}
            {activeTab === 'assessments' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Official Assessments & Jury Scores
                  </h2>
                  <p className="text-xs text-slate-500">
                    Academic performance jury results, written music theory papers, and rubric breakdowns.
                  </p>
                </div>

                <div className="space-y-6">
                  {assessments.map((ass) => (
                    <div
                      key={ass.id}
                      className="p-6 rounded-2xl border border-stone-200 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                        <div>
                          <div className="text-[10px] font-mono font-bold text-lime-700 uppercase">
                            {ass.type.replace('_', ' ')} · {ass.assessmentDate}
                          </div>
                          <h3 className="font-heading font-bold text-base text-slate-900">
                            {ass.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-black font-mono text-slate-900">
                              {ass.score} / {ass.maxScore}
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 uppercase">
                              {ass.gradeClassification}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rubric Breakdown */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                          Rubric Evaluation:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {ass.rubric.map((r, rIdx) => (
                            <div
                              key={rIdx}
                              className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-between"
                            >
                              <span className="text-slate-700 truncate pr-2">{r.name}</span>
                              <span className="font-mono font-bold text-slate-900 shrink-0">
                                {r.awardedPoints} / {r.maxPoints} pts
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {ass.feedback && (
                        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-slate-700 space-y-1">
                          <strong className="block text-slate-900">Examiner Commentary ({ass.assessedBy}):</strong>
                          <p className="leading-relaxed">{ass.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CERTIFICATES */}
            {activeTab === 'certificates' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Conferred Diplomas & Certificates
                  </h2>
                  <p className="text-xs text-slate-500">
                    Official credentials issued upon successful completion of practical and theoretical requirements.
                  </p>
                </div>

                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-6 rounded-2xl border border-stone-200 hover:border-slate-400 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                    >
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono font-bold text-lime-700 uppercase">
                          {cert.qualificationType} · {cert.gradeClassification}
                        </div>
                        <h3 className="font-heading font-bold text-lg text-slate-900">
                          {cert.programmeTitle}
                        </h3>
                        <div className="text-xs font-mono text-slate-500">
                          Certificate ID: <strong className="text-slate-800">{cert.certificateNumber}</strong>
                        </div>
                        <div className="text-xs text-slate-400">
                          Conferred: {cert.issueDate} · Authorized by {cert.signatoryName}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/certificates/verify/${cert.certificateNumber}`)}
                          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Official Certificate</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS */}
            {activeTab === 'payments' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-slate-900">
                      Tuition & Fee Statements
                    </h2>
                    <p className="text-xs text-slate-500">
                      Payment history, verified receipts, and Paystack tuition checkout.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTuitionModal(true)}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Make Tuition Payment
                  </button>
                </div>

                <div className="space-y-3">
                  {payments.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">{p.purpose}</div>
                        <div className="text-slate-500 font-mono text-[11px]">
                          Ref: {p.reference} · Receipt: {p.receiptNumber}
                        </div>
                        <div className="text-slate-400 text-[11px]">{p.paidAt} via {p.channel}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold font-mono text-slate-900">
                          {p.currency} {p.amount.toLocaleString()}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Student Registration Profile
                  </h2>
                  <p className="text-xs text-slate-500">
                    Official personal records registered with the Academic Board.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Full Legal Name</span>
                    <span className="text-sm font-bold text-slate-900">{currentUser.name}</span>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                    <span className="text-sm font-bold text-slate-900">{currentUser.email}</span>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Matriculation ID</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{currentUser.studentIdNumber || 'FJM-2026-0814'}</span>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Primary Instrument</span>
                    <span className="text-sm font-bold text-slate-900">{currentUser.instrument || 'Voice'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Log Practice Modal */}
      {showPracticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
              Log Practical Practice Session
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your session details for faculty evaluation and transcript recording.
            </p>

            <form onSubmit={handleCreatePracticeLog} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={practiceDate}
                    onChange={(e) => setPracticeDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    required
                    value={practiceDuration}
                    onChange={(e) => setPracticeDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Instrument / Skill</label>
                  <input
                    type="text"
                    required
                    value={practiceInstrument}
                    onChange={(e) => setPracticeInstrument(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target BPM</label>
                  <input
                    type="number"
                    min="40"
                    max="220"
                    value={practiceBpm}
                    onChange={(e) => setPracticeBpm(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Learning Objective *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diaphragmatic lip trills and passagio transition"
                  value={practiceObjective}
                  onChange={(e) => setPracticeObjective(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Obstacles Encountered</label>
                <input
                  type="text"
                  placeholder="e.g. Minor throat constriction on high notes"
                  value={practiceChallenges}
                  onChange={(e) => setPracticeChallenges(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Progress Notes *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Adjusted vowel modification to Oh; tone resonated easily with zero strain."
                  value={practiceNotes}
                  onChange={(e) => setPracticeNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPracticeModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl font-bold"
                >
                  Save Practice Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tuition Checkout Modal */}
      {showTuitionModal && (
        <PaystackModal
          isOpen={showTuitionModal}
          onClose={() => setShowTuitionModal(false)}
          amount={160000}
          currency="NGN"
          purpose="Tuition Payment"
          programmeTitle="Semester 1 Tuition"
          onSuccess={() => setShowTuitionModal(false)}
        />
      )}
    </div>
  );
};
