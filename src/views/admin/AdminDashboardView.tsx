import React, { useState } from 'react';
import { useCollege } from '../../context/CollegeContext';
import {
  Application,
  Programme,
  CertificateRecord,
  FacultyMember,
  ProgrammeCategory,
} from '../../types';
import confetti from 'canvas-confetti';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  CreditCard,
  Award,
  Settings,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Calendar,
  Plus,
  RefreshCw,
  Search,
  Sliders,
  DollarSign,
  ExternalLink,
  Edit2,
  Trash2,
  Copy,
  Check,
  Music,
  GraduationCap,
  Sparkles,
  AlertTriangle,
  Database,
  Code,
  X,
  ArrowRight,
} from 'lucide-react';

interface AdminDashboardViewProps {
  currentTab?: string;
  navigate: (path: string) => void;
}

const PRESET_FACULTY_PHOTOS = [
  { label: 'Vocal / Choral', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Piano / Keyboard', url: 'https://images.unsplash.com/photo-1520523839898-507121c00dfa?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Studio & Production', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Band & Contemporary', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Conductor / Academic', url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Strings & Instrumental', url: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=1200&q=80' },
];

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentTab = 'overview',
  navigate,
}) => {
  const {
    currentUser,
    applications,
    programmes,
    faculty,
    certificates,
    payments,
    auditLogs,
    settings,
    supabaseStatus,
    checkSupabase,
    updateApplicationStatus,
    updateSettings,
    issueCertificate,
    resetAllData,
    addProgramme,
    updateProgramme,
    deleteProgramme,
    addFaculty,
    updateFaculty,
    deleteFaculty,
  } = useCollege();

  const [activeTab, setActiveTab] = useState(currentTab);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // ----------------------------------------------------
  // Application Review state
  // ----------------------------------------------------
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [staffNoteInput, setStaffNoteInput] = useState('');
  const [auditionDateInput, setAuditionDateInput] = useState('2026-11-10 11:00 WAT');

  // ----------------------------------------------------
  // Issue Certificate Form State
  // ----------------------------------------------------
  const [showIssueCertModal, setShowIssueCertModal] = useState(false);
  const [certStudentName, setCertStudentName] = useState('Temitope Samuel Adeleke');
  const [certProgrammeTitle, setCertProgrammeTitle] = useState('Diploma in Voice and Vocal Performance');
  const [certClassification, setCertClassification] = useState<'Distinction' | 'Merit' | 'Pass'>('Distinction');
  const [certNumberInput, setCertNumberInput] = useState(`FJM-DIP-2026-${Math.floor(1000 + Math.random() * 9000)}`);

  // ----------------------------------------------------
  // Settings State
  // ----------------------------------------------------
  const [collegeNameInput, setCollegeNameInput] = useState(settings.collegeName);
  const [contactEmailInput, setContactEmailInput] = useState(settings.contactEmail);
  const [contactPhoneInput, setContactPhoneInput] = useState(settings.contactPhone);
  const [campusAddressInput, setCampusAddressInput] = useState(settings.campusAddress);
  const [paystackTestMode, setPaystackTestMode] = useState(settings.paystackTestMode);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // ----------------------------------------------------
  // FACULTY MANAGEMENT STATE (Add, Edit, Delete)
  // ----------------------------------------------------
  const [facultySearch, setFacultySearch] = useState('');
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);

  const [facName, setFacName] = useState('');
  const [facTitle, setFacTitle] = useState('');
  const [facRole, setFacRole] = useState<FacultyMember['role']>('Director of Vocal Studies');
  const [facInstruments, setFacInstruments] = useState('');
  const [facEducation, setFacEducation] = useState('');
  const [facBio, setFacBio] = useState('');
  const [facTeachingPhilosophy, setFacTeachingPhilosophy] = useState('');
  const [facImage, setFacImage] = useState(PRESET_FACULTY_PHOTOS[0].url);
  const [facAssignedCourses, setFacAssignedCourses] = useState('');

  const openAddFacultyModal = () => {
    setEditingFaculty(null);
    setFacName('');
    setFacTitle('Senior Lecturer & Performance Specialist');
    setFacRole('Director of Vocal Studies');
    setFacInstruments('Piano, Voice, Music Theory');
    setFacEducation('MMus in Music Performance, Royal Academy of Music');
    setFacBio('Renowned educator dedicated to cultivating disciplined technical mastery, communicative vocal timbre, and authentic artistic expression.');
    setFacTeachingPhilosophy('Practice with purpose and perform with freedom.');
    setFacImage(PRESET_FACULTY_PHOTOS[0].url);
    setFacAssignedCourses('VOC-101, KEY-101');
    setShowFacultyModal(true);
  };

  const openEditFacultyModal = (member: FacultyMember) => {
    setEditingFaculty(member);
    setFacName(member.name);
    setFacTitle(member.title);
    setFacRole(member.role);
    setFacInstruments(member.instruments.join(', '));
    setFacEducation(member.education);
    setFacBio(member.bio);
    setFacTeachingPhilosophy(member.teachingPhilosophy);
    setFacImage(member.image);
    setFacAssignedCourses(member.assignedCourses.join(', '));
    setShowFacultyModal(true);
  };

  const handleSaveFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    const instrumentsArray = facInstruments
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const coursesArray = facAssignedCourses
      .split(',')
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);

    if (editingFaculty) {
      const updated: FacultyMember = {
        ...editingFaculty,
        name: facName.trim(),
        title: facTitle.trim(),
        role: facRole,
        instruments: instrumentsArray.length ? instrumentsArray : ['Piano'],
        education: facEducation.trim(),
        bio: facBio.trim(),
        teachingPhilosophy: facTeachingPhilosophy.trim(),
        image: facImage.trim() || PRESET_FACULTY_PHOTOS[0].url,
        assignedCourses: coursesArray.length ? coursesArray : ['VOC-101'],
      };
      updateFaculty(updated);
      showToast(`Faculty details for "${facName}" updated successfully!`);
    } else {
      const newMember: FacultyMember = {
        id: `fac-${Date.now()}`,
        name: facName.trim(),
        title: facTitle.trim(),
        role: facRole,
        instruments: instrumentsArray.length ? instrumentsArray : ['Piano'],
        education: facEducation.trim(),
        bio: facBio.trim(),
        teachingPhilosophy: facTeachingPhilosophy.trim(),
        image: facImage.trim() || PRESET_FACULTY_PHOTOS[0].url,
        assignedCourses: coursesArray.length ? coursesArray : ['VOC-101'],
      };
      addFaculty(newMember);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      showToast(`Faculty member "${facName}" added to the conservatoire!`);
    }
    setShowFacultyModal(false);
  };

  const handleDeleteFaculty = (member: FacultyMember) => {
    if (confirm(`Are you sure you want to delete "${member.name}" from the faculty roster?`)) {
      deleteFaculty(member.id);
      showToast(`Faculty member "${member.name}" deleted.`);
    }
  };

  // ----------------------------------------------------
  // PROGRAMMES & FEES MANAGEMENT STATE (Add, Edit, Delete, Quick Fee)
  // ----------------------------------------------------
  const [programmeSearch, setProgrammeSearch] = useState('');
  const [programmeCategoryFilter, setProgrammeCategoryFilter] = useState<string>('all');
  const [showProgrammeModal, setShowProgrammeModal] = useState(false);
  const [editingProgramme, setEditingProgramme] = useState<Programme | null>(null);

  // Quick Fee modal state
  const [showQuickFeeModal, setShowQuickFeeModal] = useState(false);
  const [quickFeeProg, setQuickFeeProg] = useState<Programme | null>(null);
  const [quickTuitionInput, setQuickTuitionInput] = useState<number>(0);
  const [quickAppInput, setQuickAppInput] = useState<number>(0);

  // Full Programme Form State
  const [progTitle, setProgTitle] = useState('');
  const [progSlug, setProgSlug] = useState('');
  const [progCategory, setProgCategory] = useState<ProgrammeCategory>('diploma');
  const [progDiscipline, setProgDiscipline] = useState('Vocal Studies');
  const [progDuration, setProgDuration] = useState('1 Year (2 Semesters)');
  const [progDeliveryFormat, setProgDeliveryFormat] = useState<Programme['deliveryFormat']>(
    'Hybrid (Campus Studio & Online)'
  );
  const [progTuitionFee, setProgTuitionFee] = useState<number>(320000);
  const [progApplicationFee, setProgApplicationFee] = useState<number>(15000);
  const [progCurrency, setProgCurrency] = useState('NGN');
  const [progRequiresAudition, setProgRequiresAudition] = useState(true);
  const [progAuditionRequirements, setProgAuditionRequirements] = useState('');
  const [progFeatured, setProgFeatured] = useState(false);
  const [progShortDesc, setProgShortDesc] = useState('');
  const [progDesc, setProgDesc] = useState('');
  const [progLearningObjectives, setProgLearningObjectives] = useState('');
  const [progEntryRequirements, setProgEntryRequirements] = useState('');
  const [progPracticalAssessment, setProgPracticalAssessment] = useState('');
  const [progTheoreticalAssessment, setProgTheoreticalAssessment] = useState('');

  const openAddProgrammeModal = () => {
    setEditingProgramme(null);
    setProgTitle('');
    setProgSlug('');
    setProgCategory('diploma');
    setProgDiscipline('Vocal Studies');
    setProgDuration('1 Year (2 Semesters + Recital)');
    setProgDeliveryFormat('Hybrid (Campus Studio & Online)');
    setProgTuitionFee(320000);
    setProgApplicationFee(15000);
    setProgCurrency('NGN');
    setProgRequiresAudition(true);
    setProgAuditionRequirements('Perform two contrasting pieces and complete interval pitch matching.');
    setProgFeatured(true);
    setProgShortDesc('Rigorous practical training combining theory, repertoire, ensemble rehearsals, and jury recitals.');
    setProgDesc('Comprehensive program taking learners from technique fundamentals to live concert delivery with industry-standard faculties.');
    setProgLearningObjectives(
      'Master instrument ergonomics and tone production.\nDevelop sight-reading and ear-training accuracy.\nLead ensemble rehearsals and collaborate live.'
    );
    setProgEntryRequirements(
      'Demonstrated musical aptitude or instrument experience.\nPass practical audition panel.'
    );
    setProgPracticalAssessment('Weekly practice logs and final 40-minute jury recital.');
    setProgTheoreticalAssessment('Written harmony, aural identification, and repertoire analysis.');
    setShowProgrammeModal(true);
  };

  const openEditProgrammeModal = (p: Programme) => {
    setEditingProgramme(p);
    setProgTitle(p.title);
    setProgSlug(p.slug);
    setProgCategory(p.category);
    setProgDiscipline(p.discipline);
    setProgDuration(p.duration);
    setProgDeliveryFormat(p.deliveryFormat);
    setProgTuitionFee(p.tuitionFee);
    setProgApplicationFee(p.applicationFee);
    setProgCurrency(p.currency);
    setProgRequiresAudition(p.requiresAudition);
    setProgAuditionRequirements(p.auditionRequirements || '');
    setProgFeatured(Boolean(p.featured));
    setProgShortDesc(p.shortDescription);
    setProgDesc(p.description);
    setProgLearningObjectives(p.learningObjectives ? p.learningObjectives.join('\n') : '');
    setProgEntryRequirements(p.entryRequirements ? p.entryRequirements.join('\n') : '');
    setProgPracticalAssessment(p.practicalAssessment);
    setProgTheoreticalAssessment(p.theoreticalAssessment);
    setShowProgrammeModal(true);
  };

  const handleSaveProgramme = (e: React.FormEvent) => {
    e.preventDefault();
    const slugComputed =
      progSlug.trim() ||
      progTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const objectivesArray = progLearningObjectives
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const entryReqsArray = progEntryRequirements
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProgramme) {
      const updated: Programme = {
        ...editingProgramme,
        title: progTitle.trim(),
        slug: slugComputed,
        category: progCategory,
        discipline: progDiscipline.trim(),
        duration: progDuration.trim(),
        deliveryFormat: progDeliveryFormat,
        tuitionFee: Number(progTuitionFee) || 0,
        applicationFee: Number(progApplicationFee) || 0,
        currency: progCurrency,
        requiresAudition: progRequiresAudition,
        auditionRequirements: progRequiresAudition ? progAuditionRequirements.trim() : undefined,
        featured: progFeatured,
        shortDescription: progShortDesc.trim(),
        description: progDesc.trim(),
        learningObjectives: objectivesArray.length ? objectivesArray : editingProgramme.learningObjectives,
        entryRequirements: entryReqsArray.length ? entryReqsArray : editingProgramme.entryRequirements,
        practicalAssessment: progPracticalAssessment.trim() || editingProgramme.practicalAssessment,
        theoreticalAssessment: progTheoreticalAssessment.trim() || editingProgramme.theoreticalAssessment,
      };
      updateProgramme(updated);
      showToast(`Programme "${progTitle}" and fees updated successfully!`);
    } else {
      const newProgramme: Programme = {
        id: `prog-${Date.now()}`,
        title: progTitle.trim(),
        slug: slugComputed,
        category: progCategory,
        discipline: progDiscipline.trim(),
        duration: progDuration.trim(),
        deliveryFormat: progDeliveryFormat,
        tuitionFee: Number(progTuitionFee) || 0,
        applicationFee: Number(progApplicationFee) || 0,
        currency: progCurrency,
        requiresAudition: progRequiresAudition,
        auditionRequirements: progRequiresAudition ? progAuditionRequirements.trim() : undefined,
        featured: progFeatured,
        shortDescription: progShortDesc.trim(),
        description: progDesc.trim(),
        learningObjectives: objectivesArray.length
          ? objectivesArray
          : ['Develop practical performance excellence.'],
        entryRequirements: entryReqsArray.length ? entryReqsArray : ['Open admissions.'],
        practicalAssessment: progPracticalAssessment.trim() || 'Practical jury recital.',
        theoreticalAssessment: progTheoreticalAssessment.trim() || 'Written music theory exam.',
        curriculum: [
          {
            id: `mod-${Date.now()}-1`,
            title: 'Module 1: Foundations & Instrumental Technique',
            durationWeeks: 6,
            description: 'Core rudiments, posture, scales, and tone production.',
            topics: ['Technique', 'Theory foundations', 'Daily practice discipline'],
          },
        ],
      };
      addProgramme(newProgramme);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      showToast(`New programme "${progTitle}" created with fees!`);
    }
    setShowProgrammeModal(false);
  };

  const openQuickFeeEditor = (p: Programme) => {
    setQuickFeeProg(p);
    setQuickTuitionInput(p.tuitionFee);
    setQuickAppInput(p.applicationFee);
    setShowQuickFeeModal(true);
  };

  const handleSaveQuickFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickFeeProg) return;
    const updated: Programme = {
      ...quickFeeProg,
      tuitionFee: Number(quickTuitionInput) || 0,
      applicationFee: Number(quickAppInput) || 0,
    };
    updateProgramme(updated);
    setShowQuickFeeModal(false);
    showToast(`Fees updated for "${quickFeeProg.title}": Tuition NGN ${quickTuitionInput.toLocaleString()} | App Fee NGN ${quickAppInput.toLocaleString()}`);
  };

  const handleDeleteProgramme = (p: Programme) => {
    if (programmes.length <= 1) {
      alert('The college requires at least one active programme in the catalogue.');
      return;
    }
    if (
      confirm(
        `Are you sure you want to permanently delete "${p.title}"? This will remove its fee schedule and curriculum.`
      )
    ) {
      deleteProgramme(p.id);
      showToast(`Programme "${p.title}" has been removed from catalogue.`);
    }
  };

  // ----------------------------------------------------
  // SUPABASE SQL SCRIPT MODAL
  // ----------------------------------------------------
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const SUPABASE_SQL_SNIPPET = `-- FJMUSIC COLLEGE: Run this directly in Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/wfgnkatcsdaffgjrymbr/sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- PROGRAMMES TABLE
CREATE TABLE IF NOT EXISTS public.programmes (
  id TEXT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,
  discipline VARCHAR(100) NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  learning_objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  duration VARCHAR(100) NOT NULL,
  delivery_format VARCHAR(100) NOT NULL,
  entry_requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
  practical_assessment TEXT NOT NULL,
  theoretical_assessment TEXT NOT NULL,
  tuition_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  application_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  currency VARCHAR(10) NOT NULL DEFAULT 'NGN',
  requires_audition BOOLEAN NOT NULL DEFAULT FALSE,
  audition_requirements TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FACULTY TABLE
CREATE TABLE IF NOT EXISTS public.faculty (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  instruments JSONB NOT NULL DEFAULT '[]'::jsonb,
  education TEXT NOT NULL,
  bio TEXT NOT NULL,
  teaching_philosophy TEXT NOT NULL,
  image_url TEXT NOT NULL,
  assigned_courses JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ROW LEVEL SECURITY
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read programmes" ON public.programmes FOR SELECT USING (true);
CREATE POLICY "Public read faculty" ON public.faculty FOR SELECT USING (true);

-- Allow Anon management for test applet
CREATE POLICY "Anon manage programmes" ON public.programmes FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Anon manage faculty" ON public.faculty FOR ALL TO anon USING (true) WITH CHECK (true);
`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SNIPPET);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // ----------------------------------------------------
  // Actions: Application Review
  // ----------------------------------------------------
  const handleUpdateAppStatus = (status: Application['status']) => {
    if (!selectedApp) return;
    updateApplicationStatus(
      selectedApp.id,
      status,
      staffNoteInput || selectedApp.staffNotes,
      status === 'audition_scheduled' ? auditionDateInput : undefined
    );
    showToast(`Application ${selectedApp.referenceNumber} status changed to ${status}`);
    setSelectedApp(null);
    setStaffNoteInput('');
  };

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    issueCertificate({
      certificateNumber: certNumberInput,
      studentId: `stu-${Date.now()}`,
      studentName: certStudentName,
      programmeTitle: certProgrammeTitle,
      qualificationType: certProgrammeTitle.includes('Diploma')
        ? 'Diploma'
        : 'Certificate of Musicianship',
      issueDate: new Date().toISOString().slice(0, 10),
      completionDate: new Date().toISOString().slice(0, 10),
      gradeClassification: certClassification,
      signatoryName: 'Dean Alexander Cole',
      signatoryTitle: 'Chairman of Academic Board & Conservatoire Registry',
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });

    setShowIssueCertModal(false);
    showToast(`Certificate ${certNumberInput} successfully issued!`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      collegeName: collegeNameInput,
      contactEmail: contactEmailInput,
      contactPhone: contactPhoneInput,
      campusAddress: campusAddressInput,
      paystackTestMode,
    });
    setSettingsSaved(true);
    showToast('College settings saved.');
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);

  // Filtered lists
  const filteredFaculty = faculty.filter((f) => {
    const q = facultySearch.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.role.toLowerCase().includes(q) ||
      f.title.toLowerCase().includes(q) ||
      f.instruments.some((i) => i.toLowerCase().includes(q))
    );
  });

  const filteredProgrammes = programmes.filter((p) => {
    const matchCat =
      programmeCategoryFilter === 'all' || p.category === programmeCategoryFilter;
    const q = programmeSearch.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(q) ||
      p.discipline.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-lime-500/40 flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-slate-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-lime-500 flex items-center justify-center text-slate-950 font-heading font-black text-2xl shadow-inner">
              A
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-lime-400 uppercase tracking-wider">
                <span>ADMINISTRATIVE REGISTRY</span>
                <span aria-hidden="true">·</span>
                <span>CENTRAL CONSERVATOIRE CONSOLE</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                FJMUSIC College Administration
              </h1>
              <div className="text-xs text-slate-300 mt-0.5">
                Logged in as Dean Alexander Cole · Academic Board, Faculty & Fee Configuration
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowSqlModal(true)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-lime-400 hover:text-lime-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Supabase SQL Script</span>
            </button>
            <button
              onClick={() => {
                if (confirm('Reset demo state back to pristine factory values?')) {
                  resetAllData();
                  showToast('Data reset to original factory state.');
                }
              }}
              className="px-3.5 py-2 bg-slate-900 hover:bg-rose-950/60 border border-slate-800 text-slate-300 hover:text-rose-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Tabs + Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-sm">
              {[
                { id: 'overview', label: 'College Overview', icon: LayoutDashboard },
                { id: 'programmes', label: 'Programmes & Fees', icon: BookOpen, count: programmes.length },
                { id: 'faculty', label: 'Faculty & Lecturers', icon: Users, count: faculty.length },
                { id: 'applications', label: 'Admissions Desk', icon: FileText, count: applications.length },
                { id: 'payments', label: 'Bursary & Payments', icon: CreditCard },
                { id: 'certificates', label: 'Issued Certificates', icon: Award, count: certificates.length },
                { id: 'settings', label: 'College Settings', icon: Settings },
                { id: 'audit', label: 'Security & Audit Logs', icon: ShieldAlert },
              ].map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-950 text-white font-bold shadow-sm'
                        : 'text-slate-600 hover:bg-stone-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className={`w-4 h-4 ${isActive ? 'text-lime-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-slate-800 text-lime-400' : 'bg-stone-100 text-slate-500'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Live Link Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="font-bold flex items-center gap-2 text-lime-400">
                <Database className="w-3.5 h-3.5" />
                <span>Supabase Live Sync</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Connected to <span className="font-mono text-white">wfgnkatcsdaffgjrymbr</span>. Any additions or updates sync directly to your tables.
              </p>
              <button
                onClick={() => setShowSqlModal(true)}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-[11px] font-semibold text-center block cursor-pointer transition-colors"
              >
                View Database Schema SQL
              </button>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-6">
            {/* ==================================================== */}
            {/* TAB: OVERVIEW */}
            {/* ==================================================== */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Offered Programmes</span>
                    <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                      {programmes.length}
                    </div>
                    <button
                      onClick={() => setActiveTab('programmes')}
                      className="text-[10px] text-lime-700 font-semibold mt-1 block hover:underline cursor-pointer"
                    >
                      Manage Programmes & Fees →
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Distinguished Faculty</span>
                    <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                      {faculty.length}
                    </div>
                    <button
                      onClick={() => setActiveTab('faculty')}
                      className="text-[10px] text-lime-700 font-semibold mt-1 block hover:underline cursor-pointer"
                    >
                      Manage Lecturers & Bios →
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Applications Logged</span>
                    <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                      {applications.length}
                    </div>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-[10px] text-slate-500 mt-1 block hover:underline cursor-pointer"
                    >
                      Review Candidates →
                    </button>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Verified Payments</span>
                    <div className="text-xl font-black font-mono text-slate-900 mt-1">
                      NGN {totalRevenue.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                      Paystack Reconciled
                    </span>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm text-slate-900">Programmes & Tuition Fees</h3>
                        <p className="text-xs text-slate-500">Configure degrees, diplomas, and fee schedules.</p>
                      </div>
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={openAddProgrammeModal}
                        className="px-3.5 py-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Programme</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('programmes')}
                        className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
                      >
                        View Catalogue ({programmes.length})
                      </button>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm text-slate-900">Faculty & Mentors</h3>
                        <p className="text-xs text-slate-500">Add instructors, update bios, and assign courses.</p>
                      </div>
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={openAddFacultyModal}
                        className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Faculty Member</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('faculty')}
                        className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
                      >
                        View Faculty ({faculty.length})
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Admission Queue Table */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-heading text-base font-bold text-slate-900">
                      Admissions Review Queue
                    </h2>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      View All Applications →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-stone-100 text-slate-400 font-mono text-[10px] uppercase">
                          <th className="py-2.5">Reference</th>
                          <th className="py-2.5">Candidate</th>
                          <th className="py-2.5">Programme</th>
                          <th className="py-2.5">Status</th>
                          <th className="py-2.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {applications.map((app) => (
                          <tr key={app.id} className="hover:bg-stone-50">
                            <td className="py-3 font-mono font-bold text-slate-800">{app.referenceNumber}</td>
                            <td className="py-3">{app.applicantName}</td>
                            <td className="py-3 text-slate-600 truncate max-w-xs">{app.programmeTitle}</td>
                            <td className="py-3">
                              <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-stone-100 text-slate-700">
                                {app.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedApp(app);
                                  setActiveTab('applications');
                                }}
                                className="px-3 py-1 bg-slate-900 text-white rounded-lg font-semibold text-xs cursor-pointer"
                              >
                                Review
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: PROGRAMMES & FEES (ADD, EDIT, DELETE) */}
            {/* ==================================================== */}
            {activeTab === 'programmes' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold text-lime-700 uppercase tracking-wider mb-1">
                      Academic Curriculum & Bursary Registry
                    </div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                      Academic Programmes & Fee Schedules
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Add, edit, or delete programmes, calibrate tuition and application fees, and configure audition prerequisites.
                    </p>
                  </div>
                  <button
                    onClick={openAddProgrammeModal}
                    className="px-4 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm shrink-0 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Programme</span>
                  </button>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-1 border-b border-stone-100">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search programme, discipline..."
                      value={programmeSearch}
                      onChange={(e) => setProgrammeSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    {[
                      { id: 'all', label: 'All Offerings' },
                      { id: 'diploma', label: 'Diploma' },
                      { id: 'certificate', label: 'Certificate' },
                      { id: 'practical', label: 'Practical Training' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setProgrammeCategoryFilter(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                          programmeCategoryFilter === cat.id
                            ? 'bg-slate-950 text-white font-bold'
                            : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Programmes Grid */}
                <div className="space-y-4">
                  {filteredProgrammes.length === 0 ? (
                    <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-xs text-slate-500">
                      No programmes match the filter criteria.
                    </div>
                  ) : (
                    filteredProgrammes.map((p) => (
                      <div
                        key={p.id}
                        className="p-5 sm:p-6 rounded-2xl border border-stone-200 bg-white hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 text-xs shadow-xs"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-lime-100 text-lime-900">
                              {p.category}
                            </span>
                            <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-stone-100 text-slate-600">
                              {p.discipline}
                            </span>
                            <span className="text-[11px] text-slate-400">· {p.duration}</span>
                            {p.featured && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Featured
                              </span>
                            )}
                            {p.requiresAudition && (
                              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                                Audition Required
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-base text-slate-900">
                            {p.title}
                          </h3>
                          <p className="text-slate-600 line-clamp-2 leading-relaxed">
                            {p.shortDescription}
                          </p>

                          <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3 pt-1">
                            <span>Format: <strong>{p.deliveryFormat}</strong></span>
                            <span>·</span>
                            <span>Modules: <strong>{p.curriculum?.length || 1} Sections</strong></span>
                          </div>
                        </div>

                        {/* Fee highlight box & Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-right w-full sm:w-auto">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Tuition Fee
                            </div>
                            <div className="text-base font-extrabold font-mono text-slate-950">
                              {p.currency} {p.tuitionFee.toLocaleString()}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                              App Fee: <strong>{p.currency} {p.applicationFee.toLocaleString()}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <button
                              onClick={() => openQuickFeeEditor(p)}
                              title="Quickly adjust tuition or application fee"
                              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                              <span>Adjust Fee</span>
                            </button>

                            <button
                              onClick={() => openEditProgrammeModal(p)}
                              title="Edit full curriculum, description, and requirements"
                              className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProgramme(p)}
                              title="Delete programme from catalogue"
                              className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: FACULTY & LECTURERS (ADD, EDIT, DELETE) */}
            {/* ==================================================== */}
            {activeTab === 'faculty' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-bold text-lime-700 uppercase tracking-wider mb-1">
                      Academic Faculty & Artist-in-Residence Roster
                    </div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
                      Distinguished Faculty Registry
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Add new lecturers, update biographies, credentials, assigned courses, and manage the conservatory teaching team.
                    </p>
                  </div>
                  <button
                    onClick={openAddFacultyModal}
                    className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm shrink-0 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-lime-400" />
                    <span>Add New Faculty</span>
                  </button>
                </div>

                {/* Faculty Search */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search faculty by name, role, instrument..."
                    value={facultySearch}
                    onChange={(e) => setFacultySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-slate-800"
                  />
                </div>

                {/* Faculty Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredFaculty.length === 0 ? (
                    <div className="col-span-full p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-xs text-slate-500">
                      No faculty members found matching "{facultySearch}".
                    </div>
                  ) : (
                    filteredFaculty.map((member) => (
                      <div
                        key={member.id}
                        className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between gap-4 text-xs shadow-xs"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start gap-4">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shrink-0 bg-slate-900"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="font-mono text-[10px] uppercase font-bold text-lime-800 block">
                                {member.role}
                              </span>
                              <h3 className="font-heading font-bold text-base text-slate-900 truncate">
                                {member.name}
                              </h3>
                              <p className="text-[11px] text-slate-500 truncate">{member.title}</p>
                              <div className="text-[10px] text-slate-600 font-medium truncate mt-0.5">
                                {member.education}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <div className="text-slate-600 line-clamp-3 leading-relaxed">
                              {member.bio}
                            </div>

                            <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 text-[11px] text-slate-700 italic">
                              “{member.teachingPhilosophy}”
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] font-bold text-slate-500">Specialisation:</span>
                              {member.instruments.map((inst, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-stone-100 text-slate-700 rounded-md text-[10px] font-medium"
                                >
                                  {inst}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 pt-1 text-[11px]">
                              <span className="text-slate-400 font-mono text-[10px] uppercase">Courses:</span>
                              <span className="font-mono font-bold text-slate-800">
                                {member.assignedCourses.join(', ')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                          <button
                            onClick={() => openEditFacultyModal(member)}
                            className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit Profile</span>
                          </button>
                          <button
                            onClick={() => handleDeleteFaculty(member)}
                            className="p-1.5 text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                            title="Remove faculty member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: APPLICATIONS */}
            {/* ==================================================== */}
            {activeTab === 'applications' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Official Admissions Desk
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review submissions, schedule live audition dates, request additional information, and record final board decisions.
                  </p>
                </div>

                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 rounded-2xl border border-stone-200 space-y-4 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 font-mono">
                        <div>
                          <span className="font-bold text-sm text-slate-900">{app.referenceNumber}</span>
                          <span className="text-slate-400 ml-2">({app.submittedAt})</span>
                        </div>
                        <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full font-bold uppercase">
                          Status: {app.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <strong className="text-slate-700 block">Candidate:</strong>
                          <span>{app.applicantName} ({app.applicantEmail})</span>
                          <span className="block text-slate-500">Tel: {app.applicantPhone}</span>
                        </div>
                        <div>
                          <strong className="text-slate-700 block">Programme:</strong>
                          <span>{app.programmeTitle} ({app.category.toUpperCase()})</span>
                          <span className="block text-slate-500">
                            Fee Status: {app.applicationFeePaid ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <strong className="text-slate-700 block">Musical Background & Experience:</strong>
                        <p className="text-slate-600 mt-0.5">{app.musicalBackground}</p>
                      </div>

                      {app.auditionVideoUrl && (
                        <div>
                          <strong className="text-slate-700 block">Audition Recording Link:</strong>
                          <a
                            href={app.auditionVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lime-700 font-mono font-bold hover:underline"
                          >
                            {app.auditionVideoUrl} ↗
                          </a>
                        </div>
                      )}

                      {app.staffNotes && (
                        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                          <strong className="text-slate-800">Faculty Notes:</strong> {app.staffNotes}
                        </div>
                      )}

                      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setStaffNoteInput(app.staffNotes || '');
                          }}
                          className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer"
                        >
                          Take Action (Approve / Schedule / Reject)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: PAYMENTS */}
            {/* ==================================================== */}
            {activeTab === 'payments' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-slate-900">
                      Bursary Payment Reconciliation
                    </h2>
                    <p className="text-xs text-slate-500">
                      Verified Paystack records and direct bank transfer allocations.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Total Confirmed</span>
                    <div className="text-lg font-black font-mono text-slate-900">
                      NGN {totalRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {payments.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">{p.purpose} — {p.userName}</div>
                        <div className="text-slate-500 font-mono text-[11px]">
                          Ref: {p.reference} · Receipt: {p.receiptNumber}
                        </div>
                        <div className="text-slate-400 text-[10px]">{p.paidAt} via {p.channel}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold font-mono text-slate-900">
                          {p.currency} {p.amount.toLocaleString()}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: CERTIFICATES */}
            {/* ==================================================== */}
            {activeTab === 'certificates' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-slate-900">
                      Certificate Conformance & Issuance Registry
                    </h2>
                    <p className="text-xs text-slate-500">
                      Generate official verifiable diplomas for graduating students.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowIssueCertModal(true)}
                    className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Issue New Certificate</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {certificates.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="font-mono text-[10px] font-bold text-lime-700">
                          {c.qualificationType} · {c.gradeClassification}
                        </div>
                        <h3 className="font-heading font-bold text-sm text-slate-900">
                          {c.studentName} — {c.programmeTitle}
                        </h3>
                        <div className="text-slate-500 font-mono text-[11px]">
                          Certificate Number: <strong className="text-slate-800">{c.certificateNumber}</strong>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/certificates/verify/${c.certificateNumber}`)}
                        className="px-4 py-2 bg-slate-950 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Verification</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: SETTINGS */}
            {/* ==================================================== */}
            {activeTab === 'settings' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    College Settings & Gateway Configuration
                  </h2>
                  <p className="text-xs text-slate-500">
                    Configure institutional details, contact information, and Paystack test mode settings.
                  </p>
                </div>

                {settingsSaved && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Settings successfully updated in the central registry.</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official College Name</label>
                    <input
                      type="text"
                      value={collegeNameInput}
                      onChange={(e) => setCollegeNameInput(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={contactEmailInput}
                        onChange={(e) => setContactEmailInput(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Contact Telephone</label>
                      <input
                        type="text"
                        value={contactPhoneInput}
                        onChange={(e) => setContactPhoneInput(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Performance Campus Address</label>
                    <input
                      type="text"
                      value={campusAddressInput}
                      onChange={(e) => setCampusAddressInput(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300"
                    />
                  </div>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                    <div className="font-bold text-slate-900">Paystack Gateway Configuration:</div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paystackTestMode}
                        onChange={(e) => setPaystackTestMode(e.target.checked)}
                        className="w-4 h-4 accent-slate-900"
                      />
                      <span>Enable Paystack Test Mode (Safe test transactions without charging real cards)</span>
                    </label>
                  </div>

                  {/* Supabase Live Integration Status Card */}
                  <div className="p-5 bg-slate-950 text-white rounded-2xl border border-slate-900 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <span className="font-heading font-bold text-sm text-white">
                          Supabase Database & Auth Integration
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-lime-400 font-bold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                        {supabaseStatus.connected ? 'CONNECTED' : 'STANDBY'}
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-[11px] text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div>
                        Project URL: <span className="text-lime-300">https://wfgnkatcsdaffgjrymbr.supabase.co</span>
                      </div>
                      <div>
                        Anon Key: <span className="text-slate-400">eyJhbGciOiJIUzI1Ni... (Active)</span>
                      </div>
                      <div>
                        Health Check: <span className="text-white">{supabaseStatus.message}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setShowSqlModal(true)}
                        className="text-xs text-lime-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>View / Copy Supabase SQL Script</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => checkSupabase()}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Re-test Connection
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Save College Settings
                  </button>
                </form>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: AUDIT LOGS */}
            {/* ==================================================== */}
            {activeTab === 'audit' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-slate-900">
                    Administrative Audit Trail
                  </h2>
                  <p className="text-xs text-slate-500">
                    Immutable security record of admission approvals, faculty updates, programme and fee adjustments, and financial events.
                  </p>
                </div>

                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">
                          [{log.action}] · {log.performedBy} ({log.userRole.toUpperCase()})
                        </div>
                        <div className="text-slate-600 text-[11px]">{log.details}</div>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT FACULTY */}
      {/* ==================================================== */}
      {showFacultyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-lime-700">
                  {editingFaculty ? 'UPDATE RECORD' : 'NEW APPOINTMENT'}
                </span>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  {editingFaculty ? `Edit Faculty: ${editingFaculty.name}` : 'Add New Faculty Member'}
                </h3>
              </div>
              <button
                onClick={() => setShowFacultyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaculty} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name & Honorific *</label>
                  <input
                    type="text"
                    required
                    value={facName}
                    onChange={(e) => setFacName(e.target.value)}
                    placeholder="e.g. Dr. Clara Adeleke"
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Role *</label>
                  <select
                    value={facRole}
                    onChange={(e) => setFacRole(e.target.value as FacultyMember['role'])}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="Director of Vocal Studies">Director of Vocal Studies</option>
                    <option value="Head of Keyboard Studies">Head of Keyboard Studies</option>
                    <option value="Head of Music Production">Head of Music Production</option>
                    <option value="Lecturer in Contemporary Worship">Lecturer in Contemporary Worship</option>
                    <option value="Dean of Performance">Dean of Performance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Academic Title *</label>
                <input
                  type="text"
                  required
                  value={facTitle}
                  onChange={(e) => setFacTitle(e.target.value)}
                  placeholder="e.g. Director of Vocal Studies & Choral Pedagogy"
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Education & Qualifications *</label>
                  <input
                    type="text"
                    required
                    value={facEducation}
                    onChange={(e) => setFacEducation(e.target.value)}
                    placeholder="e.g. PhD in Vocal Performance (Royal Academy of Music)"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Instruments / Specialisms (comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={facInstruments}
                    onChange={(e) => setFacInstruments(e.target.value)}
                    placeholder="e.g. Voice, Piano, Choral Conducting"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={facImage}
                  onChange={(e) => setFacImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-mono text-[11px]"
                />
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-400 font-semibold">Quick Photo Presets:</span>
                  {PRESET_FACULTY_PHOTOS.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setFacImage(preset.url)}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer border ${
                        facImage === preset.url
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-stone-100 text-slate-600 border-stone-200 hover:bg-stone-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Biography & Credentials *</label>
                <textarea
                  rows={3}
                  required
                  value={facBio}
                  onChange={(e) => setFacBio(e.target.value)}
                  placeholder="Summary of experience, concert hall performances, discography, and academic teaching..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teaching Philosophy (Quote)</label>
                  <textarea
                    rows={2}
                    value={facTeachingPhilosophy}
                    onChange={(e) => setFacTeachingPhilosophy(e.target.value)}
                    placeholder="e.g. Singing is not shouting. True vocal power emerges from..."
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Course Codes (comma-separated)</label>
                  <input
                    type="text"
                    value={facAssignedCourses}
                    onChange={(e) => setFacAssignedCourses(e.target.value)}
                    placeholder="e.g. VOC-101, VOC-201, CHO-101"
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Links instructor to courses across the LMS and catalog.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowFacultyModal(false)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer shadow-md"
                >
                  {editingFaculty ? 'Save Faculty Changes' : 'Confirm Faculty Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT PROGRAMME & FEES */}
      {/* ==================================================== */}
      {showProgrammeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-lime-700">
                  {editingProgramme ? 'CURRICULUM & FEE UPDATE' : 'NEW ACADEMIC PROGRAMME'}
                </span>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  {editingProgramme ? `Edit Programme: ${editingProgramme.title}` : 'Add New Academic Programme'}
                </h3>
              </div>
              <button
                onClick={() => setShowProgrammeModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgramme} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Programme Title *</label>
                  <input
                    type="text"
                    required
                    value={progTitle}
                    onChange={(e) => setProgTitle(e.target.value)}
                    placeholder="e.g. Diploma in Guitar Performance & Jazz Improvisation"
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={progCategory}
                    onChange={(e) => setProgCategory(e.target.value as ProgrammeCategory)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="diploma">Diploma (Full Year)</option>
                    <option value="certificate">Certificate (3 Months)</option>
                    <option value="practical">Practical Training (Intensive)</option>
                  </select>
                </div>
              </div>

              {/* FEEPAY HIGHLIGHT ROW */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
                <div className="font-bold text-amber-950 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-700" />
                  <span>Tuition & Bursary Fee Schedule</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Tuition Fee (in NGN) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={1000}
                      value={progTuitionFee}
                      onChange={(e) => setProgTuitionFee(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Application Fee (in NGN) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={500}
                      value={progApplicationFee}
                      onChange={(e) => setProgApplicationFee(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Currency Code</label>
                    <input
                      type="text"
                      value={progCurrency}
                      onChange={(e) => setProgCurrency(e.target.value.toUpperCase())}
                      className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discipline *</label>
                  <input
                    type="text"
                    required
                    value={progDiscipline}
                    onChange={(e) => setProgDiscipline(e.target.value)}
                    placeholder="e.g. Guitar Studies"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Programme Duration *</label>
                  <input
                    type="text"
                    required
                    value={progDuration}
                    onChange={(e) => setProgDuration(e.target.value)}
                    placeholder="e.g. 1 Year (2 Semesters)"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Format *</label>
                  <select
                    value={progDeliveryFormat}
                    onChange={(e) => setProgDeliveryFormat(e.target.value as Programme['deliveryFormat'])}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  >
                    <option value="Hybrid (Campus Studio & Online)">Hybrid (Campus Studio & Online)</option>
                    <option value="On-Campus Intensive">On-Campus Intensive</option>
                    <option value="Studio Masterclass">Studio Masterclass</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description (for cards) *</label>
                <input
                  type="text"
                  required
                  value={progShortDesc}
                  onChange={(e) => setProgShortDesc(e.target.value)}
                  placeholder="Concise 1-2 sentence overview of the programme..."
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Academic Description *</label>
                <textarea
                  rows={3}
                  required
                  value={progDesc}
                  onChange={(e) => setProgDesc(e.target.value)}
                  placeholder="Detailed curriculum overview, conservatory goals, and performance training methods..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Learning Objectives (one per line)</label>
                  <textarea
                    rows={3}
                    value={progLearningObjectives}
                    onChange={(e) => setProgLearningObjectives(e.target.value)}
                    placeholder="Master major/minor scales&#10;Develop sight-reading agility&#10;Lead stage rhythm sections"
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Entry Requirements (one per line)</label>
                  <textarea
                    rows={3}
                    value={progEntryRequirements}
                    onChange={(e) => setProgEntryRequirements(e.target.value)}
                    placeholder="High school completion or equivalent&#10;Passing grade on practical audition"
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Practical Assessment Details</label>
                  <input
                    type="text"
                    value={progPracticalAssessment}
                    onChange={(e) => setProgPracticalAssessment(e.target.value)}
                    placeholder="e.g. Weekly logs, mid-term jury, 45-min recital"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Theoretical Assessment Details</label>
                  <input
                    type="text"
                    value={progTheoreticalAssessment}
                    onChange={(e) => setProgTheoreticalAssessment(e.target.value)}
                    placeholder="e.g. Written harmony and aural analysis exam"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={progRequiresAudition}
                    onChange={(e) => setProgRequiresAudition(e.target.checked)}
                    className="w-4 h-4 accent-slate-950"
                  />
                  <span>Mandatory Audition Required</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={progFeatured}
                    onChange={(e) => setProgFeatured(e.target.checked)}
                    className="w-4 h-4 accent-slate-950"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              {progRequiresAudition && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Audition Requirements & Criteria</label>
                  <input
                    type="text"
                    value={progAuditionRequirements}
                    onChange={(e) => setProgAuditionRequirements(e.target.value)}
                    placeholder="e.g. Prepare 2 contrasting pieces (one structured/classical, one modern)"
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowProgrammeModal(false)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl cursor-pointer shadow-md"
                >
                  {editingProgramme ? 'Save Programme & Fees' : 'Create Academic Programme'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: QUICK FEE ADJUSTMENT */}
      {/* ==================================================== */}
      {showQuickFeeModal && quickFeeProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2 text-slate-900 font-heading font-bold text-base">
                <DollarSign className="w-5 h-5 text-lime-600" />
                <span>Adjust Programme Fees</span>
              </div>
              <button
                onClick={() => setShowQuickFeeModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="font-bold text-slate-900">{quickFeeProg.title}</div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                Category: {quickFeeProg.category.toUpperCase()} · Duration: {quickFeeProg.duration}
              </div>
            </div>

            <form onSubmit={handleSaveQuickFee} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tuition Fee ({quickFeeProg.currency})
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  step={1000}
                  value={quickTuitionInput}
                  onChange={(e) => setQuickTuitionInput(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold text-base text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Previously: {quickFeeProg.currency} {quickFeeProg.tuitionFee.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Application Fee ({quickFeeProg.currency})
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  step={500}
                  value={quickAppInput}
                  onChange={(e) => setQuickAppInput(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold text-base text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Previously: {quickFeeProg.currency} {quickFeeProg.applicationFee.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowQuickFeeModal(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Confirm Fee Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: SUPABASE SQL SCRIPT VIEWER */}
      {/* ==================================================== */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-950 text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-800 text-xs space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Supabase PostgreSQL Setup Script
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Project: <span className="font-mono text-lime-400">wfgnkatcsdaffgjrymbr.supabase.co</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-300 text-xs">
              Copy and execute this SQL directly in your Supabase SQL Editor. It creates the <code className="text-lime-300">programmes</code> and <code className="text-lime-300">faculty</code> tables with matching columns and Row-Level Security policies.
            </p>

            <div className="relative">
              <pre className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-[11px] font-mono text-slate-200 max-h-80 overflow-y-auto leading-relaxed select-all">
                {SUPABASE_SQL_SNIPPET}
              </pre>
              <button
                onClick={copySqlToClipboard}
                className="absolute top-3 right-3 px-3 py-1.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Full file also located at <code className="text-lime-400 font-mono">/database/supabase_setup.sql</code>
              </span>
              <button
                onClick={() => setShowSqlModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: APPLICATION REVIEW */}
      {/* ==================================================== */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900">
              Admissions Board Decision for {selectedApp.applicantName}
            </h3>
            <p className="text-slate-500">
              Ref: {selectedApp.referenceNumber} · {selectedApp.programmeTitle}
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Audition Date (if scheduling audition)
              </label>
              <input
                type="text"
                value={auditionDateInput}
                onChange={(e) => setAuditionDateInput(e.target.value)}
                placeholder="2026-11-10 11:00 WAT"
                className="w-full p-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Staff Review Notes</label>
              <textarea
                rows={3}
                value={staffNoteInput}
                onChange={(e) => setStaffNoteInput(e.target.value)}
                placeholder="Enter notes on candidate pitch, audition preparation, or missing credentials..."
                className="w-full p-2.5 rounded-xl border border-stone-300"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleUpdateAppStatus('accepted')}
                className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer"
              >
                Approve Admission
              </button>
              <button
                type="button"
                onClick={() => handleUpdateAppStatus('audition_scheduled')}
                className="py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl cursor-pointer"
              >
                Schedule Audition
              </button>
              <button
                type="button"
                onClick={() => handleUpdateAppStatus('additional_info_required')}
                className="py-2.5 bg-slate-800 text-white font-semibold rounded-xl cursor-pointer"
              >
                Request Info
              </button>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => handleUpdateAppStatus('rejected')}
                className="text-rose-600 hover:underline font-semibold cursor-pointer"
              >
                Reject Application
              </button>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-stone-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ISSUE CERTIFICATE */}
      {/* ==================================================== */}
      {showIssueCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900">
              Issue Official Academic Certificate
            </h3>

            <form onSubmit={handleIssueCert} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={certStudentName}
                  onChange={(e) => setCertStudentName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Programme Title</label>
                <select
                  value={certProgrammeTitle}
                  onChange={(e) => setCertProgrammeTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300"
                >
                  {programmes.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Classification</label>
                  <select
                    value={certClassification}
                    onChange={(e) => setCertClassification(e.target.value as typeof certClassification)}
                    className="w-full p-2.5 rounded-xl border border-stone-300"
                  >
                    <option value="Distinction">Distinction</option>
                    <option value="Merit">Merit</option>
                    <option value="Pass">Pass</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Certificate Number</label>
                  <input
                    type="text"
                    required
                    value={certNumberInput}
                    onChange={(e) => setCertNumberInput(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowIssueCertModal(false)}
                  className="px-4 py-2 bg-stone-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Confer & Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
