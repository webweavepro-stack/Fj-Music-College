import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { CollegeEvent } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Ticket,
  X,
  Share2,
} from 'lucide-react';

interface EventsViewProps {
  navigate: (path: string) => void;
  onSelectEvent: (event: CollegeEvent) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ navigate, onSelectEvent }) => {
  const { events, registerForEvent, eventRegistrations } = useCollege();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalEvent, setModalEvent] = useState<CollegeEvent | null>(null);
  const [ticketResult, setTicketResult] = useState<{ ticketCode?: string; message: string } | null>(null);

  const filtered = events.filter((e) => {
    if (selectedCategory === 'all') return true;
    return e.category === selectedCategory;
  });

  const handleRegister = (event: CollegeEvent) => {
    setModalEvent(event);
    setTicketResult(null);
  };

  const handleConfirmRegistration = () => {
    if (!modalEvent) return;
    const res = registerForEvent(modalEvent.id);
    setTicketResult(res);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Performance Calendar
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Concerts, Recitals & Masterclasses
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Every semester at FJMUSIC College culminates in public performances, student jury recitals, guest artist workshops, and full orchestral gala showcases.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {['all', 'showcase', 'masterclass', 'workshop', 'concert'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-stone-200 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'All Events' : cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => {
            const isRegistered = eventRegistrations.some((r) => r.eventId === event.id);

            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  <div className="relative h-48 bg-slate-900">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-lime-400">
                      {event.date}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      {event.category.replace('_', ' ')} · {event.deliveryFormat}
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {event.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono pt-1">
                        Capacity: {event.registeredCount} / {event.capacity} seats filled
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {isRegistered ? (
                    <div className="w-full py-2.5 bg-lime-100 text-lime-900 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-lime-700" />
                      <span>Ticket Reserved</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRegister(event)}
                      className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Reserve Free Ticket
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Registration Modal */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Ticket className="w-5 h-5 text-lime-400" />
                <h3 className="font-heading font-bold text-sm">
                  Event Registration
                </h3>
              </div>
              <button
                onClick={() => setModalEvent(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {ticketResult ? (
                <div className="text-center space-y-4 py-2">
                  <div className="w-14 h-14 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-slate-900">
                      Registration Confirmed!
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Your ticket has been generated and sent to your email.
                    </p>
                  </div>

                  {ticketResult.ticketCode && (
                    <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-center">
                      <div className="text-[11px] text-slate-400 uppercase">Your Entry Passcode</div>
                      <div className="text-xl font-black text-slate-900 tracking-wider">
                        {ticketResult.ticketCode}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        Present this barcode or ticket at the auditorium reception.
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setModalEvent(null)}
                    className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900">
                      {modalEvent.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {modalEvent.date} · {modalEvent.time}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {modalEvent.description}
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                    <div>Venue: <strong>{modalEvent.venue}</strong></div>
                    <div>Format: <strong>{modalEvent.deliveryFormat}</strong></div>
                    <div>Admission: <strong className="text-lime-700">Complimentary Student & Community Pass</strong></div>
                  </div>

                  <button
                    onClick={handleConfirmRegistration}
                    className="w-full py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Confirm My Registration
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
