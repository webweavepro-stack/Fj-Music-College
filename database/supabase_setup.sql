-- ==============================================================================
-- FJMUSIC COLLEGE & LMS — MASTER SUPABASE SQL SETUP SCRIPT
-- PostgreSQL 15+ / Supabase Schema, Triggers, RLS Policies & Seed Data
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('applicant', 'student', 'instructor', 'admin');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'programme_category') THEN
    CREATE TYPE programme_category AS ENUM ('diploma', 'certificate', 'practical');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
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
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'assessment_type') THEN
    CREATE TYPE assessment_type AS ENUM (
      'theory_exam',
      'practical_jury',
      'musicianship',
      'ensemble_rehearsal',
      'stage_performance'
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
    CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'delivery_format') THEN
    CREATE TYPE delivery_format AS ENUM (
      'Hybrid (Campus Studio & Online)',
      'On-Campus Intensive',
      'Studio Masterclass'
    );
  END IF;
END $$;

-- ==============================================================================
-- 3. CORE DATABASE TABLES
-- ==============================================================================

-- PROFILES (Maps to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
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
CREATE TABLE IF NOT EXISTS public.programmes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category programme_category NOT NULL,
  discipline VARCHAR(100) NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  learning_objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
  duration VARCHAR(100) NOT NULL,
  delivery_format delivery_format NOT NULL,
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

-- PROGRAMME MODULES
CREATE TABLE IF NOT EXISTS public.programme_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  programme_id UUID NOT NULL REFERENCES public.programmes(id) ON DELETE CASCADE,
  order_index INT NOT NULL DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  duration_weeks INT,
  description TEXT NOT NULL,
  topics JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COURSES
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  programme_id UUID REFERENCES public.programmes(id) ON DELETE SET NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  instructor_name VARCHAR(255) NOT NULL DEFAULT 'FJMUSIC Faculty',
  description TEXT NOT NULL,
  level VARCHAR(50) NOT NULL DEFAULT 'Foundational',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FACULTY & INSTRUCTORS
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

-- COURSE MODULES & LESSONS
CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  order_index INT NOT NULL DEFAULT 1,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  order_index INT NOT NULL DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30,
  lesson_type VARCHAR(50) NOT NULL,
  summary TEXT,
  content TEXT NOT NULL,
  audio_sample_url TEXT,
  sheet_music_snippet TEXT,
  exercise_prompt TEXT,
  resources JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ADMISSION APPLICATIONS
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number VARCHAR(50) UNIQUE NOT NULL,
  applicant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  applicant_phone VARCHAR(50) NOT NULL,
  programme_id UUID NOT NULL REFERENCES public.programmes(id),
  programme_title VARCHAR(255) NOT NULL,
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
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  programme_id UUID NOT NULL REFERENCES public.programmes(id),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  completed_lesson_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PRACTICE LOGS
CREATE TABLE IF NOT EXISTS public.practice_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  instrument VARCHAR(100) NOT NULL,
  duration_minutes INT NOT NULL,
  bpm INT,
  learning_objective TEXT NOT NULL,
  challenges_encountered TEXT,
  progress_notes TEXT NOT NULL,
  instructor_id UUID REFERENCES public.profiles(id),
  instructor_feedback TEXT,
  practical_rating INT CHECK (practical_rating >= 1 AND practical_rating <= 5),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ASSESSMENTS & RESULTS
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_name VARCHAR(255) NOT NULL,
  course_id UUID REFERENCES public.courses(id),
  course_title VARCHAR(255) NOT NULL,
  type assessment_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  assessment_date DATE NOT NULL,
  max_score INT NOT NULL DEFAULT 100,
  score INT,
  grade_classification VARCHAR(50),
  feedback TEXT,
  rubric JSONB NOT NULL DEFAULT '[]'::jsonb,
  assessed_by VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- EVENTS & REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.events (
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

CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  ticket_code VARCHAR(50) UNIQUE NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PAYMENTS (Paystack Reconciled)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference VARCHAR(100) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'NGN',
  purpose VARCHAR(100) NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  channel VARCHAR(50) NOT NULL DEFAULT 'Paystack',
  receipt_number VARCHAR(100) UNIQUE NOT NULL,
  paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CERTIFICATES
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  student_id UUID NOT NULL REFERENCES public.profiles(id),
  student_name VARCHAR(255) NOT NULL,
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

-- SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  college_name VARCHAR(255) NOT NULL DEFAULT 'FJMUSIC College',
  slogan VARCHAR(255) NOT NULL DEFAULT 'FROM PRACTICE ROOM TO LIVE PERFORMANCE',
  institutional_belief TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(255) NOT NULL,
  campus_address TEXT NOT NULL,
  admission_open BOOLEAN NOT NULL DEFAULT TRUE,
  current_term VARCHAR(100) NOT NULL DEFAULT 'Fall / Session 2026-2027',
  application_deadline DATE NOT NULL DEFAULT '2026-11-30',
  paystack_public_key VARCHAR(255),
  paystack_test_mode BOOLEAN NOT NULL DEFAULT TRUE,
  enable_live_payments BOOLEAN NOT NULL DEFAULT TRUE,
  bank_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  performed_by VARCHAR(255) NOT NULL,
  user_role user_role NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_entity VARCHAR(255) NOT NULL,
  details TEXT NOT NULL
);

-- ==============================================================================
-- 4. AUTOMATIC USER PROFILE TRIGGER (Supabase Auth -> Public Profiles)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'applicant'::user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if needed and re-create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programme_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper functions for RBAC
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_instructor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'instructor'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public tables read policies (Catalogues, Faculty, Events, Public Syllabi, Settings)
CREATE POLICY "Public read programmes" ON public.programmes FOR SELECT USING (true);
CREATE POLICY "Public read faculty" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "Admins manage programmes" ON public.programmes FOR ALL USING (public.is_admin());
CREATE POLICY "Anon manage programmes" ON public.programmes FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Admins manage faculty" ON public.faculty FOR ALL USING (public.is_admin());
CREATE POLICY "Anon manage faculty" ON public.faculty FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Public read programme_modules" ON public.programme_modules FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public read course_modules" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);

