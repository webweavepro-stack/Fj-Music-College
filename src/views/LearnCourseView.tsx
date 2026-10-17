import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { Course, Lesson } from '../types';
import { VirtualPiano } from '../components/music-tools/VirtualPiano';
import { MetronomeTool } from '../components/music-tools/MetronomeTool';
import { EarTrainingQuiz } from '../components/music-tools/EarTrainingQuiz';
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Music,
  Download,
  Clock,
  Sparkles,
  FileText,
  Volume2,
} from 'lucide-react';

interface LearnCourseViewProps {
  courseId: string;
  lessonId?: string;
  navigate: (path: string) => void;
}

export const LearnCourseView: React.FC<LearnCourseViewProps> = ({
  courseId,
  lessonId,
  navigate,
}) => {
  const { courses, completedLessonIds, markLessonComplete } = useCollege();

  const course = courses.find((c) => c.id === courseId) || courses[0];

  // Flatten lessons to find current and next/prev
  const allLessons: Lesson[] = course.modules.flatMap((m) => m.lessons);
  const activeLesson = allLessons.find((l) => l.id === lessonId) || allLessons[0];
  const activeIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);

  const prevLesson = activeIndex > 0 ? allLessons[activeIndex - 1] : null;
  const nextLesson = activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;

  const [activeTab, setActiveTab] = useState<'content' | 'piano' | 'metronome' | 'eartraining'>('content');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [assignmentNotes, setAssignmentNotes] = useState('');

  const isCompleted = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;

  const handleToggleComplete = () => {
    if (activeLesson) {
      markLessonComplete(activeLesson.id);
    }
  };

  const completedCount = allLessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = Math.round((completedCount / (allLessons.length || 1)) * 100);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* LMS Top Header */}
      <div className="bg-slate-950 text-white px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3 truncate">
          <button
            onClick={() => navigate('/student/courses')}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            title="Back to Student Portal"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="truncate">
            <div className="text-[11px] font-mono text-lime-400 uppercase font-semibold">
              {course.code} · {course.level}
            </div>
            <h1 className="font-heading font-bold text-sm sm:text-base text-white truncate">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col items-end text-xs">
            <span className="text-slate-400 text-[10px]">Course Progress</span>
            <span className="font-mono font-bold text-lime-400">
              {completedCount} of {allLessons.length} lessons ({progressPercent}%)
            </span>
          </div>
          <div className="w-24 sm:w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-lime-500 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main LMS Layout: Left Sidebar + Right Lesson Player */}
      <div className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 p-4 sm:p-6">
        {/* Course Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-5 mb-6 lg:mb-0 h-max max-h-[82vh] overflow-y-auto shadow-sm">
          <div className="mb-4 pb-3 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Course Curriculum
            </h2>
            <span className="text-[11px] text-slate-500 font-mono">
              Instructor: {course.instructorName}
            </span>
          </div>

          <div className="space-y-5">
            {course.modules.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {mod.title}
                </div>
                <div className="space-y-1">
                  {mod.lessons.map((lesson) => {
                    const isCurrent = activeLesson?.id === lesson.id;
                    const done = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => navigate(`/learn/${course.id}/${lesson.id}`)}
                        className={`w-full text-left p-3 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-slate-950 text-white font-semibold shadow-sm'
                            : 'hover:bg-stone-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          {done ? (
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                isCurrent ? 'text-lime-400' : 'text-lime-600'
                              }`}
                            />
                          ) : (
                            <Circle
                              className={`w-4 h-4 shrink-0 ${
                                isCurrent ? 'text-slate-400' : 'text-slate-300'
                              }`}
                            />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono shrink-0 ${
                            isCurrent ? 'text-slate-300' : 'text-slate-400'
                          }`}
                        >
                          {lesson.durationMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Lesson Stage & Content Deck (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeLesson && (
            <>
              {/* Lesson Card */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm">
                {/* Header */}
                <div className="pb-4 mb-6 border-b border-stone-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      <span>{activeLesson.type.replace('_', ' ')}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeLesson.durationMinutes} Minutes</span>
                    </div>
                    <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900">
                      {activeLesson.title}
                    </h2>
                  </div>

                  <button
                    onClick={handleToggleComplete}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-lime-100 text-lime-900 border border-lime-300'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                  </button>
                </div>

                {/* Practical Interactive Tools Bar (Virtual Piano, Metronome, Ear Trainer) */}
                <div className="flex flex-wrap items-center gap-2 mb-6 p-1.5 bg-stone-100 rounded-2xl">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                      activeTab === 'content'
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    Lesson Notes & Audio
                  </button>
                  <button
                    onClick={() => setActiveTab('piano')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'piano'
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <Music className="w-3.5 h-3.5 text-lime-700" />
                    <span>Virtual Piano & Sol-fa</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('metronome')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'metronome'
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Practice Metronome</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('eartraining')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'eartraining'
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Ear Training Lab</span>
                  </button>
                </div>

                {/* Tab 1: Lesson Notes Content */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    {/* Summary callout */}
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      “{activeLesson.summary}”
                    </div>

                    {/* Sheet Music / Audio Snippet if present */}
                    {activeLesson.sheetMusicSnippet && (
                      <div className="p-5 bg-slate-950 text-white rounded-2xl border border-slate-900 space-y-2">
                        <div className="flex items-center justify-between text-xs text-lime-400 font-semibold uppercase">
                          <span>Music Notation & Sol-fa Score</span>
                          <span className="font-mono">Grand Staff</span>
                        </div>
                        <div className="font-mono text-lg font-bold text-lime-300 tracking-wider bg-slate-900 p-3 rounded-xl border border-slate-800">
                          {activeLesson.sheetMusicSnippet}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Use the Virtual Piano tab above to play this sequence note by note.
                        </p>
                      </div>
                    )}

                    {/* Rich Content Prose */}
                    <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700">
                      {activeLesson.content.split('\n\n').map((paragraph, pIdx) => {
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={pIdx} className="font-heading text-lg font-bold text-slate-900 pt-2">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('#### ')) {
                          return (
                            <h4 key={pIdx} className="font-heading text-sm font-bold text-slate-900 pt-1">
                              {paragraph.replace('#### ', '')}
                            </h4>
                          );
                        }
                        return <p key={pIdx}>{paragraph}</p>;
                      })}
                    </div>

                    {/* Exercise Prompt */}
                    {activeLesson.exercisePrompt && (
                      <div className="p-5 bg-lime-50 rounded-2xl border border-lime-200 space-y-2">
                        <div className="text-xs font-bold text-lime-900 uppercase tracking-wide">
                          Required Practice Room Task:
                        </div>
                        <p className="text-xs text-lime-950 leading-relaxed">
                          {activeLesson.exercisePrompt}
                        </p>
                      </div>
                    )}

                    {/* Downloadable Authorized Resources */}
                    {activeLesson.resources.length > 0 && (
                      <div className="pt-4 border-t border-stone-100">
                        <h4 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wide mb-3">
                          Authorized Lesson Downloads
                        </h4>
                        <div className="space-y-2">
                          {activeLesson.resources.map((res) => (
                            <div
                              key={res.id}
                              className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs"
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <FileText className="w-4 h-4 text-slate-700 shrink-0" />
                                <span className="font-semibold text-slate-900 truncate">{res.title}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0 ml-2">
                                <span className="text-[11px] font-mono text-slate-400">{res.size}</span>
                                <button
                                  onClick={() => alert(`Downloading verified authorized resource: ${res.title}`)}
                                  className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Download</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Virtual Piano Embedded */}
                {activeTab === 'piano' && (
                  <div className="space-y-4">
                    <VirtualPiano />
                  </div>
                )}

                {/* Tab 3: Metronome Embedded */}
                {activeTab === 'metronome' && (
                  <div className="space-y-4">
                    <MetronomeTool />
                  </div>
                )}

                {/* Tab 4: Ear Training Embedded */}
                {activeTab === 'eartraining' && (
                  <div className="space-y-4">
                    <EarTrainingQuiz />
                  </div>
                )}

                {/* Bottom Lesson Navigation */}
                <div className="mt-10 pt-6 border-t border-stone-100 flex items-center justify-between">
                  {prevLesson ? (
                    <button
                      onClick={() => navigate(`/learn/${course.id}/${prevLesson.id}`)}
                      className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous: {prevLesson.title}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextLesson ? (
                    <button
                      onClick={() => {
                        handleToggleComplete();
                        navigate(`/learn/${course.id}/${nextLesson.id}`);
                      }}
                      className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Next: {nextLesson.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/student/courses')}
                      className="px-5 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Complete Course Review
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
