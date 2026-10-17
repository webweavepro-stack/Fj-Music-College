import React, { useState } from 'react';
import { Camera, Play, Image as ImageIcon, Music, Filter } from 'lucide-react';

import heroImg from '../assets/images/hero_live_performance_concert_1792230599291.jpg';
import studioImg from '../assets/images/studio_recording_mixing_1792230600495.jpg';
import choirImg from '../assets/images/rehearsal_vocal_ensemble_1792230600440.jpg';
import pianoImg from '../assets/images/masterclass_piano_keys_1792230600753.jpg';

interface GalleryViewProps {
  navigate: (path: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ navigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'studio' | 'masterclass'>('all');

  const galleryItems = [
    {
      id: 'g-1',
      title: 'Annual Gala Showcase Finale',
      category: 'live',
      image: heroImg,
      caption: 'Full 12-piece student ensemble performing live on the main auditorium stage.',
    },
    {
      id: 'g-2',
      title: 'Analog Mixing & Tracking Session',
      category: 'studio',
      image: studioImg,
      caption: 'Students balancing drum multitracks and vocal harmonies at the SSL console.',
    },
    {
      id: 'g-3',
      title: 'Choral Harmonization Pavilion',
      category: 'live',
      image: choirImg,
      caption: 'SATB vocal rehearsal directed by Dr. Clara Adeleke with acoustic grand piano.',
    },
    {
      id: 'g-4',
      title: 'Classical & Gospel Piano Masterclass',
      category: 'masterclass',
      image: pianoImg,
      caption: 'Prof. Olumide coaching finger touch technique and 2-5-1 passing chords.',
    },
    {
      id: 'g-5',
      title: 'Live Drum Miking & Phase Workshop',
      category: 'studio',
      image: studioImg,
      caption: 'Demonstrating XY overheads and snare acoustic phase alignment.',
    },
    {
      id: 'g-6',
      title: 'Vocal Jury Graduation Recital',
      category: 'masterclass',
      image: choirImg,
      caption: 'Final year vocal students performing 45-minute juried capstones before faculty.',
    },
  ];

  const filtered = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Media Archive
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Performance Gallery & Studio Sessions
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            A window into daily life at FJMUSIC College: live concert recitals, acoustic rehearsals, analog console tracking, and masterclasses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Media' },
            { id: 'live', label: 'Live Concerts' },
            { id: 'studio', label: 'Recording Studios' },
            { id: 'masterclass', label: 'Masterclasses & Juries' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as typeof activeFilter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-stone-200 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
            >
              <div className="relative h-60 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="text-[10px] uppercase font-bold text-lime-400">
                    {item.category}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="p-4 text-xs text-slate-600 leading-relaxed">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