-- Certificate verification is completely public by certificate_number
CREATE POLICY "Public verify certificates" ON public.certificates FOR SELECT USING (true);

-- Profiles RLS
CREATE POLICY "Public view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Applications RLS
CREATE POLICY "Users view own application" ON public.applications
  FOR SELECT USING (auth.uid() = applicant_id OR public.is_admin());
CREATE POLICY "Users create application" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);
CREATE POLICY "Admins update application" ON public.applications
  FOR UPDATE USING (public.is_admin());

-- Practice Logs RLS
CREATE POLICY "Students view own practice" ON public.practice_logs
  FOR SELECT USING (auth.uid() = student_id OR public.is_instructor() OR public.is_admin());
CREATE POLICY "Students insert practice" ON public.practice_logs
  FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Instructors review practice" ON public.practice_logs
  FOR UPDATE USING (public.is_instructor() OR public.is_admin());

-- Assessments RLS
CREATE POLICY "Students view own assessments" ON public.assessments
  FOR SELECT USING (auth.uid() = student_id OR public.is_instructor() OR public.is_admin());
CREATE POLICY "Instructors grade assessments" ON public.assessments
  FOR ALL USING (public.is_instructor() OR public.is_admin());

-- Payments RLS
CREATE POLICY "Users view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users record payment" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Audit logs RLS
CREATE POLICY "Admins view audit logs" ON public.audit_logs
  FOR SELECT USING (public.is_admin());

-- ==============================================================================
-- 6. SEED DATA (FJMUSIC College Initial Catalogues)
-- ==============================================================================

