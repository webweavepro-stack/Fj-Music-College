import React from 'react';
import { FjMusicLogo } from '../brand/FjMusicLogo';
import { useCollege } from '../../context/CollegeContext';
import {
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings } = useCollege();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & Institutional Belief */}
          <div className="lg:col-span-2 space-y-4">
            <FjMusicLogo size="lg" theme="dark" variant="full" showSlogan={true} />
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mt-3">
              {settings.institutionalBelief}
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>{settings.campusAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lime-400 shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lime-400 shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Programmes */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-white tracking-wide uppercase">
              Programmes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('/programmes/diploma-voice-and-vocal-performance')}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Diploma in Vocal Performance
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/programmes/diploma-keyboard-piano')}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Diploma in Keyboard / Piano
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/programmes/diploma-music-production')}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Diploma in Music Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/programmes/diploma-contemporary-christian-music')}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Contemporary Christian Music & MD
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/programmes/certificate-scales-and-key-signatures')}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Note Reading & Scale Signatures
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/programmes/certificate-tonic-sol-fa')}
                  className="hover:text-lime-400 transition-colors text-left"
                >
                  Tonic Sol-fa & Ear Training
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Practical Facilities & Admissions */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-white tracking-wide uppercase">
              Campus & Training
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/practical-training')} className="hover:text-lime-400 transition-colors">
                  Acoustic Practice Rooms
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/practical-training')} className="hover:text-lime-400 transition-colors">
                  Live Band Rehearsal Suites
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/practical-training')} className="hover:text-lime-400 transition-colors">
                  SSL Recording Control Room
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/auditions')} className="hover:text-lime-400 transition-colors">
                  Audition Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/events')} className="hover:text-lime-400 transition-colors">
                  Concert Hall Recitals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-lime-400 transition-colors">
                  Performance Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Verification & Governance */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-white tracking-wide uppercase">
              Registry & Verification
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('/certificates/verify')}
                  className="hover:text-lime-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                  <span>Verify Certificate</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admissions')} className="hover:text-lime-400 transition-colors">
                  Admissions Criteria
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-lime-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-lime-400 transition-colors">
                  Terms of Enrollment
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/refund-policy')} className="hover:text-lime-400 transition-colors">
                  Tuition & Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {settings.collegeName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-400">
              FROM PRACTICE ROOM TO LIVE PERFORMANCE
            </span>
            <span aria-hidden="true">·</span>
            <span>Accredited Academic & Practical Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
