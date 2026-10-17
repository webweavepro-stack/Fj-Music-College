import React from 'react';
import { useCollege } from '../context/CollegeContext';
import { GraduationCap, BookOpen, Music, CheckCircle2 } from 'lucide-react';

interface FacultyViewProps {
  navigate: (path: string) => void;
}

export const FacultyView: React.FC<FacultyViewProps> = ({ navigate }) => {
  const { faculty } = useCollege();

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Academic Leadership & Artists
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Distinguished Faculty & Instructors
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Our lecturers, conservatory fellows, and production engineers mentor students through masterclasses, private lessons, and live performance juries.
          </p>
        </div>

        <div className="space-y-8">
          {faculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 hover:shadow-md transition-shadow"
            >
              <div className="md:col-span-4 h-72 md:h-auto bg-slate-900 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:col-span-8 p-6 sm:p-10 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-lime-800 uppercase tracking-wider mb-1">
                    {member.role}
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-slate-900">
                    {member.name}
                  </h2>
                  <div className="text-xs font-medium text-slate-500 mb-3">
                    {member.title} · <span className="text-slate-700 font-semibold">{member.education}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-xs text-slate-700 italic mb-4">
                    “{member.teachingPhilosophy}”
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-stone-100">
                    <div>
                      <span className="font-bold text-slate-800">Instruments: </span>
                      {member.instruments.join(', ')}
                    </div>
                    <span>·</span>
                    <div>
                      <span className="font-bold text-slate-800">Course Codes: </span>
                      {member.assignedCourses.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => navigate('/programmes')}
                    className="px-4 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    View Courses by this Instructor
                  </button>
                  <button
                    onClick={() => navigate('/apply')}
                    className="px-4 py-2 bg-stone-100 text-slate-800 rounded-xl text-xs font-semibold hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    Apply to Study with Faculty
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