-- Site Settings
INSERT INTO public.site_settings (
  id,
  college_name,
  slogan,
  institutional_belief,
  contact_email,
  contact_phone,
  campus_address,
  admission_open,
  current_term,
  application_deadline,
  paystack_test_mode,
  bank_details
) VALUES (
  1,
  'FJMUSIC College',
  'FROM PRACTICE ROOM TO LIVE PERFORMANCE',
  'Music education should go beyond classroom theory. Students should develop practical competence through music theory, musicianship, ensemble training, rehearsals, studio activities, stage performance and professional development.',
  'admissions@fjmusiccollege.edu',
  '+234 803 000 7890 / +44 20 7946 0192',
  'FJMUSIC Performance Campus, 14 Symphony Avenue, Victoria Island / London Outreach',
  TRUE,
  'Fall / Session 2026-2027',
  '2026-11-30',
  TRUE,
  '{"bankName": "First Heritage Bank", "accountName": "FJMUSIC College Academy Ltd", "accountNumber": "0129845721", "sortCode": "044-152"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  college_name = EXCLUDED.college_name,
  institutional_belief = EXCLUDED.institutional_belief;

-- Programmes
INSERT INTO public.programmes (
  id,
  title,
  slug,
  category,
  discipline,
  short_description,
  description,
  learning_objectives,
  duration,
  delivery_format,
  entry_requirements,
  practical_assessment,
  theoretical_assessment,
  tuition_fee,
  application_fee,
  currency,
  requires_audition,
  audition_requirements,
  featured
) VALUES 
(
  'a1111111-1111-1111-1111-111111111111',
  'Diploma in Voice and Vocal Performance',
  'diploma-voice-and-vocal-performance',
  'diploma',
  'Vocal Studies',
  'Rigorous vocal technique, diaphragm breath support, vocal registers, stylistic interpretation, and live concert delivery.',
  'The Diploma in Voice and Vocal Performance at FJMUSIC College trains singers to master their instrument from the biological foundations of phonation to high-pressure live stage delivery.',
  '["Master diaphragmatic breath control and pitch accuracy.", "Navigate vocal registers seamlessly between chest, mixed, and head voice.", "Develop stage presence, microphone control, and live performance delivery.", "Read complex vocal scores and sol-fa sight-singing."]'::jsonb,
  '1 Year (2 Semesters + Recital)',
  'Hybrid (Campus Studio & Online)',
  '["Successful vocal audition (2 contrasting songs).", "Basic pitch matching and interval test."]'::jsonb,
  'Weekly practice logs, mid-semester vocal jury, and a 45-minute live graduation recital before a faculty panel.',
  'Written examinations in Music Theory (Grade 5 equivalent), Aural Harmony, and Vocal Anatomy.',
  320000.00,
  15000.00,
  'NGN',
  TRUE,
  'Prepare two contrasting songs (one slow ballad, one mid/up-tempo). Audio or video upload or campus audition.',
  TRUE
),
(
  'a2222222-2222-2222-2222-222222222222',
  'Diploma in Keyboard / Piano Performance',
  'diploma-keyboard-piano',
  'diploma',
  'Keyboard Studies',
  'Classical technique meets modern harmony, advanced chord voicings, gospel runs, sight-reading, and synthesis.',
  'Bridges traditional classical virtuosity with contemporary improvisation, gospel re-harmonization, jazz voicings, and electronic keyboard sound design.',
  '["Master major, minor, and altered scales in all 12 keys.", "Execute 2-5-1 progressions and gospel passing chords.", "Read grand staff notation at sight.", "Program electronic synthesizers and MIDI rigs."]'::jsonb,
  '1 Year (2 Semesters)',
  'Hybrid (Campus Studio & Online)',
  '["Audition showing major/minor scales and 2 contrasting piano pieces.", "Sight-reading evaluation."]'::jsonb,
  'Practical technical exam (scales/arpeggios), live band rhythm comping evaluation, and final recital.',
  'Harmony and chord analysis paper, transcription analysis, and aural identification of intervals.',
  350000.00,
  15000.00,
  'NGN',
  TRUE,
  'Perform one classical or structured piece and one contemporary/gospel or jazz selection showing harmonic knowledge.',
  TRUE
),
(
  'a3333333-3333-3333-3333-333333333333',
  'Diploma in Music Production and Sound Engineering',
  'diploma-music-production',
  'diploma',
  'Audio Production',
  'DAW mastery, sound recording, microphone placement, acoustic design, mixing, mastering, and commercial release workflow.',
  'Turn creative musical ideas into radio-ready, streaming-grade records. Students train in our purpose-built recording studios with SSL-style consoles and analog outboard gear.',
  '["Master professional DAW workflows in Pro Tools and Logic Pro.", "Mic placement for acoustic drums, grand piano, and vocals.", "Surgical EQ, compression, saturation, and automation.", "Loudness standards and commercial mastering."]'::jsonb,
  '1 Year (Hands-on Studio Residency)',
  'Studio Masterclass',
  '["Submission of 2 original beats, songs, or rough audio recordings.", "Music aptitude interview."]'::jsonb,
  'Submission and live defense of a 3-track produced, mixed, and mastered commercial EP project.',
  'Audio engineering written examination on acoustics, signal flow, and dynamic processing.',
  380000.00,
  15000.00,
  'NGN',
  FALSE,
  'Portfolio upload of 2 musical ideas or production demos.',
  TRUE
),
(
  'a4444444-4444-4444-4444-444444444444',
  'Certificate in Note Reading, Scales & Key Signatures',
  'certificate-scales-and-key-signatures',
  'certificate',
  'Music Theory & Musicianship',
  'Unlock the language of music. Master the grand staff, Circle of Fifths, modal scales, and fluent note identification.',
  'Foundational certificate taking students from zero knowledge to fluent, confident note reading on treble and bass clefs, ledger lines, and the Circle of Fifths.',
  '["Read and identify all notes on the treble and bass staves in under 2 seconds.", "Construct all 12 major and minor scales.", "Apply the Circle of Fifths for instant modulation."]'::jsonb,
  '3 Months (12 Weeks)',
  'Hybrid (Campus Studio & Online)',
  '["Open to all learners. No prior music theory knowledge required."]'::jsonb,
  'Timed computer and keyboard note-naming tests, plus scale construction speed drills.',
  'Comprehensive 100-mark written theory examination covering clefs and key signatures.',
  95000.00,
  10000.00,
  'NGN',
  FALSE,
  NULL,
  FALSE
)
ON CONFLICT (id) DO NOTHING;

-- Courses
INSERT INTO public.courses (
  id,
  programme_id,
  code,
  title,
  instructor_name,
  description,
  level
) VALUES (
  'c1111111-1111-1111-1111-111111111111',
  'a1111111-1111-1111-1111-111111111111',
  'VOC-101',
  'Vocal Anatomy, Diaphragm Breath & Pure Tone',
  'Dr. Clara Adeleke',
  'Foundational vocal mechanics, healthy breath support, eliminating throat tension, and resonance placement.',
  'Foundational'
),
(
  'c2222222-2222-2222-2222-222222222222',
  'a4444444-4444-4444-4444-444444444444',
  'THY-101',
  'Rudiments of Music Theory: Staves, Clefs & Major Scales',
  'Prof. David Olumide',
  'Master reading standard musical notation, constructing all 12 major scales, and using the Circle of Fifths.',
  'Foundational'
)
ON CONFLICT (id) DO NOTHING;

-- Events
INSERT INTO public.events (
  id,
  title,
  slug,
  category,
  description,
  date,
  time,
  venue,
  delivery_format,
  capacity,
  registered_count,
  is_registration_open
) VALUES (
  'e1111111-1111-1111-1111-111111111111',
  'Annual FJMUSIC Gala Showcase: From Room to Arena',
  'annual-fjmusic-gala-showcase',
  'showcase',
  'Our flagship live concert presenting diploma and certificate graduating students performing with a 12-piece live orchestra and 40-voice college choir in the main concert auditorium.',
  '2026-11-28',
  '18:00 WAT',
  'Main Auditorium, FJMUSIC Performance Hall',
  'In-Person Concert Hall',
  650,
  420,
  TRUE
),
(
  'e2222222-2222-2222-2222-222222222222',
  'Masterclass: Gospel Re-Harmonization & 2-5-1 Voicings',
  'masterclass-gospel-reharmonization',
  'masterclass',
  'An intensive 3-hour practical keyboard workshop hosted by Prof. David Olumide dissecting altered chords and tritone substitutions on concert grand pianos.',
  '2026-11-08',
  '14:00 WAT',
  'Studio A Piano Theatre & Hybrid Stream',
  'Live Stream & Campus',
  120,
  94,
  TRUE
)
-- Faculty
INSERT INTO public.faculty (
  id,
  name,
  title,
  role,
  instruments,
  education,
  bio,
  teaching_philosophy,
  image_url,
  assigned_courses
) VALUES (
  'fac-1',
  'Dr. Clara Adeleke',
  'Director of Vocal Studies & Choral Pedagogy',
  'Director of Vocal Studies',
  '["Voice (Coloratura Soprano)", "Piano", "Choral Conducting"]'::jsonb,
  'PhD in Vocal Performance & Pedagogy (Royal Academy of Music, UK), MMus (UNILAG)',
  'With over 20 years of international concert stage experience and masterclass delivery across Europe and West Africa, Dr. Adeleke leads the vocal department at FJMUSIC College with an uncompromising emphasis on diaphragmatic vocal health, tone production, and emotional communicative depth.',
  'Singing is not shouting. True vocal power emerges from diaphragmatic relaxation, acoustic formant resonance, and truthful lyrical conviction.',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
  '["VOC-101", "VOC-201", "CHO-101"]'::jsonb
),
(
  'fac-2',
  'Prof. David Olumide',
  'Head of Keyboard Studies & Classical/Jazz Harmony',
  'Head of Keyboard Studies',
  '["Concert Grand Piano", "Hammond B3 Organ", "Workstation Synthesizers"]'::jsonb,
  'BMus (Trinity Laban Conservatoire), Fellow of the Royal Schools of Music (FRSM)',
  'Prof. Olumide is a virtuoso keyboardist renowned for seamlessly marrying Johann Sebastian Bach counterpoint with modern gospel and jazz harmonic substitutions. He has arranged for national symphony orchestras and directed high-profile music productions globally.',
  'Technique without harmonic understanding is robotic; harmony without technical discipline is chaotic. We train the hands and the mind simultaneously.',
  'https://images.unsplash.com/photo-1520523839898-507121c00dfa?auto=format&fit=crop&w=1200&q=80',
  '["THY-101", "KEY-101", "KEY-301"]'::jsonb
),
(
  'fac-3',
  'Marcus Vance',
  'Head of Music Production & Commercial Audio Engineering',
  'Head of Music Production',
  '["Analog Audio Consoles", "Drums & Percussion", "Logic Pro & Pro Tools"]'::jsonb,
  'BSc Audio Technology & Sound Design (Berklee College of Music Alumni)',
  'Marcus has mixed and mastered multi-platinum singles across Afrobeat, Gospel, and Contemporary Christian charts. At FJMUSIC College, he mentors students directly inside the acoustic live room and control suites on SSL consoles and analog outboard gear.',
  'Never mix with your eyes on computer screens—mix with your ears inside calibrated acoustic environments.',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
  '["PRD-101", "PRD-201"]'::jsonb
),
(
  'fac-4',
  'Pastor Emmanuel Eze',
  'Senior Lecturer in Contemporary Worship & Band Direction',
  'Lecturer in Contemporary Worship',
  '["Electric Bass", "Acoustic Guitar", "MainStage Rig Systems"]'::jsonb,
  'BA Music & Theology, Certified Ableton Live Specialist',
  'Pastor Eze has served as Music Director for international conferences of over 30,000 attendees. He coaches FJMUSIC students in the psychological, spiritual, and technical leadership of live stage teams, track playback, and seamless musical transitions.',
  'A great music director is invisible on stage—enabling every singer and instrumentalist to shine with flawless unity and dynamic control.',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
  '["CCM-101", "ENS-101"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 7. STORAGE BUCKETS (For Programme Materials, Auditions & Documents)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('programme-materials', 'programme-materials', true),
  ('audition-media', 'audition-media', false),
  ('student-documents', 'student-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public read for programme materials
CREATE POLICY "Public read programme materials" ON storage.objects
  FOR SELECT USING (bucket_id = 'programme-materials');

-- Storage RLS: Authenticated users upload to audition-media
CREATE POLICY "Users upload audition media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'audition-media' AND auth.uid() IS NOT NULL);
