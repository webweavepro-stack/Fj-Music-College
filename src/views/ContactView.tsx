import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  Building,
} from 'lucide-react';

interface ContactViewProps {
  navigate: (path: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ navigate }) => {
  const { settings } = useCollege();
  const [sent, setSent] = useState(false);
  const [visitBooked, setVisitBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitBooked(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Get in Touch
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Admissions & Campus Registry
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Have questions regarding programmes, audition repertoire, tuition schedules, or scheduling a visit to our live studios? Reach our registry desk directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 space-y-6">
              <h2 className="font-heading text-lg font-bold text-slate-900">
                Performance Campus Location
              </h2>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Address:</strong>
                    <span>{settings.campusAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Admissions Email:</strong>
                    <a href={`mailto:${settings.contactEmail}`} className="text-slate-900 hover:underline">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Telephone / WhatsApp:</strong>
                    <span>{settings.contactPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-lime-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Office & Studio Hours:</strong>
                    <span>Monday – Friday: 08:30 – 19:00 WAT</span>
                    <span className="block text-slate-500">Saturday (Ensemble & Masterclasses): 09:00 – 18:00 WAT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Book a Campus Visit Card */}
            <div className="bg-slate-950 text-white p-8 rounded-3xl border border-slate-900 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Visit FJMUSIC Studios</span>
              </div>
              <h3 className="font-heading text-xl font-bold">
                Book a Campus Walkthrough
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tour our acoustic practice rooms, SSL audio mixing control rooms, and sit in on an open choir rehearsal.
              </p>

              {visitBooked ? (
                <div className="p-4 bg-slate-900 border border-lime-500/40 rounded-xl text-xs text-lime-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                  <span>Your visit has been registered! Our admissions desk will call to confirm your arrival time.</span>
                </div>
              ) : (
                <form onSubmit={handleBookVisit} className="space-y-3 pt-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-lime-500"
                  />
                  <input
                    type="date"
                    required
                    defaultValue="2026-11-05"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-lime-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Confirm Tour Booking
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">
                Send an Admissions Enquiry
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Fill in the details below and an admissions officer will respond within 24 hours.
              </p>

              {sent ? (
                <div className="p-8 text-center space-y-3 bg-stone-50 rounded-2xl border border-stone-200">
                  <CheckCircle2 className="w-10 h-10 text-lime-700 mx-auto" />
                  <h3 className="font-heading font-bold text-base text-slate-900">
                    Enquiry Received
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you for reaching out to FJMUSIC College. An admissions counsellor has been assigned to your query.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@example.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 ..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Programme of Interest
                      </label>
                      <select className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900">
                        <option>Diploma in Vocal Performance</option>
                        <option>Diploma in Keyboard / Piano</option>
                        <option>Diploma in Music Production</option>
                        <option>Contemporary Christian Music & MD</option>
                        <option>Certificate in Music Theory & Scales</option>
                        <option>Practical Band & Rehearsals</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message or Specific Question *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Ask about audition requirements, fees, course timings..."
                      className="w-full p-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Admissions</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
