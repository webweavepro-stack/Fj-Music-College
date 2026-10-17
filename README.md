# FJMUSIC COLLEGE & MUSIC LEARNING MANAGEMENT SYSTEM (LMS)

> **"FROM PRACTICE ROOM TO LIVE PERFORMANCE"**

A comprehensive, full-stack website and learning management system architected for **FJMUSIC College** — taking students from foundational music theory, sight-reading, and musicianship into hands-on studio tracking, ensemble rehearsals, and confident live stage performance.

---

## 1. Brand Identity & Visual Design System

The application design system is strictly derived from the official **FJMUSIC College** emblem:
- **Audio Equalizer Spectrum Crown:**
  - Deep Forest Olive (`#385723`)
  - Vibrant Acoustic Lime (`#84CC16`)
  - Warm Golden Amber (`#F59E0B`)
- **Typography:**
  - **Headings & Wordmarks:** `Poppins` (Bold, geometric sans-serif)
  - **Body Prose & Interface:** `Plus Jakarta Sans`
  - **Data, Metronome & Credentials:** Tabular monospace (`JetBrains Mono` / `font-mono`)
- **Anti-Slop Discipline:** Adheres strictly to the Frontend Design Constitution (zero unboxed pill clutter, no fake mechanical comment prefixes, strict 60-30-10 color allocation, balanced headlines, accessible WCAG AA contrast).

---

## 2. Implemented Features & Routing

### Public Web Experience
- **`/` (Homepage):** Complete institution hero, the 5-stage pathway (*Learn, Practise, Rehearse, Perform, Improve*), filterable programme catalogue, studio facilities showcase, distinguished faculty roster, upcoming recital schedule, verified student testimonials, and admissions CTA.
- **`/about`:** Core educational philosophy, conservatoire pedigree, values, and campus history.
- **`/programmes` & `/programmes/[slug]`:** Complete searchable catalogue covering:
  - **Diploma Programmes:** Voice & Vocal Performance, Keyboard/Piano, Music Production & Audio Engineering, Contemporary Christian Music & Music Direction.
  - **Certificate Programmes:** Note Reading & Clefs, Scales & Key Signatures, Tonic Sol-fa, Ear Training.
  - **Practical Residencies:** Band Rehearsals, SSL Console Tracking, Stage Microphone Technique.
  - *Dynamic detail pages feature learning objectives, multi-week syllabi, practical & theoretical assessment criteria, and tuition fees.*
- **`/admissions` & `/apply`:** Multi-step admissions workflow, document upload simulation, audition preference selection, and Paystack application fee checkout.
- **`/auditions`:** Audition guidelines, repertoire expectations, and tips by discipline.
- **`/practical-training`:** Practice suites, live band rehearsal pavilion, and SSL control rooms.
- **`/faculty`:** Full lecturer directory with credentials, bios, and teaching philosophies.
- **`/events` & `/events/[slug]`:** Live performance calendar with interactive ticket reservation and passcode generation.
- **`/gallery`:** Student concert recitals, choir sessions, and control room media archive.
- **`/contact`:** Campus address, contact info, and interactive visit booking form.
- **`/certificates/verify/[certificateNumber]`:** Public verification engine validating authentic certificates against the registry with printable PDF styling.
- **`/privacy`, `/terms`, `/refund-policy`:** Institutional governance and tuition policies.

### Student Portal (`/student/*`)
- **Dashboard:** Application tracker, enrolled courses, upcoming rehearsals, recent practice logs, jury marks.
- **Application:** Real-time admission status tracking (`submitted` $\to$ `under_review` $\to$ `audition_scheduled` $\to$ `accepted`).
- **Classroom (`/learn/[courseId]`):** Interactive LMS player with structured module hierarchy, downloadable resources, and:
  - **Web Audio Virtual Piano & Synthesizer:** Polyphonic keyboard playable via mouse/touch or keys `[A - K]` with octave shifting, timbre selectors, and Tonic Sol-fa labels (*Do, Re, Mi, Fa, Sol, La, Ti*).
  - **Practice Metronome:** Accurate Web Audio click engine with BPM slider (40-220), time signatures (2/4, 3/4, 4/4, 6/8), and visual beat pulse.
  - **Ear Training Interval Quiz:** Melodic interval recognition drills with live audio playback and scoring.
- **Practice Logs (`/student/practice`):** Daily practice logger with BPM, duration, objectives, challenges, and faculty feedback.
- **Assessments & Juries (`/student/assessments`):** Jury scores, classifications (Distinction/Merit), and rubric breakdowns.
- **Certificates (`/student/certificates`):** Issued credentials with direct verification links.
- **Payments (`/student/payments`):** Statement of account and Paystack fee checkout.

### Instructor Management (`/instructor/*`)
- **Dashboard:** Student submissions queue and assigned courses.
- **Practice Review Desk:** Listen to student practice sessions, award 1-5 star ratings, and provide guidance.
- **Jury Grading:** Enter assessment scores and qualitative jury feedback for vocal and instrumental hearings.

### Administrator Console (`/admin/*`)
- **Admissions Desk:** Approve or reject applications, schedule auditions, and record staff notes.
- **Programmes & Fees:** Configure tuition amounts and requirements.
- **Certificates Registry:** Consecrate and issue official certificates with custom numbers and celebration animation.
- **Bursary Reconciliation:** Real-time payment audit.
- **Security & Audit Logs:** Immutable audit trail of all sensitive operations.

---

## 3. Database Architecture (Supabase / PostgreSQL)

Database migrations and Row Level Security policies are located in:
`database/migrations/001_initial_schema.sql`

Key schemas:
- `profiles` (linked to `auth.users` with RBAC `applicant`, `student`, `instructor`, `admin`)
- `programmes`, `programme_modules`, `courses`, `course_modules`, `lessons`
- `applications` (with status lifecycle: `draft`, `submitted`, `under_review`, `audition_scheduled`, `accepted`, `rejected`)
- `enrollments`, `practice_logs`, `assessments`, `payments`, `certificates`, `audit_logs`

### Applying Migrations to Supabase:
1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor**.
3. Paste the contents of `database/migrations/001_initial_schema.sql` and run the script.
4. Copy your project URL and keys into your `.env` file.

---

## 4. Paystack Payment Integration

The application integrates with **Paystack**:
- Standard checkout modal supporting Debit/Credit Cards, Direct Bank Transfer, and USSD.
- Simulated test mode (`paystackTestMode: true`) enabled by default so reviewers can test payments without using real cards.
- To use live payments:
  1. Set `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY` in `.env`.
  2. Toggle off Test Mode in the `/admin/settings` panel.

---

## 5. Development & Deployment

### Local Development:
```bash
npm install
npm run dev
```

### Production Build:
```bash
npm run build
npm run lint
```
