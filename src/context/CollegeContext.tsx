import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  Programme,
  Course,
  FacultyMember,
  CollegeEvent,
  CertificateRecord,
  Application,
  PracticeLog,
  AssessmentRecord,
  SiteSettings,
  AuditLog,
  PaymentRecord,
  EventRegistration,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_PROGRAMMES,
  INITIAL_COURSES,
  INITIAL_FACULTY,
  INITIAL_EVENTS,
  INITIAL_CERTIFICATES,
  INITIAL_APPLICATIONS,
  INITIAL_PRACTICE_LOGS,
  INITIAL_ASSESSMENTS,
  INITIAL_PAYMENTS,
  INITIAL_AUDIT_LOGS,
} from '../data/initialData';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  applicant: {
    id: 'app-demo-1',
    name: 'Michael Babatunde',
    email: 'michael.babatunde@example.com',
    role: 'applicant',
    phone: '+234 812 445 6789',
    instrument: 'Voice (Tenor)',
    createdAt: '2026-10-12',
  },
  student: {
    id: 'stu-demo-1',
    name: 'Temitope Samuel Adeleke',
    email: 'temitope.adeleke@example.com',
    role: 'student',
    phone: '+234 803 123 4567',
    instrument: 'Voice & Keyboard',
    enrolledProgrammeId: 'prog-dip-vocal',
    studentIdNumber: 'FJM-2026-0814',
    createdAt: '2026-09-01',
  },
  instructor: {
    id: 'fac-1',
    name: 'Dr. Clara Adeleke',
    email: 'clara.adeleke@fjmusiccollege.edu',
    role: 'instructor',
    phone: '+234 802 998 7766',
    instrument: 'Voice & Piano',
    createdAt: '2026-01-15',
  },
  admin: {
    id: 'adm-1',
    name: 'Dean Alexander Cole',
    email: 'admin.registry@fjmusiccollege.edu',
    role: 'admin',
    phone: '+234 800 000 1122',
    createdAt: '2025-08-01',
  },
};

import { supabase, isSupabaseConfigured, testSupabaseConnection } from '../lib/supabase';

interface CollegeContextType {
  currentUser: UserProfile;
  switchUserRole: (role: UserRole) => void;
  programmes: Programme[];
  courses: Course[];
  faculty: FacultyMember[];
  events: CollegeEvent[];
  certificates: CertificateRecord[];
  applications: Application[];
  practiceLogs: PracticeLog[];
  assessments: AssessmentRecord[];
  payments: PaymentRecord[];
  auditLogs: AuditLog[];
  settings: SiteSettings;
  eventRegistrations: EventRegistration[];
  completedLessonIds: string[];
  supabaseStatus: { connected: boolean; message: string };
  checkSupabase: () => Promise<void>;

