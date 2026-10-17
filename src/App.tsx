import React, { useState, useEffect } from 'react';
import { CollegeProvider, useCollege } from './context/CollegeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProgrammesView } from './views/ProgrammesView';
import { ProgrammeDetailView } from './views/ProgrammeDetailView';
import { AdmissionsView } from './views/AdmissionsView';
import { ApplyView } from './views/ApplyView';
import { AuditionsView } from './views/AuditionsView';
import { PracticalTrainingView } from './views/PracticalTrainingView';
import { FacultyView } from './views/FacultyView';
import { EventsView } from './views/EventsView';
import { GalleryView } from './views/GalleryView';
import { ContactView } from './views/ContactView';
import { CertificateVerifyView } from './views/CertificateVerifyView';
import { PoliciesView } from './views/PoliciesView';
import { AuthViews } from './views/auth/AuthViews';
import { LearnCourseView } from './views/LearnCourseView';
import { StudentPortalView } from './views/student/StudentPortalView';
import { InstructorPortalView } from './views/instructor/InstructorPortalView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { CollegeEvent } from './types';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  const [selectedEventForModal, setSelectedEventForModal] = useState<CollegeEvent | null>(null);

  // Sync with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  // Route Dispatcher
  const renderView = () => {
    // 1. Home
    if (currentPath === '/') {
      return (
        <HomeView
          navigate={navigate}
          onSelectEvent={(event) => {
            setSelectedEventForModal(event);
            navigate('/events');
          }}
        />
      );
    }

    // 2. About
    if (currentPath === '/about') {
      return <AboutView navigate={navigate} />;
    }

    // 3. Programmes
    if (currentPath === '/programmes') {
      return <ProgrammesView navigate={navigate} />;
    }
    if (currentPath.startsWith('/programmes/')) {
      const slug = currentPath.replace('/programmes/', '');
      return <ProgrammeDetailView slug={slug} navigate={navigate} />;
    }

    // 4. Admissions, Apply, Auditions
    if (currentPath === '/admissions') {
      return <AdmissionsView navigate={navigate} />;
    }
    if (currentPath === '/apply') {
      return <ApplyView navigate={navigate} />;
    }
    if (currentPath === '/auditions') {
      return <AuditionsView navigate={navigate} />;
    }

    // 5. Practical Training, Faculty, Gallery, Events, Contact
    if (currentPath === '/practical-training') {
      return <PracticalTrainingView navigate={navigate} />;
    }
    if (currentPath === '/faculty') {
      return <FacultyView navigate={navigate} />;
    }
    if (currentPath === '/gallery') {
      return <GalleryView navigate={navigate} />;
    }
    if (currentPath === '/events' || currentPath.startsWith('/events/')) {
      return (
        <EventsView
          navigate={navigate}
          onSelectEvent={(event) => setSelectedEventForModal(event)}
        />
      );
    }
    if (currentPath === '/contact') {
      return <ContactView navigate={navigate} />;
    }

    // 6. Certificate Verification
    if (currentPath === '/certificates/verify' || currentPath.startsWith('/certificates/verify/')) {
      const certNum = currentPath.startsWith('/certificates/verify/')
        ? currentPath.replace('/certificates/verify/', '')
        : undefined;
      return <CertificateVerifyView initialCertNumber={certNum} navigate={navigate} />;
    }

    // 7. Policies
    if (currentPath === '/privacy') {
      return <PoliciesView policyType="privacy" navigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <PoliciesView policyType="terms" navigate={navigate} />;
    }
    if (currentPath === '/refund-policy') {
      return <PoliciesView policyType="refund-policy" navigate={navigate} />;
    }

    // 8. Auth
    if (currentPath === '/login') {
      return <AuthViews mode="login" navigate={navigate} />;
    }
    if (currentPath === '/register') {
      return <AuthViews mode="register" navigate={navigate} />;
    }
    if (currentPath === '/forgot-password') {
      return <AuthViews mode="forgot-password" navigate={navigate} />;
    }
    if (currentPath === '/reset-password') {
      return <AuthViews mode="reset-password" navigate={navigate} />;
    }

    // 9. LMS Course Player: /learn/[courseId] or /learn/[courseId]/[lessonId]
    if (currentPath.startsWith('/learn/')) {
      const parts = currentPath.replace('/learn/', '').split('/');
      const courseId = parts[0] || 'course-voc-101';
      const lessonId = parts[1];
      return <LearnCourseView courseId={courseId} lessonId={lessonId} navigate={navigate} />;
    }

    // 10. Student Portal
    if (currentPath.startsWith('/student')) {
      const tab = currentPath.replace('/student/', '').replace('/student', '') || 'dashboard';
      return <StudentPortalView currentTab={tab} navigate={navigate} />;
    }

    // 11. Instructor Portal
    if (currentPath.startsWith('/instructor')) {
      const tab = currentPath.replace('/instructor/', '').replace('/instructor', '') || 'dashboard';
      return <InstructorPortalView currentTab={tab} navigate={navigate} />;
    }

    // 12. Admin Dashboard
    if (currentPath.startsWith('/admin')) {
      const tab = currentPath.replace('/admin/', '').replace('/admin', '') || 'overview';
      return <AdminDashboardView currentTab={tab} navigate={navigate} />;
    }

    // Fallback 404
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-slate-900 mb-2">
          Page Not Found (404)
        </h2>
        <p className="text-xs text-slate-600 mb-6 max-w-sm">
          The requested page could not be located on the FJMUSIC College academic server.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-slate-950 text-white font-bold rounded-xl text-xs"
        >
          Return to Homepage
        </button>
      </div>
    );
  };

  const isLmsPlayer = currentPath.startsWith('/learn/');

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-lime-400 selection:text-slate-950">
      {!isLmsPlayer && <Header currentPath={currentPath} navigate={navigate} />}
      <main className="flex-1">{renderView()}</main>
      {!isLmsPlayer && <Footer navigate={navigate} />}
      <WhatsAppButton phoneNumber="2349078616656" />
    </div>
  );
}

export default function App() {
  return (
    <CollegeProvider>
      <AppContent />
    </CollegeProvider>
  );
}
