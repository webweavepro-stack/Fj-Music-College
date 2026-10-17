export type UserRole = 'applicant' | 'student' | 'instructor' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  instrument?: string;
  enrolledProgrammeId?: string;
  studentIdNumber?: string;
  createdAt: string;
}

export type ProgrammeCategory = 'diploma' | 'certificate' | 'practical';

export interface ProgrammeModule {
  id: string;
  title: string;
  durationWeeks?: number;
  description: string;
  topics: string[];
}

export interface Programme {
  id: string;
  title: string;
  slug: string;
  category: ProgrammeCategory;
  discipline: string;
  shortDescription: string;
  description: string;
  learningObjectives: string[];
  curriculum: ProgrammeModule[];
  duration: string;
  entryRequirements: string[];
  deliveryFormat: 'Hybrid (Campus Studio & Online)' | 'On-Campus Intensive' | 'Studio Masterclass';
  practicalAssessment: string;
  theoreticalAssessment: string;
  tuitionFee: number;
  applicationFee: number;
  currency: string;
  featured?: boolean;
  coverImage?: string;
  requiresAudition: boolean;
  auditionRequirements?: string;
  relatedProgrammeSlugs?: string[];
}

export type LessonType =
  | 'written_theory'
  | 'sheet_music'
  | 'audio_example'
  | 'video_demonstration'
  | 'instrumental_practice'
  | 'vocal_exercise'
  | 'music_production'
  | 'assignment';

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'mp3' | 'mid' | 'score' | 'sheet';
  size: string;
  downloadUrl: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  type: LessonType;
  content: string;
  summary: string;
  audioSample?: {
    title: string;
    keySignature?: string;
    bpm?: number;
    audioFrequencies?: number[];
  };
  sheetMusicSnippet?: string; // Text representation or note sequence e.g. "C4 E4 G4 B4 C5"
  resources: LessonResource[];
  exercisePrompt?: string;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  courseId: string;
  order: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  programmeId: string;
  code: string;
  title: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar?: string;
  description: string;
  level: 'Foundational' | 'Intermediate' | 'Advanced Diploma';
  totalLessons: number;
  modules: CourseModule[];
}

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'audition_scheduled'
  | 'additional_info_required'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export interface Application {
  id: string;
  referenceNumber: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  programmeId: string;
  programmeTitle: string;
  category: ProgrammeCategory;
  status: ApplicationStatus;
  submittedAt: string;
  musicalBackground: string;
  yearsOfExperience: number;
  primaryInstrumentOrVoice: string;
  auditionPreference: 'in_person' | 'video_link' | 'exempt';
  auditionVideoUrl?: string;
  auditionDate?: string;
  auditionFeedback?: string;
  staffNotes?: string;
  applicationFeePaid: boolean;
  paymentReference?: string;
  admittedAt?: string;
  documents: {
    name: string;
    type: string;
    size: string;
  }[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  programmeId: string;
  programmeTitle: string;
  courseId: string;
  courseTitle: string;
  enrolledAt: string;
  completedLessonIds: string[];
  status: 'active' | 'completed' | 'on_hold';
  progressPercentage: number;
}

export interface PracticeLog {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  instrument: string;
  durationMinutes: number;
  bpm?: number;
  learningObjective: string;
  challengesEncountered: string;
  progressNotes: string;
  audioSampleNotes?: string;
  instructorFeedback?: {
    instructorName: string;
    feedback: string;
    reviewedAt: string;
    practicalRating: number; // 1 to 5
  };
}

export type AssessmentType =
  | 'theory_exam'
  | 'practical_jury'
  | 'musicianship'
  | 'ensemble_rehearsal'
  | 'stage_performance';

export interface RubricCriterion {
  name: string;
  maxPoints: number;
  awardedPoints: number;
  notes?: string;
}

export interface AssessmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  programmeTitle: string;
  courseTitle: string;
  type: AssessmentType;
  title: string;
  assessmentDate: string;
  status: 'pending' | 'graded';
  score?: number;
  maxScore: number;
  gradeClassification?: 'Distinction' | 'Merit' | 'Pass' | 'Resit Required';
  assessedBy?: string;
  feedback?: string;
  rubric: RubricCriterion[];
}

export type EventCategory =
  | 'concert'
  | 'recital'
  | 'workshop'
  | 'masterclass'
  | 'ensemble_session'
  | 'showcase';

export interface CollegeEvent {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  description: string;
  date: string;
  time: string;
  venue: string;
  deliveryFormat: 'In-Person Concert Hall' | 'Studio Theater' | 'Live Stream & Campus';
  coverImage: string;
  capacity: number;
  registeredCount: number;
  isRegistrationOpen: boolean;
  featured?: boolean;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  ticketCode: string;
  registeredAt: string;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  purpose: 'Application Fee' | 'Tuition Payment' | 'Masterclass Registration' | 'Practice Room Access';
  programmeTitle?: string;
  status: 'success' | 'pending' | 'failed';
  channel: 'Paystack' | 'Bank Transfer (Admin Verified)' | 'Campus Bursary';
  paidAt: string;
  receiptNumber: string;
}

export interface CertificateRecord {
  id: string;
  certificateNumber: string;
  studentId: string;
  studentName: string;
  programmeTitle: string;
  qualificationType: 'Diploma' | 'Certificate of Musicianship' | 'Practical Competence Award';
  issueDate: string;
  completionDate: string;
  gradeClassification: 'Distinction' | 'Merit' | 'Pass';
  signatoryName: string;
  signatoryTitle: string;
  signatorySignatureUrl?: string;
  status: 'verified_active' | 'revoked';
  qrVerificationUrl: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  role: 'Dean of Performance' | 'Head of Keyboard Studies' | 'Director of Vocal Studies' | 'Head of Music Production' | 'Lecturer in Contemporary Worship';
  instruments: string[];
  education: string;
  bio: string;
  teachingPhilosophy: string;
  image: string;
  assignedCourses: string[];
}

export interface SiteSettings {
  collegeName: string;
  slogan: string;
  institutionalBelief: string;
  contactEmail: string;
  contactPhone: string;
  campusAddress: string;
  admissionOpen: boolean;
  currentTerm: string;
  applicationDeadline: string;
  paystackPublicKey: string;
  paystackTestMode: boolean;
  enableLivePayments: boolean;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    sortCode?: string;
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  performedBy: string;
  userRole: UserRole;
  action: string;
  targetEntity: string;
  details: string;
}
