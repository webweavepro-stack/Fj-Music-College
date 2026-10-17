import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import { PracticeLog, AssessmentRecord } from '../../types';
import {
  Users,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Star,
  MessageSquare,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface InstructorPortalViewProps {
  currentTab?: string;
  navigate: (path: string) => void;
}

export const InstructorPortalView: React.FC<InstructorPortalViewProps> = ({
  currentTab = 'dashboard',
  navigate,
}) => {
  const {
    currentUser,
    courses,
    practiceLogs,
    assessments,
    reviewPracticeLog,
    submitAssessmentGrade,
  } = useCollege();

  const [activeTab, setActiveTab] = useState(currentTab);
  const [selectedLog, setSelectedLog] = useState<PracticeLog | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState<number>(5);

  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentRecord | null>(null);
  const [scoreInput, setScoreInput] = useState<number>(90);
  const [assessmentFeedback, setAssessmentFeedback] = useState('');

  const handleReviewLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLog) return;
    reviewPracticeLog(selectedLog.id, feedbackText, Number(rating));
    setSelectedLog(null);
    setFeedbackText('');
  };

  const handleGradeAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssessment) return;
    submitAssessmentGrade(selectedAssessment.id, Number(scoreInput), assessmentFeedback);
    setSelectedAssessment(null);
    setAssessmentFeedback('');
  };

  const pendingLogs = practiceLogs.filter((l) => !l.instructorFeedback);

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-slate-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-lime-600 to-emerald-500 flex items-center justify-center text-slate-950 font-heading font-black text-2xl shadow-inner">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-wider">
                <span>FACULTY & INSTRUCTOR PORTAL</span>
                <span aria-hidden="true">·</span>
                <span>FJMUSIC ACADEMIC BOARD</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {currentUser.name}
              </h1>
              <div className="text-xs text-slate-300 mt-0.5">
                Role: Senior Conservatory Lecturer · Director of Vocal Studies
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-lime-400 font-bold">
              {pendingLogs.length} Pending Practice Reviews
            </span>
          </div>
        </div>

        {/* Layout Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-sm">
              {[
                { id: 'dashboard', label: 'Faculty Dashboard', icon: TrendingUp },
                { id: 'courses', label: 'Assigned Courses', icon: BookOpen },
                { id: 'students', label: 'Student Practice Logs', icon: Users },
                { id: 'assessments', label: 'Jury & Grade Entry', icon: Award },
              ].map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
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
          </div>

          <div className="lg:col-span-9 space-y-6">
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Assigned Courses</span>
                    <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                      {courses.length}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Active In Term</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Practice Submissions</span>
                    <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                      {practiceLogs.length}
                    </div>
                    <span className="text-[10px] text-lime-700 font-semibold mt-1 block">
                      {pendingLogs.length} awaiting feedback
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Jury Assessments</span>
                    <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                      {assessments.length}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Scheduled This Semester</span>
                  </div>
                </div>

                {/* Practice Logs Requiring Attention */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                  <h2 className="font-heading text-base font-bold text-slate-900 mb-4">
                    Student Practice Submissions
                  </h2>
                  <div className="space-y-3">
                    {practiceLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 font-bold text-slate-900">
                            <span>{log.studentName}</span>
                            <span className="text-slate-400 font-normal">·</span>
                            <span className="font-mono text-lime-800">{log.instrument} ({log.durationMinutes}m)</span>
                          </div>
                          <p className="text-slate-600 line-clamp-1"><strong>Obj:</strong> {log.learningObjective}</p>
                          <p className="text-slate-500 text-[11px] line-clamp-1">{log.progressNotes}</p>
                        </div>

                        <div>
                          {log.instructorFeedback ? (
                            <span className="px-3 py-1 bg-lime-100 text-lime-900 rounded-lg font-bold text-[11px]">
                              Reviewed ({log.instructorFeedback.practicalRating}/5 ★)
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedLog(log);
                                setRating(5);
                                setFeedbackText('');
                              }}
                              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer"
                            >
                              Add Faculty Review
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COURSES */}
            {activeTab === 'courses' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    My Teaching Courses
                  </h2>
                  <p className="text-xs text-slate-500">
                    Courses and masterclasses assigned to your faculty profile.
                  </p>
                </div>

                <div className="space-y-4">
                  {courses.map((c) => (
                    <div key={c.id} className="p-5 rounded-2xl border border-stone-200 space-y-2">
                      <div className="font-mono text-xs font-bold text-lime-700">{c.code} · {c.level}</div>
                      <h3 className="font-heading font-bold text-base text-slate-900">{c.title}</h3>
                      <p className="text-xs text-slate-600">{c.description}</p>
                      <div className="text-xs text-slate-400 pt-2 border-t border-stone-100 flex items-center justify-between">
                        <span>Modules: {c.modules.length}</span>
                        <button
                          onClick={() => navigate(`/learn/${c.id}`)}
                          className="text-slate-900 font-bold hover:underline"
                        >
                          Preview LMS Lesson Player →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: STUDENTS */}
            {activeTab === 'students' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Student Practice Review Desk
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review student practice journals, listen to audio samples, and award ratings.
                  </p>
                </div>

                <div className="space-y-4">
                  {practiceLogs.map((log) => (
                    <div key={log.id} className="p-5 rounded-2xl border border-stone-200 text-xs space-y-3">
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-bold text-sm text-slate-900">{log.studentName} — {log.instrument}</span>
                        <span className="text-slate-500">{log.date}</span>
                      </div>
                      <p><strong>Objective:</strong> {log.learningObjective}</p>
                      <p><strong>Notes:</strong> {log.progressNotes}</p>
                      {log.challengesEncountered && (
                        <p className="text-amber-800"><strong>Challenges:</strong> {log.challengesEncountered}</p>
                      )}

                      {log.instructorFeedback ? (
                        <div className="p-3 bg-lime-50 rounded-xl border border-lime-200 text-lime-950">
                          <strong>Feedback Provided:</strong> {log.instructorFeedback.feedback} ({log.instructorFeedback.practicalRating}/5)
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedLog(log);
                            setRating(5);
                          }}
                          className="px-4 py-2 bg-slate-950 text-white rounded-xl font-bold text-xs"
                        >
                          Record Feedback
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ASSESSMENTS */}
            {activeTab === 'assessments' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Jury Grading & Rubric Scoring
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enter examination scores and qualitative commentary for vocal and keyboard juries.
                  </p>
                </div>

                <div className="space-y-4">
                  {assessments.map((ass) => (
                    <div key={ass.id} className="p-5 rounded-2xl border border-stone-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-mono font-bold text-lime-700 uppercase">{ass.type.replace('_', ' ')}</div>
                          <h3 className="font-heading font-bold text-base text-slate-900">{ass.title} — {ass.studentName}</h3>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-mono font-black text-slate-900">{ass.score} / {ass.maxScore}</span>
                          <span className="text-xs block text-emerald-600 font-bold">{ass.gradeClassification}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setSelectedAssessment(ass);
                            setScoreInput(ass.score || 90);
                            setAssessmentFeedback(ass.feedback || '');
                          }}
                          className="px-4 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold"
                        >
                          Update Jury Grade & Rubric
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Practice Log Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs">
            <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
              Add Faculty Practice Review for {selectedLog.studentName}
            </h3>
            <p className="text-slate-500 mb-4">
              Session: {selectedLog.instrument} · {selectedLog.durationMinutes} mins on {selectedLog.date}
            </p>

            <form onSubmit={handleReviewLog} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                >
                  <option value={5}>5 Stars — Flawless Execution</option>
                  <option value={4}>4 Stars — Solid Progress</option>
                  <option value={3}>3 Stars — Satisfactory</option>
                  <option value={2}>2 Stars — Needs More Repetition</option>
                  <option value={1}>1 Star — Revisit Foundations</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Feedback Commentary *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Great vowel modification. Keep soft palate relaxed during the passagio..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 bg-stone-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Assessment Modal */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs">
            <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
              Grade Assessment: {selectedAssessment.title}
            </h3>
            <p className="text-slate-500 mb-4">
              Candidate: {selectedAssessment.studentName}
            </p>

            <form onSubmit={handleGradeAssessment} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Score (out of 100) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={scoreInput}
                  onChange={(e) => setScoreInput(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-mono text-base font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Examiner Jury Report *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide comprehensive jury commentary on pitch, tone, tempo, and stage posture..."
                  value={assessmentFeedback}
                  onChange={(e) => setAssessmentFeedback(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssessment(null)}
                  className="px-4 py-2 bg-stone-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl"
                >
                  Record Official Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
