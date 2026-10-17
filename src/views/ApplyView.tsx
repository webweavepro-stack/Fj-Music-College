import React, { useState } from 'react';
import { useCollege } from '../context/CollegeContext';
import { Application } from '../types';
import { PaystackModal } from '../components/payment/PaystackModal';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  FileCheck,
  CreditCard,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ApplyViewProps {
  navigate: (path: string) => void;
}

export const ApplyView: React.FC<ApplyViewProps> = ({ navigate }) => {
  const { programmes, submitApplication, currentUser } = useCollege();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);
  const [showPaystackModal, setShowPaystackModal] = useState<boolean>(false);

  // Form state
  const [fullName, setFullName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '+234 812 345 6789');
  const [selectedProgrammeId, setSelectedProgrammeId] = useState(programmes[0]?.id || '');
  const [musicalBackground, setMusicalBackground] = useState(
    'Singing and playing keyboard for church and community performances for over 3 years. Looking to formalize music theory, voice technique, and stage presence.'
  );
  const [yearsExperience, setYearsExperience] = useState<number>(3);
  const [primaryInstrument, setPrimaryInstrument] = useState('Voice & Keyboard');
  const [auditionPreference, setAuditionPreference] = useState<'in_person' | 'video_link' | 'exempt'>('in_person');
  const [auditionVideoUrl, setAuditionVideoUrl] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; type: string; size: string }[]
  >([
    { name: 'government_identification.pdf', type: 'application/pdf', size: '1.2 MB' },
    { name: 'previous_music_grade_certificate.pdf', type: 'application/pdf', size: '890 KB' },
  ]);

  const selectedProg = programmes.find((p) => p.id === selectedProgrammeId) || programmes[0];

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          type: file.type || 'application/pdf',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        },
      ]);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const app = await submitApplication({
        applicantId: currentUser.id,
        applicantName: fullName,
        applicantEmail: email,
        applicantPhone: phone,
        programmeId: selectedProg.id,
        programmeTitle: selectedProg.title,
        category: selectedProg.category,
        musicalBackground,
        yearsOfExperience: Number(yearsExperience),
        primaryInstrumentOrVoice: primaryInstrument,
        auditionPreference,
        auditionVideoUrl: auditionPreference === 'video_link' ? auditionVideoUrl : undefined,
        documents: uploadedFiles,
      });

      setSubmittedApp(app);
      setStep(4); // Success screen
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
            FJMUSIC Admissions Portal
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 tracking-tight">
            Online Application for Admission
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Submit your application for Diploma, Certificate, or Practical Training cohorts.
          </p>
        </div>

        {/* Multi-step progress bar */}
        {step < 4 && (
          <div className="bg-white p-4 rounded-2xl border border-stone-200 mb-8 flex items-center justify-between text-xs font-semibold">
            {[
              { num: 1, label: 'Personal Information' },
              { num: 2, label: 'Programme & Background' },
              { num: 3, label: 'Audition & Documents' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s.num
                      ? 'bg-slate-950 text-white'
                      : step > s.num
                      ? 'bg-lime-500 text-slate-950'
                      : 'bg-stone-200 text-slate-500'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </span>
                <span className={`hidden sm:inline ${step === s.num ? 'text-slate-950 font-bold' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm">
          {/* STEP 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 pb-2 border-b border-stone-100">
                1. Personal & Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Oluwaseun Adeleke"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. applicant@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location / State of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Lagos State, Nigeria"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Programme Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Programme Selection & Musical Background */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 pb-2 border-b border-stone-100">
                2. Programme Selection & Musical Experience
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Choose Programme of Study *
                </label>
                <select
                  value={selectedProgrammeId}
                  onChange={(e) => setSelectedProgrammeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                >
                  {programmes.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.category.toUpperCase()}] {p.title} — ({p.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900">{selectedProg.title}</div>
                <p>{selectedProg.shortDescription}</p>
                <div className="flex items-center gap-4 pt-1 font-mono text-[11px] text-slate-500">
                  <span>Tuition: {selectedProg.currency} {selectedProg.tuitionFee.toLocaleString()}</span>
                  <span>·</span>
                  <span>App Fee: {selectedProg.currency} {selectedProg.applicationFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Instrument or Vocal Range *
                  </label>
                  <input
                    type="text"
                    required
                    value={primaryInstrument}
                    onChange={(e) => setPrimaryInstrument(e.target.value)}
                    placeholder="e.g. Voice (Tenor), Grand Piano, Bass, Drums"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Years of Active Playing/Singing *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Describe Your Musical Background & Aspirations *
                </label>
                <textarea
                  rows={4}
                  required
                  value={musicalBackground}
                  onChange={(e) => setMusicalBackground(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900 leading-relaxed"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Audition & Uploads</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Audition & Supporting Documents */}
          {step === 3 && (
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-slate-900 pb-2 border-b border-stone-100">
                3. Audition Format & Supporting Documents
              </h2>

              {selectedProg.requiresAudition ? (
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-slate-700">
                    How would you prefer to complete your audition? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      onClick={() => setAuditionPreference('in_person')}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                        auditionPreference === 'in_person'
                          ? 'border-slate-950 bg-stone-50 text-slate-950 font-semibold'
                          : 'border-stone-200 text-slate-600 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="audition"
                        checked={auditionPreference === 'in_person'}
                        onChange={() => setAuditionPreference('in_person')}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Campus Live Audition</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          Perform in our live performance suites before faculty panel.
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setAuditionPreference('video_link')}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                        auditionPreference === 'video_link'
                          ? 'border-slate-950 bg-stone-50 text-slate-950 font-semibold'
                          : 'border-stone-200 text-slate-600 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="audition"
                        checked={auditionPreference === 'video_link'}
                        onChange={() => setAuditionPreference('video_link')}
                        className="mt-0.5"
                      />
                      <div>
                        <div className="font-bold text-slate-900">Video / Audio Recording Link</div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          Submit YouTube, Google Drive, or SoundCloud unlisted link.
                        </div>
                      </div>
                    </label>
                  </div>

                  {auditionPreference === 'video_link' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Recording Link URL (YouTube, Vimeo, Drive, SoundCloud) *
                      </label>
                      <input
                        type="url"
                        required
                        value={auditionVideoUrl}
                        onChange={(e) => setAuditionVideoUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-slate-900"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-lime-50 border border-lime-200 rounded-xl text-xs text-lime-900">
                  <strong>Audition Exempt:</strong> This programme is open for direct admission based on educational submission without a mandatory live performance jury.
                </div>
              )}

              {/* Document Upload Area */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-700">
                  Supporting Documents (ID, Transcripts, Recommendations)
                </label>

                <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center hover:border-slate-500 transition-colors">
                  <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-800">
                    Click to browse files or drag and drop
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    PDF, JPG, PNG or MP3 up to 15MB each
                  </p>
                  <input
                    type="file"
                    onChange={handleSimulateUpload}
                    className="hidden"
                    id="doc-upload"
                  />
                  <label
                    htmlFor="doc-upload"
                    className="inline-block mt-3 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Select File From Device
                  </label>
                </div>

                {/* Uploaded Files list */}
                <div className="space-y-2">
                  {uploadedFiles.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-slate-700"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCheck className="w-4 h-4 text-lime-700 shrink-0" />
                        <span className="font-medium truncate">{f.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono shrink-0 ml-2">
                        {f.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Declaration */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-slate-600 leading-relaxed">
                By submitting this application, I certify that all supplied musical details and educational records are accurate. I understand that admission is subject to faculty board assessment and review.
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-lime-500 hover:bg-lime-400 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Application...</span>
                  ) : (
                    <>
                      <span>Submit Official Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Application Submitted Success & Pay Application Fee */}
          {step === 4 && submittedApp && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto text-lime-700">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-lime-800">
                  Application Successfully Registered
                </span>
                <h2 className="font-heading text-2xl font-black text-slate-900 mt-1">
                  Reference: {submittedApp.referenceNumber}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2">
                  Your application for <strong>{submittedApp.programmeTitle}</strong> has been logged in the college admissions database.
                </p>
              </div>

              {/* Application Details Summary */}
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-left max-w-md mx-auto text-xs space-y-2 font-mono">
                <div>Applicant: <span className="font-bold text-slate-900">{submittedApp.applicantName}</span></div>
                <div>Status: <span className="text-amber-700 font-bold uppercase">{submittedApp.status.replace('_', ' ')}</span></div>
                <div>Programme: <span className="text-slate-900">{submittedApp.programmeTitle}</span></div>
                <div>Audition Format: <span className="text-slate-900">{submittedApp.auditionPreference.replace('_', ' ')}</span></div>
                <div>Application Fee: <span className="text-slate-900">{selectedProg.currency} {selectedProg.applicationFee.toLocaleString()}</span></div>
                <div>Fee Status: <span className={submittedApp.applicationFeePaid ? 'text-lime-700 font-bold' : 'text-amber-700 font-bold'}>{submittedApp.applicationFeePaid ? 'PAID' : 'PENDING'}</span></div>
              </div>

              {/* Paystack Fee Checkout Button */}
              {!submittedApp.applicationFeePaid && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 max-w-md mx-auto text-xs text-amber-900 space-y-3">
                  <div className="font-bold flex items-center justify-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    <span>Paystack Application Fee Checkout</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    You can pay the NGN {selectedProg.applicationFee.toLocaleString()} application fee now using our secure Paystack gateway (Card, Bank, USSD) or pay later through your applicant dashboard.
                  </p>
                  <button
                    onClick={() => setShowPaystackModal(true)}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Pay Application Fee with Paystack ({selectedProg.currency} {selectedProg.applicationFee.toLocaleString()})
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => navigate('/student/application')}
                  className="w-full sm:w-auto px-6 py-3 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Track Application in Portal
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Paystack Application Fee Modal */}
      {showPaystackModal && (
        <PaystackModal
          isOpen={showPaystackModal}
          onClose={() => setShowPaystackModal(false)}
          amount={selectedProg.applicationFee}
          currency={selectedProg.currency}
          purpose="Application Fee"
          programmeTitle={selectedProg.title}
          onSuccess={() => {
            if (submittedApp) {
              setSubmittedApp({ ...submittedApp, applicationFeePaid: true });
            }
          }}
        />
      )}
    </div>
  );
};
