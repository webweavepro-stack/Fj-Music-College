-- ==============================================================================
-- FJMUSIC COLLEGE & LMS — DATABASE MIGRATION 001: INITIAL SCHEMA & RLS POLICIES
-- PostgreSQL 15+ / Supabase Schema Definition
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom Enum Types
CREATE TYPE user_role AS ENUM ('applicant', 'student', 'instructor', 'admin');
CREATE TYPE programme_category AS ENUM ('diploma', 'certificate', 'practical');
CREATE TYPE application_status AS ENUM (
  'draft',
  'submitted',
  'under_review',
  'audition_scheduled',
  'additional_info_required',
  'accepted',
  'rejected',
  'withdrawn'
);
CREATE TYPE assessment_type AS ENUM (
  'theory_exam',
  'practical_jury',
  'musicianship',
  'ensemble_rehearsal',
  'stage_performance'
);
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');
CREATE TYPE delivery_format AS ENUM (
  'Hybrid (Campus Studio & Online)',
  'On-Campus Intensive',
  'Studio Masterclass'
);

-- ==============================================================================
-- 2. CORE TABLES
-- ==============================================================================

-- PROFILES (Users linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'applicant',
  phone VARCHAR(50),
  avatar_url TEXT,
  primary_instrument VARCHAR(100),
  student_id_number VARCHAR(50) UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROGRAMMES
CREATE TABLE programmes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category programme_category NOT NULL,
  discipline VARCHAR(100) NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  duration VARCHAR(100) NOT NULL,
  delivery_format delivery_format NOT NULL,
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

-- PROGRAMME MODULES
CREATE TABLE programme_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  programme_id UUID NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  order_index INT NOT NULL DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  duration_weeks INT,
  description TEXT NOT NULL,
  topics JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COURSES
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  programme_id UUID REFERENCES programmes(id) ON DELETE SET NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  level VARCHAR(50) NOT NULL DEFAULT 'Foundational',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COURSE MODULES & LESSONS
CREATE TABLE course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  order_index INT NOT NULL DEFAULT 1,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  order_index INT NOT NULL DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30,
  lesson_type VARCHAR(50) NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  audio_sample_url TEXT,
  sheet_music_snippet TEXT,
  exercise_prompt TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ADMISSION APPLICATIONS
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number VARCHAR(50) UNIQUE NOT NULL,
  applicant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  programme_id UUID NOT NULL REFERENCES programmes(id),
  status application_status NOT NULL DEFAULT 'submitted',
  musical_background TEXT NOT NULL,
  years_of_experience INT NOT NULL DEFAULT 0,
  primary_instrument_or_voice VARCHAR(100) NOT NULL,
  audition_preference VARCHAR(50) NOT NULL DEFAULT 'in_person',
  audition_video_url TEXT,
  audition_date TIMESTAMPTZ,
  staff_notes TEXT,
  application_fee_paid BOOLEAN NOT NULL DEFAULT FALSE,
  payment_reference VARCHAR(100),
  documents JSONB NOT NULL DEFAULT '[]'::jsonb,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  admitted_at TIMESTAMPTZ
);

-- ENROLLMENTS
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  programme_id UUID NOT NULL REFERENCES programmes(id),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  completed_lesson_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRACTICE LOGS
CREATE TABLE practice_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  instrument VARCHAR(100) NOT NULL,
  duration_minutes INT NOT NULL,
  bpm INT,
  learning_objective TEXT NOT NULL,
  challenges_encountered TEXT,
  progress_notes TEXT NOT NULL,
  instructor_id UUID REFERENCES profiles(id),
  instructor_feedback TEXT,
  practical_rating INT CHECK (practical_rating >= 1 AND practical_rating <= 5),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ASSESSMENTS & RESULTS
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  type assessment_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  assessment_date DATE NOT NULL,
  max_score INT NOT NULL DEFAULT 100,
  score INT,
  grade_classification VARCHAR(50),
  feedback TEXT,
  rubric JSONB NOT NULL DEFAULT '[]'::jsonb,
  assessed_by UUID REFERENCES profiles(id),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- EVENTS & REGISTRATIONS
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(50) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  delivery_format VARCHAR(100) NOT NULL,
  cover_image_url TEXT,
  capacity INT NOT NULL DEFAULT 100,
  registered_count INT NOT NULL DEFAULT 0,
  is_registration_open BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  ticket_code VARCHAR(50) UNIQUE NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PAYMENTS (Paystack Reconciled)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference VARCHAR(100) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES profiles(id),
  amount NUMERIC(12, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'NGN',
  purpose VARCHAR(100) NOT NULL,
  programme_id UUID REFERENCES programmes(id),
  status payment_status NOT NULL DEFAULT 'pending',
  channel VARCHAR(50) NOT NULL DEFAULT 'Paystack',
  receipt_number VARCHAR(100) UNIQUE NOT NULL,
  paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CERTIFICATES
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  student_id UUID NOT NULL REFERENCES profiles(id),
  programme_title VARCHAR(255) NOT NULL,
  qualification_type VARCHAR(100) NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  completion_date DATE NOT NULL,
  grade_classification VARCHAR(50) NOT NULL,
  signatory_name VARCHAR(255) NOT NULL,
  signatory_title VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'verified_active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AUDIT LOGS
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  performed_by VARCHAR(255) NOT NULL,
  user_role user_role NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_entity VARCHAR(255) NOT NULL,
  details TEXT NOT NULL
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check instructor role
CREATE OR REPLACE FUNCTION is_instructor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'instructor'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Public read minimal profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users edit own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- APPLICATIONS POLICIES
CREATE POLICY "Applicants view own applications" ON applications
  FOR SELECT USING (auth.uid() = applicant_id OR is_admin());
CREATE POLICY "Applicants create applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);
CREATE POLICY "Admins update application status" ON applications
  FOR UPDATE USING (is_admin());

-- PRACTICE LOGS POLICIES
CREATE POLICY "Students view own practice logs" ON practice_logs
  FOR SELECT USING (auth.uid() = student_id OR is_instructor() OR is_admin());
CREATE POLICY "Students create practice logs" ON practice_logs
  FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Instructors review practice logs" ON practice_logs
  FOR UPDATE USING (is_instructor() OR is_admin());

-- CERTIFICATES POLICIES (Publicly verifiable by certificate_number)
CREATE POLICY "Anyone can verify certificates" ON certificates
  FOR SELECT USING (true);
CREATE POLICY "Only admins can issue certificates" ON certificates
  FOR INSERT WITH CHECK (is_admin());

-- AUDIT LOGS POLICIES
CREATE POLICY "Only admins read audit logs" ON audit_logs
  FOR SELECT USING (is_admin());
