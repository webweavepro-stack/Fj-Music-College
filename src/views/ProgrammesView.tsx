import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { ProgrammeCategory } from '../types';
import { Search, Filter, ArrowRight, CheckCircle2, Music } from 'lucide-react';
import pianoImg from '../assets/images/masterclass_piano_keys_1792230600753.jpg';

interface ProgrammesViewProps {
  navigate: (path: string) => void;
}

export const ProgrammesView: React.FC<ProgrammesViewProps> = ({ navigate }) => {
  const { programmes } = useCollege();
  const [category, setCategory] = useState<ProgrammeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = programmes.filter((p) => {
    const matchesCat = category === 'all' || p.category === category;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.discipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Academic Catalogue
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Academic Programmes & Practical Syllabi
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            FJMUSIC College offers formal Diploma qualifications, foundational Certificate studies, and practical studio/rehearsal residencies. Every programme combines technical musicianship with live stage delivery.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search vocal, piano, audio, theory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-slate-900"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                category === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({programmes.length})
            </button>
            <button
              onClick={() => setCategory('diploma')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                category === 'diploma' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diplomas
            </button>
            <button
              onClick={() => setCategory('certificate')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                category === 'certificate' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Certificates
            </button>
            <button
              onClick={() => setCategory('practical')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                category === 'practical' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Practical Training
            </button>
          </div>
        </div>

        {/* Programme Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto">
            <Music className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-slate-900 text-base mb-1">
              No matching programmes found
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your search criteria or resetting filters.
            </p>
            <button
              onClick={() => {
                setCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img
                      src={prog.coverImage || pianoImg}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="font-semibold uppercase tracking-wider text-lime-400 text-[10px]">
                        {prog.discipline}
                      </span>
                      <span className="text-[11px] font-mono text-slate-200">
                        {prog.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="capitalize font-semibold text-slate-800">
                        {prog.category === 'diploma'
                          ? 'Diploma'
                          : prog.category === 'certificate'
                          ? 'Certificate'
                          : 'Practical Residency'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{prog.deliveryFormat}</span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-slate-900 mb-2 group-hover:text-lime-700 transition-colors">
                      {prog.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {prog.shortDescription}
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tuition Fee</span>
                        <span className="font-bold font-mono text-slate-900 text-sm">
                          {prog.currency} {prog.tuitionFee.toLocaleString()}
                        </span>
                      </div>
                      {prog.requiresAudition && (
                        <span className="text-[11px] text-amber-700 font-medium">
                          Audition Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/programmes/${prog.slug}`)}
                    className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-slate-900 font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer"
                  >
                    View Curriculum
                  </button>
                  <button
                    onClick={() => navigate('/apply')}
                    className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
