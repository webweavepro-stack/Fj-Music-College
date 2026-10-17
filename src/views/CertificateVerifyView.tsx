import React, { useState, useEffect } from 'react';
import { useCollege } from '../context/CollegeContext';
import { CertificateRecord } from '../types';
import { FjMusicLogo } from '../components/brand/FjMusicLogo';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  Printer,
  Award,
  Calendar,
  User,
  ExternalLink,
} from 'lucide-react';

interface CertificateVerifyViewProps {
  initialCertNumber?: string;
  navigate: (path: string) => void;
}

export const CertificateVerifyView: React.FC<CertificateVerifyViewProps> = ({
  initialCertNumber,
  navigate,
}) => {
  const { verifyCertificate, certificates } = useCollege();
  const [certInput, setCertInput] = useState(initialCertNumber || 'FJM-DIP-2026-8814');
  const [verifiedRecord, setVerifiedRecord] = useState<CertificateRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialCertNumber) {
      const match = verifyCertificate(initialCertNumber);
      setVerifiedRecord(match);
      setHasSearched(true);
    } else {
      // Auto-verify the demo certificate so the user sees immediate proof
      const defaultMatch = verifyCertificate('FJM-DIP-2026-8814');
      if (defaultMatch) {
        setVerifiedRecord(defaultMatch);
        setHasSearched(true);
      }
    }
  }, [initialCertNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = verifyCertificate(certInput);
    setVerifiedRecord(result);
    setHasSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            Academic Registry Credentials
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
            Official Certificate Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Verify the authenticity of diplomas and certificates issued by the Academic Board of FJMUSIC College.
          </p>
        </div>

        {/* Verification Lookup Input */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 mb-10 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter Certificate Number (e.g. FJM-DIP-2026-8814)"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-xl border border-stone-300 font-mono uppercase focus:outline-none focus:border-slate-900"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>Verify Record</span>
            </button>
          </form>

          {/* Quick Demo Certificate Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-stone-100 text-xs text-slate-500">
            <span>Test Issued Numbers:</span>
            {certificates.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCertInput(c.certificateNumber);
                  setVerifiedRecord(c);
                  setHasSearched(true);
                }}
                className="font-mono text-[11px] bg-stone-100 hover:bg-stone-200 text-slate-800 px-2 py-1 rounded transition-colors"
              >
                {c.certificateNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Result Area */}
        {hasSearched && (
          <div>
            {verifiedRecord ? (
              <div className="space-y-6">
                {/* Status Callout */}
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-heading font-bold text-sm text-emerald-950">
                        Official Academic Certificate Verified
                      </div>
                      <div className="text-xs text-emerald-800 font-mono">
                        Valid record found in FJMUSIC College Central Registry
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-white text-slate-800 hover:bg-stone-100 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>

                {/* Printable Certificate Frame */}
                <div
                  id="printable-certificate"
                  className="bg-white p-8 sm:p-14 rounded-3xl border-8 border-stone-100 shadow-xl relative overflow-hidden"
                >
                  {/* Ornate Gold Inner Border */}
                  <div className="border-2 border-amber-400/80 p-8 sm:p-12 relative flex flex-col items-center text-center">
                    {/* Background Seal Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                      <FjMusicLogo size="xl" variant="mark" />
                    </div>

                    {/* Logo & Header */}
                    <div className="mb-6">
                      <FjMusicLogo size="lg" variant="full" showSlogan={false} />
                    </div>

                    <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                      Academic Conservatoire & Performance Institute
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl font-serif text-slate-900 tracking-wide mb-6">
                      Certificate of Academic Completion
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 mb-2">
                      This is to certify that
                    </p>

                    {/* Student Name */}
                    <div className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 border-b-2 border-slate-900 pb-2 mb-4 px-8 max-w-lg">
                      {verifiedRecord.studentName}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-4">
                      has successfully satisfied all prescribed practical juries, musicianship assessments, and academic coursework for the award of
                    </p>

                    {/* Programme Title */}
                    <div className="font-heading text-lg sm:text-2xl font-bold text-slate-900 mb-2">
                      {verifiedRecord.programmeTitle}
                    </div>

                    <div className="inline-block px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-xs font-bold text-amber-900 mb-8 font-mono">
                      Graduation Classification: {verifiedRecord.gradeClassification}
                    </div>

                    {/* Bottom Signatories & Verification Data */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-stone-200 text-left text-xs">
                      <div>
                        <div className="font-serif text-base italic text-slate-800 font-semibold mb-1">
                          {verifiedRecord.signatoryName}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          {verifiedRecord.signatoryTitle}
                        </div>
                        <div className="text-slate-400 text-[10px] mt-1">
                          Issue Date: {verifiedRecord.issueDate}
                        </div>
                      </div>

                      <div className="text-right sm:text-right font-mono text-[11px] space-y-1 text-slate-500">
                        <div>
                          Certificate ID: <strong className="text-slate-900">{verifiedRecord.certificateNumber}</strong>
                        </div>
                        <div>
                          Registry Status: <span className="text-emerald-700 font-bold">VERIFIED ACTIVE</span>
                        </div>
                        <div>
                          Audit Ref: FJM-VER-{verifiedRecord.id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-rose-50 rounded-2xl border border-rose-200 text-center space-y-3">
                <XCircle className="w-10 h-10 text-rose-600 mx-auto" />
                <h3 className="font-heading font-bold text-lg text-rose-950">
                  Certificate Record Not Found
                </h3>
                <p className="text-xs text-rose-800 max-w-md mx-auto">
                  No certificate matching <strong>"{certInput}"</strong> exists in the official FJMUSIC College repository. Please verify the code or contact the academic registry.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