  // Actions
  submitApplication: (appData: Omit<Application, 'id' | 'referenceNumber' | 'status' | 'submittedAt' | 'applicationFeePaid'>) => Promise<Application>;
  updateApplicationStatus: (appId: string, status: Application['status'], notes?: string, auditionDate?: string) => void;
  markLessonComplete: (lessonId: string) => void;
  submitPracticeLog: (logData: Omit<PracticeLog, 'id' | 'studentId' | 'studentName' | 'instructorFeedback'>) => void;
  reviewPracticeLog: (logId: string, feedback: string, rating: number) => void;
  submitAssessmentGrade: (assessmentId: string, score: number, feedback: string, rubricScores?: Record<string, number>) => void;
  registerForEvent: (eventId: string) => { success: boolean; ticketCode?: string; message: string };
  verifyCertificate: (certNumber: string) => CertificateRecord | null;
  issueCertificate: (certData: Omit<CertificateRecord, 'id' | 'qrVerificationUrl' | 'status'>) => CertificateRecord;
  processPayment: (paymentData: Omit<PaymentRecord, 'id' | 'reference' | 'status' | 'paidAt' | 'receiptNumber'>) => Promise<PaymentRecord>;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  addProgramme: (programme: Programme) => void;
  updateProgramme: (programme: Programme) => void;
  deleteProgramme: (programmeId: string) => void;
  addFaculty: (member: FacultyMember) => void;
  updateFaculty: (member: FacultyMember) => void;
  deleteFaculty: (facultyId: string) => void;
  resetAllData: () => void;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

const STORAGE_KEY = 'fjmusic_college_v1_store';

export const CollegeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from local storage or fallback to initial seeded data
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : DEMO_USERS.student;
  });

  const [programmes, setProgrammes] = useState<Programme[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_programmes`);
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMMES;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_courses`);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [faculty, setFaculty] = useState<FacultyMember[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_faculty`);
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  const [events, setEvents] = useState<CollegeEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [certificates, setCertificates] = useState<CertificateRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_certificates`);
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_applications`);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_practiceLogs`);
    return saved ? JSON.parse(saved) : INITIAL_PRACTICE_LOGS;
  });

  const [assessments, setAssessments] = useState<AssessmentRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_assessments`);
    return saved ? JSON.parse(saved) : INITIAL_ASSESSMENTS;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_payments`);
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_auditLogs`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_eventRegs`);
    return saved ? JSON.parse(saved) : [];
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_completedLessons`);
    return saved ? JSON.parse(saved) : ['les-voc-1'];
  });

  const [supabaseStatus, setSupabaseStatus] = useState<{ connected: boolean; message: string }>({
    connected: false,
    message: 'Testing connection to Supabase...',
  });

  const checkSupabase = async () => {
    const res = await testSupabaseConnection();
    setSupabaseStatus(res);
  };

  useEffect(() => {
    checkSupabase();
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_programmes`, JSON.stringify(programmes));
    localStorage.setItem(`${STORAGE_KEY}_courses`, JSON.stringify(courses));
    localStorage.setItem(`${STORAGE_KEY}_faculty`, JSON.stringify(faculty));
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
    localStorage.setItem(`${STORAGE_KEY}_certificates`, JSON.stringify(certificates));
    localStorage.setItem(`${STORAGE_KEY}_applications`, JSON.stringify(applications));
    localStorage.setItem(`${STORAGE_KEY}_practiceLogs`, JSON.stringify(practiceLogs));
    localStorage.setItem(`${STORAGE_KEY}_assessments`, JSON.stringify(assessments));
    localStorage.setItem(`${STORAGE_KEY}_payments`, JSON.stringify(payments));
    localStorage.setItem(`${STORAGE_KEY}_auditLogs`, JSON.stringify(auditLogs));
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    localStorage.setItem(`${STORAGE_KEY}_eventRegs`, JSON.stringify(eventRegistrations));
    localStorage.setItem(`${STORAGE_KEY}_completedLessons`, JSON.stringify(completedLessonIds));
  }, [
    programmes,
    courses,
    faculty,
    events,
    certificates,
    applications,
    practiceLogs,
    assessments,
    payments,
    auditLogs,
    settings,
    eventRegistrations,
    completedLessonIds,
  ]);

  const addAuditLog = (action: string, targetEntity: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      performedBy: currentUser.name,
      userRole: currentUser.role,
      action,
      targetEntity,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const switchUserRole = (role: UserRole) => {
    setCurrentUser(DEMO_USERS[role]);
    addAuditLog('SWITCH_ROLE', `User: ${currentUser.name}`, `Switched active role preview to ${role.toUpperCase()}`);
  };

  const submitApplication = async (
    appData: Omit<Application, 'id' | 'referenceNumber' | 'status' | 'submittedAt' | 'applicationFeePaid'>
  ): Promise<Application> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `FJM-APP-2026-${randomSuffix}`;

    const newApp: Application = {
      ...appData,
      id: `app-${Date.now()}`,
      referenceNumber,
      status: 'submitted',
      submittedAt: new Date().toISOString().slice(0, 10),
      applicationFeePaid: false,
    };

    setApplications((prev) => [newApp, ...prev]);
    addAuditLog('SUBMIT_APPLICATION', `Application:${referenceNumber}`, `New application submitted for ${newApp.programmeTitle}`);
    return newApp;
  };

  const updateApplicationStatus = (
    appId: string,
    status: Application['status'],
    notes?: string,
    auditionDate?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status,
            staffNotes: notes || app.staffNotes,
            auditionDate: auditionDate || app.auditionDate,
            admittedAt: status === 'accepted' ? new Date().toISOString().slice(0, 10) : app.admittedAt,
          };
        }
        return app;
      })
    );
    addAuditLog('UPDATE_APPLICATION_STATUS', `Application:${appId}`, `Status changed to ${status}`);
  };

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]));
  };

  const submitPracticeLog = (
    logData: Omit<PracticeLog, 'id' | 'studentId' | 'studentName' | 'instructorFeedback'>
  ) => {
    const newLog: PracticeLog = {
      ...logData,
      id: `pl-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      instructorFeedback: undefined,
    };
    setPracticeLogs((prev) => [newLog, ...prev]);
    addAuditLog('LOG_PRACTICE_SESSION', `PracticeLog:${newLog.id}`, `${currentUser.name} recorded ${newLog.durationMinutes} min practice on ${newLog.instrument}`);
  };

  const reviewPracticeLog = (logId: string, feedback: string, rating: number) => {
    setPracticeLogs((prev) =>
      prev.map((log) => {
        if (log.id === logId) {
          return {
            ...log,
            instructorFeedback: {
              instructorName: currentUser.name,
              feedback,
              reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
              practicalRating: rating,
            },
          };
        }
        return log;
      })
    );
    addAuditLog('REVIEW_PRACTICE_LOG', `PracticeLog:${logId}`, `Instructor ${currentUser.name} gave ${rating}/5 rating.`);
  };

  const submitAssessmentGrade = (
    assessmentId: string,
    score: number,
    feedback: string,
    rubricScores?: Record<string, number>
  ) => {
    setAssessments((prev) =>
      prev.map((ass) => {
        if (ass.id === assessmentId) {
          const updatedRubric = rubricScores
            ? ass.rubric.map((item) => ({
                ...item,
                awardedPoints: rubricScores[item.name] ?? item.awardedPoints,
              }))
            : ass.rubric;

          const gradeClassification =
            score >= 85 ? 'Distinction' : score >= 70 ? 'Merit' : score >= 50 ? 'Pass' : 'Resit Required';

          return {
            ...ass,
            score,
            status: 'graded',
            assessedBy: currentUser.name,
            feedback,
            gradeClassification,
            rubric: updatedRubric,
          };
        }
        return ass;
      })
    );
    addAuditLog('GRADE_ASSESSMENT', `Assessment:${assessmentId}`, `Assigned score ${score} by ${currentUser.name}`);
  };

  const registerForEvent = (eventId: string) => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return { success: false, message: 'Event not found.' };

    const alreadyRegistered = eventRegistrations.some(
      (r) => r.eventId === eventId && r.userEmail === currentUser.email
    );
    if (alreadyRegistered) {
      return { success: false, message: 'You have already registered for this event.' };
    }

    const ticketCode = `FJM-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReg: EventRegistration = {
      id: `reg-${Date.now()}`,
      eventId,
      eventTitle: targetEvent.title,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      ticketCode,
      registeredAt: new Date().toISOString().slice(0, 10),
    };

    setEventRegistrations((prev) => [newReg, ...prev]);
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e))
    );

    addAuditLog('EVENT_REGISTRATION', `Event:${targetEvent.title}`, `Registered user ${currentUser.name}`);
    return { success: true, ticketCode, message: 'Registration confirmed!' };
  };

  const verifyCertificate = (certNumber: string): CertificateRecord | null => {
    const match = certificates.find(
      (c) => c.certificateNumber.toUpperCase() === certNumber.trim().toUpperCase()
    );
    return match || null;
  };

  const issueCertificate = (
    certData: Omit<CertificateRecord, 'id' | 'qrVerificationUrl' | 'status'>
  ): CertificateRecord => {
    const newCert: CertificateRecord = {
      ...certData,
      id: `cert-${Date.now()}`,
      status: 'verified_active',
      qrVerificationUrl: `/certificates/verify/${certData.certificateNumber}`,
    };
    setCertificates((prev) => [newCert, ...prev]);
    addAuditLog('ISSUE_CERTIFICATE', `Cert:${newCert.certificateNumber}`, `Issued to ${newCert.studentName}`);
    return newCert;
  };

  const processPayment = async (
    paymentData: Omit<PaymentRecord, 'id' | 'reference' | 'status' | 'paidAt' | 'receiptNumber'>
  ): Promise<PaymentRecord> => {
    const ref = `PAY_FJM_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const receiptNum = `RCP-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newPayment: PaymentRecord = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      reference: ref,
      status: 'success',
      paidAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      receiptNumber: receiptNum,
    };

    setPayments((prev) => [newPayment, ...prev]);

    // If it was an application fee, mark corresponding application as paid
    if (paymentData.purpose === 'Application Fee') {
      setApplications((prev) =>
        prev.map((app) =>
          app.applicantEmail === paymentData.userEmail
            ? { ...app, applicationFeePaid: true, paymentReference: ref }
            : app
        )
      );
    }

    addAuditLog('PROCESS_PAYMENT', `Payment:${ref}`, `${paymentData.purpose} of ${paymentData.currency} ${paymentData.amount.toLocaleString()} received via ${paymentData.channel}`);
    return newPayment;
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addAuditLog('UPDATE_SETTINGS', 'SiteSettings', 'College settings updated by admin');
  };

  const addProgramme = (prog: Programme) => {
    setProgrammes((prev) => [prog, ...prev]);
    addAuditLog('ADD_PROGRAMME', `Programme:${prog.title}`, `Created programme: ${prog.title} (Fee: ${prog.currency} ${prog.tuitionFee})`);
    if (supabase) {
      supabase.from('programmes').insert({
        title: prog.title,
        slug: prog.slug,
        category: prog.category,
        discipline: prog.discipline,
        short_description: prog.shortDescription,
        description: prog.description,
        duration: prog.duration,
        delivery_format: prog.deliveryFormat,
        tuition_fee: prog.tuitionFee,
        application_fee: prog.applicationFee,
        currency: prog.currency,
        requires_audition: prog.requiresAudition,
        featured: prog.featured ?? false,
      }).then(() => {});
    }
  };

  const updateProgramme = (prog: Programme) => {
    setProgrammes((prev) => prev.map((p) => (p.id === prog.id ? prog : p)));
    addAuditLog('UPDATE_PROGRAMME', `Programme:${prog.title}`, `Updated programme: ${prog.title} (Tuition: ${prog.currency} ${prog.tuitionFee})`);
    if (supabase) {
      supabase.from('programmes').update({
        title: prog.title,
        category: prog.category,
        discipline: prog.discipline,
        short_description: prog.shortDescription,
        description: prog.description,
        duration: prog.duration,
        delivery_format: prog.deliveryFormat,
        tuition_fee: prog.tuitionFee,
        application_fee: prog.applicationFee,
        requires_audition: prog.requiresAudition,
      }).eq('id', prog.id).then(() => {});
    }
  };

  const deleteProgramme = (programmeId: string) => {
    const target = programmes.find((p) => p.id === programmeId);
    setProgrammes((prev) => prev.filter((p) => p.id !== programmeId));
    addAuditLog('DELETE_PROGRAMME', `Programme:${programmeId}`, `Deleted programme: ${target?.title || programmeId}`);
    if (supabase) {
      supabase.from('programmes').delete().eq('id', programmeId).then(() => {});
    }
  };

  const addFaculty = (member: FacultyMember) => {
    setFaculty((prev) => [member, ...prev]);
    addAuditLog('ADD_FACULTY', `Faculty:${member.name}`, `Added new faculty: ${member.name} (${member.role})`);
    if (supabase) {
      supabase.from('faculty').insert({
        id: member.id,
        name: member.name,
        title: member.title,
        role: member.role,
        instruments: member.instruments,
        education: member.education,
        bio: member.bio,
        teaching_philosophy: member.teachingPhilosophy,
        image_url: member.image,
        assigned_courses: member.assignedCourses,
      }).then(({ error }) => {
        if (error) console.warn('Supabase faculty insert error:', error.message);
      });
    }
  };

  const updateFaculty = (member: FacultyMember) => {
    setFaculty((prev) => prev.map((f) => (f.id === member.id ? member : f)));
    addAuditLog('UPDATE_FACULTY', `Faculty:${member.name}`, `Updated faculty details for ${member.name}`);
    if (supabase) {
      supabase.from('faculty').update({
        name: member.name,
        title: member.title,
        role: member.role,
        instruments: member.instruments,
        education: member.education,
        bio: member.bio,
        teaching_philosophy: member.teachingPhilosophy,
        image_url: member.image,
        assigned_courses: member.assignedCourses,
      }).eq('id', member.id).then(({ error }) => {
        if (error) console.warn('Supabase faculty update error:', error.message);
      });
    }
  };

  const deleteFaculty = (facultyId: string) => {
    const target = faculty.find((f) => f.id === facultyId);
    setFaculty((prev) => prev.filter((f) => f.id !== facultyId));
    addAuditLog('DELETE_FACULTY', `Faculty:${facultyId}`, `Removed faculty member: ${target?.name || facultyId}`);
    if (supabase) {
      supabase.from('faculty').delete().eq('id', facultyId).then(({ error }) => {
        if (error) console.warn('Supabase faculty delete error:', error.message);
      });
    }
  };

  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_user`);
    localStorage.removeItem(`${STORAGE_KEY}_programmes`);
    localStorage.removeItem(`${STORAGE_KEY}_courses`);
    localStorage.removeItem(`${STORAGE_KEY}_faculty`);
    localStorage.removeItem(`${STORAGE_KEY}_events`);
    localStorage.removeItem(`${STORAGE_KEY}_certificates`);
    localStorage.removeItem(`${STORAGE_KEY}_applications`);
    localStorage.removeItem(`${STORAGE_KEY}_practiceLogs`);
    localStorage.removeItem(`${STORAGE_KEY}_assessments`);
    localStorage.removeItem(`${STORAGE_KEY}_payments`);
    localStorage.removeItem(`${STORAGE_KEY}_auditLogs`);
    localStorage.removeItem(`${STORAGE_KEY}_settings`);
    localStorage.removeItem(`${STORAGE_KEY}_eventRegs`);
    localStorage.removeItem(`${STORAGE_KEY}_completedLessons`);

    setCurrentUser(DEMO_USERS.student);
    setProgrammes(INITIAL_PROGRAMMES);
    setCourses(INITIAL_COURSES);
    setFaculty(INITIAL_FACULTY);
    setEvents(INITIAL_EVENTS);
    setCertificates(INITIAL_CERTIFICATES);
    setApplications(INITIAL_APPLICATIONS);
    setPracticeLogs(INITIAL_PRACTICE_LOGS);
    setAssessments(INITIAL_ASSESSMENTS);
    setPayments(INITIAL_PAYMENTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSettings(INITIAL_SETTINGS);
    setEventRegistrations([]);
    setCompletedLessonIds(['les-voc-1']);
  };

  return (
    <CollegeContext.Provider
      value={{
        currentUser,
        switchUserRole,
        programmes,
        courses,
        faculty,
        events,
        certificates,
        applications,
        practiceLogs,
        assessments,
        payments,
        auditLogs,
        settings,
        eventRegistrations,
        completedLessonIds,
        supabaseStatus,
        checkSupabase,
        submitApplication,
        updateApplicationStatus,
        markLessonComplete,
        submitPracticeLog,
        reviewPracticeLog,
        submitAssessmentGrade,
        registerForEvent,
        verifyCertificate,
        issueCertificate,
        processPayment,
        updateSettings,
        addProgramme,
        updateProgramme,
        deleteProgramme,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        resetAllData,
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollege = () => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error('useCollege must be used within a CollegeProvider');
  }
  return context;
};
