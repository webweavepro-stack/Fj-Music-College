import {
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
} from '../types';

import heroImg from '../assets/images/hero_live_performance_concert_1792230599291.jpg';
import studioImg from '../assets/images/studio_recording_mixing_1792230600495.jpg';
import choirImg from '../assets/images/rehearsal_vocal_ensemble_1792230600440.jpg';
import pianoImg from '../assets/images/masterclass_piano_keys_1792230600753.jpg';

export const INITIAL_SETTINGS: SiteSettings = {
  collegeName: 'FJMUSIC College',
  slogan: 'FROM PRACTICE ROOM TO LIVE PERFORMANCE',
  institutionalBelief:
    'Music education should go beyond classroom theory. Students develop practical competence through music theory, musicianship, ensemble training, rehearsals, studio activities, stage performance and professional development.',
  contactEmail: 'admissions@fjmusiccollege.edu',
  contactPhone: '+234 907 861 6656 / +234 803 000 7890',
  campusAddress: 'FJMUSIC Performance Campus, 14 Symphony Avenue, Victoria Island / London Outreach',
  admissionOpen: true,
  currentTerm: 'Fall / Session 2026-2027',
  applicationDeadline: '2026-11-30',
  paystackPublicKey: 'pk_test_fjmusic_demo_paystack_public_key',
  paystackTestMode: true,
  enableLivePayments: true,
  bankDetails: {
    bankName: 'First Heritage Bank',
    accountName: 'FJMUSIC College Academy Ltd',
    accountNumber: '0129845721',
    sortCode: '044-152',
  },
};

export const INITIAL_PROGRAMMES: Programme[] = [
  // 1. DIPLOMA: Voice and Vocal Performance
  {
    id: 'prog-dip-vocal',
    title: 'Diploma in Voice and Vocal Performance',
    slug: 'diploma-voice-and-vocal-performance',
    category: 'diploma',
    discipline: 'Vocal Studies',
    shortDescription:
      'Rigorous vocal technique, diaphragm breath support, vocal registers, stylistic interpretation, and live concert delivery.',
    description:
      'The Diploma in Voice and Vocal Performance at FJMUSIC College trains singers to master their instrument from the biological foundations of phonation to high-pressure live stage delivery. Students engage in weekly one-on-one masterclasses, choral blend training, microphone technique, and live concert performances with professional band accompaniment.',
    learningObjectives: [
      'Master diaphragmatic breath control, support, and pitch accuracy across a 3-octave range.',
      'Navigate vocal registers seamlessly between chest, mixed, and head voice without strain.',
      'Develop stage presence, microphone control, in-ear monitor usage, and live performance delivery.',
      'Interpret classical, contemporary gospel, jazz, and soul vocal literature with idiomatic phrasing.',
      'Read complex vocal scores, sol-fa sight-singing, and harmonic ear training.',
    ],
    curriculum: [
      {
        id: 'mod-voc-1',
        title: 'Module 1: Phonation, Posture & Diaphragmatic Breath Foundations',
        durationWeeks: 6,
        description: 'Biological vocal health, posture alignment, breath management, and vocal resonance spaces.',
        topics: ['Laryngeal mechanics', 'Appoggio breathing technique', 'Resonance placement (Mask & Pharynx)', 'Vocal health and vocal cord hydration'],
      },
      {
        id: 'mod-voc-2',
        title: 'Module 2: Range Extension, Agility & Register Blending',
        durationWeeks: 6,
        description: 'Vocal runs, riffs, ornamentation, passagio navigation, and dynamic volume control.',
        topics: ['Blending chest voice into head voice', 'Vocal agility exercises in chromatic and pentatonic scales', 'Vibrato control and straight-tone mastery'],
      },
      {
        id: 'mod-voc-3',
        title: 'Module 3: Studio Phrasing, Mic Technique & Live Band Rehearsals',
        durationWeeks: 8,
        description: 'Microphone proximity effect, stage monitor acoustics, dynamics, and band leadership.',
        topics: ['Handheld vs stand microphone dynamics', 'Studio condenser mic vocal tracking', 'Ensemble harmonization and cueing the rhythm section'],
      },
      {
        id: 'mod-voc-4',
        title: 'Module 4: Graduation Recital & Concert Showcase',
        durationWeeks: 4,
        description: 'Preparation, choreography, staging, setlist curation, and public jury performance.',
        topics: ['Repertoire selection (4 contrasting styles)', 'Live concert performance with 5-piece band', 'Audio recording evaluation and jury review'],
      },
    ],
    duration: '1 Year (2 Semesters + Graduation Recital)',
    entryRequirements: [
      'Successful vocal audition (performance of 2 contrasting pieces: 1 contemporary/gospel and 1 classical/standard).',
      'Basic pitch matching and interval recognition test.',
      'Interview on musical aspirations and commitment to practice.',
    ],
    deliveryFormat: 'Hybrid (Campus Studio & Online)',
    practicalAssessment: 'Weekly practice logs, mid-semester vocal jury, and a 45-minute live graduation recital before a faculty panel.',
    theoreticalAssessment: 'Written examinations in Music Theory (Grade 5 equivalent), Aural Harmony, and Vocal Anatomy.',
    tuitionFee: 320000,
    applicationFee: 15000,
    currency: 'NGN',
    featured: true,
    coverImage: choirImg,
    requiresAudition: true,
    auditionRequirements: 'Prepare two contrasting songs (one slow ballad showcasing tone and control, one mid/up-tempo showcasing agility and energy). Audio or video upload or live campus audition.',
    relatedProgrammeSlugs: ['diploma-choral-music-and-management', 'certificate-vocal-training', 'diploma-contemporary-christian-music'],
  },

  // 2. DIPLOMA: Keyboard / Piano
  {
    id: 'prog-dip-keyboard',
    title: 'Diploma in Keyboard / Piano Performance',
    slug: 'diploma-keyboard-piano',
    category: 'diploma',
    discipline: 'Keyboard Studies',
    shortDescription:
      'Classical technique meets modern harmony, advanced chord voicings, gospel runs, sight-reading, and synthesis.',
    description:
      'Our Keyboard / Piano Diploma bridges traditional classical virtuosity with contemporary improvisation, gospel re-harmonization, jazz voicings, and electronic keyboard sound design. Students practise on concert acoustic pianos and workstation synthesizers, mastering chord substitutions, ensemble comping, and live stage band leadership.',
    learningObjectives: [
      'Master major, minor, diminished, and altered scales in all 12 keys with fluid 2-hand coordination.',
      'Execute 2-5-1 chord progressions, secondary dominants, and modern contemporary chord voicings.',
      'Fluently read lead sheets, grand staff notation, and chord charts at sight.',
      'Program electronic synthesizers, split layers, MIDI mapping, and stage workstation rigs.',
    ],
    curriculum: [
      {
        id: 'mod-key-1',
        title: 'Module 1: Classical Foundations, Hand Mechanics & Scale Mastery',
        durationWeeks: 6,
        description: 'Hanon and Czerny exercises, finger independence, touch dynamics, and posture.',
        topics: ['Equal finger dexterity', 'Legato and staccato touch', 'Scales and arpeggios across 4 octaves in all keys'],
      },
      {
        id: 'mod-key-2',
        title: 'Module 2: Contemporary Voicings & Gospel/Jazz Harmony',
        durationWeeks: 6,
        description: 'Rootless voicings, drop-2 voicings, tritone substitutions, and passing chords.',
        topics: ['Upper structure triads', 'Tritone substitution and gospel passing chords', 'Left-hand basslines and right-hand comping'],
      },
      {
        id: 'mod-key-3',
        title: 'Module 3: Stage Keyboard Technology & Band Interaction',
        durationWeeks: 6,
        description: 'Nord/Yamaha/Roland keyboard rigs, MainStage patch management, and rhythm section locking.',
        topics: ['Synthesizer sound design', 'MainStage live performance templates', 'Interlocking with drummer and bassist'],
      },
      {
        id: 'mod-key-4',
        title: 'Module 4: Solo Recital & Ensemble Jury',
        durationWeeks: 6,
        description: 'Polished performance of 1 classical prelude/sonata, 1 gospel arrangement, and 1 improvised jazz standard.',
        topics: ['Interpretation and nuance', 'Improvisation over changes', 'Formal faculty jury adjudication'],
      },
    ],
    duration: '1 Year (2 Semesters)',
    entryRequirements: [
      'Audition demonstrating major and minor scales (at least 2 octaves) and performance of two contrasting piano pieces.',
      'Sight-reading evaluation of standard treble and bass clef notation.',
    ],
    deliveryFormat: 'Hybrid (Campus Studio & Online)',
    practicalAssessment: 'Practical technical exam (scales/arpeggios), live band rhythm comping evaluation, and final recital.',
    theoreticalAssessment: 'Harmony and chord analysis paper, transcription analysis, and aural identification of intervals and chord qualities.',
    tuitionFee: 350000,
    applicationFee: 15000,
    currency: 'NGN',
    featured: true,
    coverImage: pianoImg,
    requiresAudition: true,
    auditionRequirements: 'Perform one classical or structured piece and one contemporary/gospel or jazz selection showing harmonic knowledge.',
    relatedProgrammeSlugs: ['certificate-scales-and-key-signatures', 'diploma-music-production', 'practical-band-rehearsals'],
  },

  // 3. DIPLOMA: Music Production
  {
    id: 'prog-dip-production',
    title: 'Diploma in Music Production and Sound Engineering',
    slug: 'diploma-music-production',
    category: 'diploma',
    discipline: 'Audio Production',
    shortDescription:
      'DAW mastery, sound recording, microphone placement, acoustic design, mixing, mastering, and commercial release workflow.',
    description:
      'Turn creative musical ideas into radio-ready, streaming-grade records. Students train in our purpose-built recording studios with SSL-style consoles, outboard analog gear, professional microphones, and leading DAWs (Logic Pro, Pro Tools, Ableton). From tracking live drums to vocal tuning and master buss processing, this diploma is deeply practical.',
    learningObjectives: [
      'Master professional DAW workflows in Pro Tools and Logic Pro with fast shortcuts and templates.',
      'Select and position dynamic, condenser, and ribbon microphones for acoustic drums, grand piano, and vocals.',
      'Apply surgical and musical EQ, compression, saturation, reverb, and automation to create balanced mixes.',
      'Understand acoustics, room reflection, stereo imaging, and loudness standards for Spotify and Apple Music.',
    ],
    curriculum: [
      {
        id: 'mod-prod-1',
        title: 'Module 1: Acoustic Physics & Studio Hardware Architecture',
        durationWeeks: 6,
        description: 'Signal flow, audio interfaces, preamp impedance, monitor calibration, and acoustic treatment.',
        topics: ['Decibels and frequency spectrum', 'Microphone polar patterns and proximity effect', 'Studio patch bays and cable wiring'],
      },
      {
        id: 'mod-prod-2',
        title: 'Module 2: Live Tracking & Multi-Track Studio Sessions',
        durationWeeks: 6,
        description: 'Tracking live drum kits (Glyn Johns and multi-mic setups), guitars, and vocalists in the booth.',
        topics: ['Drum mic phase alignment', 'Gain staging for tracking', 'Headphone cue mixes and vocal coaching'],
      },
      {
        id: 'mod-prod-3',
        title: 'Module 3: Advanced Mixing & Vocal Production',
        durationWeeks: 6,
        description: 'Vocal pitch correction, parallel compression, space design, sidechaining, and automation.',
        topics: ['Melodyne / Auto-tune natural tuning', 'Mix bus glue compression', 'Depth and stereo width control'],
      },
      {
        id: 'mod-prod-4',
        title: 'Module 4: Mastering & EP Portfolio Production',
        durationWeeks: 6,
        description: 'Production of a 3-track EP, LUFS metering, dithering, stems creation, and metadata export.',
        topics: ['Linear phase EQ and true peak limiters', 'Delivery specifications for streaming platforms', 'Commercial release portfolio'],
      },
    ],
    duration: '1 Year (Hands-on Studio Residency)',
    entryRequirements: [
      'Submission of 2 original beats, songs, or rough audio recordings demonstrating existing musical or technical curiosity.',
      'Basic computer literacy and music aptitude interview.',
    ],
    deliveryFormat: 'Studio Masterclass',
    practicalAssessment: 'Submission and live defense of a 3-track produced, mixed, and mastered commercial EP project.',
    theoreticalAssessment: 'Audio engineering written examination on acoustics, signal flow, Nyquist theorem, and dynamic processing.',
    tuitionFee: 380000,
    applicationFee: 15000,
    currency: 'NGN',
    featured: true,
    coverImage: studioImg,
    requiresAudition: false,
    auditionRequirements: 'Portfolio upload of 2 musical ideas or production demos (WAV, MP3, or streaming link).',
    relatedProgrammeSlugs: ['practical-recording-and-mixing', 'certificate-basic-music-technology', 'diploma-keyboard-piano'],
  },

  // 4. DIPLOMA: Contemporary Christian Music & Worship Leadership
  {
    id: 'prog-dip-ccm',
    title: 'Diploma in Contemporary Christian Music & Music Direction',
    slug: 'diploma-contemporary-christian-music',
    category: 'diploma',
    discipline: 'Church Music & Direction',
    shortDescription:
      'Train as an elite music director: vocal team arrangement, rhythm section steering, click & track systems, and liturgy.',
    description:
      'Designed specifically for music directors, worship leaders, and contemporary Christian instrumentalists. This diploma addresses the unique musical, technological, and spiritual dynamics of leading large worship teams, orchestrating multi-part vocal ensembles, running Ableton live tracks and click systems, and executing seamless service transitions.',
    learningObjectives: [
      'Direct large vocal and instrumental teams with clear hand conducting and verbal cues.',
      'Arrange modern hymnody and contemporary worship songs with rich vocal harmonies and transitions.',
      'Build and operate Ableton Live playback rigs with click, guide cues, and automated patch changes.',
      'Foster rehearsal discipline, effective stage communication, and band dynamics.',
    ],
    curriculum: [
      {
        id: 'mod-ccm-1',
        title: 'Module 1: The Role of the Modern Music Director',
        durationWeeks: 6,
        description: 'Leadership psychology, rehearsal time management, vocal coaching, and chart writing.',
        topics: ['Nashville Number System', 'Arranging for 3-part vocal teams (Soprano, Alto, Tenor)', 'Conducting rhythm sections'],
      },
      {
        id: 'mod-ccm-2',
        title: 'Module 2: Worship Technology & Playback Systems',
        durationWeeks: 6,
        description: 'Running Multitracks, Prime, and Ableton Live with redundant audio interfaces.',
        topics: ['In-ear monitor mix setups', 'Click and cue vocal programming', 'MIDI patch automation for keys and guitars'],
      },
      {
        id: 'mod-ccm-3',
        title: 'Module 3: Live Rehearsal Intensive & Band Chemistry',
        durationWeeks: 6,
        description: 'Weekly rehearsals running full-band worship sets with live feedback and audio analysis.',
        topics: ['Dynamic transitions between songs', 'Managing stage volume and acoustic bleed', 'Spontaneous worship vamps and chord cycles'],
      },
      {
        id: 'mod-ccm-4',
        title: 'Module 4: Live Concert / Night of Worship Capstone',
        durationWeeks: 6,
        description: 'Full-scale production of a 60-minute live worship concert directing the FJMUSIC ensemble.',
        topics: ['Set design and lighting cues', 'Live multitrack recording', 'Post-performance evaluation'],
      },
    ],
    duration: '1 Year (2 Semesters)',
    entryRequirements: [
      'Audition demonstrating proficiency on either primary instrument (Keys, Bass, Drums, Guitar) or primary voice.',
      'Letter of recommendation from a church pastor, music director, or community music leader.',
    ],
    deliveryFormat: 'Hybrid (Campus Studio & Online)',
    practicalAssessment: 'Directing a 30-minute live band and vocal ensemble set before faculty examiners.',
    theoreticalAssessment: 'Score arrangement paper in Nashville numbers and standard notation, plus theology of church music history.',
    tuitionFee: 310000,
    applicationFee: 15000,
    currency: 'NGN',
    featured: true,
    coverImage: heroImg,
    requiresAudition: true,
    auditionRequirements: 'Demonstrate leadership of one worship song on your primary instrument or voice, explaining your arrangement choices.',
    relatedProgrammeSlugs: ['diploma-voice-and-vocal-performance', 'diploma-choral-music-and-management', 'practical-band-rehearsals'],
  },

  // 5. CERTIFICATE: Note Reading, Scales and Key Signatures
  {
    id: 'prog-cert-scales',
    title: 'Certificate in Note Reading, Scales & Key Signatures',
    slug: 'certificate-scales-and-key-signatures',
    category: 'certificate',
    discipline: 'Music Theory & Musicianship',
    shortDescription:
      'Unlock the language of music. Master the grand staff, Circle of Fifths, modal scales, and fluent note identification.',
    description:
      'Never be intimidated by sheet music again. This foundational certificate takes students from zero knowledge to fluent, confident note reading on treble and bass clefs, complete mastery of all 12 major and minor key signatures, ledger lines, and the Circle of Fifths.',
    learningObjectives: [
      'Read and identify all notes on the treble and bass staves including ledger lines in under 2 seconds.',
      'Construct and recite all 12 major, natural minor, harmonic minor, and melodic minor scales with correct key signatures.',
      'Apply the Circle of Fifths for instant modulation and chord transposition.',
      'Transcribe short melodic dictations from ear to staff accurately.',
    ],
    curriculum: [
      {
        id: 'mod-sks-1',
        title: 'Module 1: The Grand Staff, Clefs & Pitch Architecture',
        durationWeeks: 4,
        description: 'Staff mechanics, clefs, accidentals, and pitch spatial awareness.',
        topics: ['Treble clef notes and mnemonic systems', 'Bass clef notes and middle C anchor', 'Sharp, flat, natural, and enharmonic equivalents'],
      },
      {
        id: 'mod-sks-2',
        title: 'Module 2: Major Scales & The Circle of Fifths',
        durationWeeks: 4,
        description: 'The W-W-H-W-W-W-H formula, sharp keys order (FCGDAEB), flat keys order (BEADGCF).',
        topics: ['Building major scales on any starting pitch', 'Memorizing key signatures with the Circle of Fifths', 'Relative and parallel minor relationships'],
      },
      {
        id: 'mod-sks-3',
        title: 'Module 3: Minor Scale Variants & Modal Introductions',
        durationWeeks: 4,
        description: 'Natural, harmonic (raised 7th), and melodic (raised 6th & 7th ascending) scales.',
        topics: ['Constructing harmonic minor scales', 'Melodic minor voice leading', 'Dorian, Mixolydian, and Pentatonic scales'],
      },
    ],
    duration: '3 Months (12 Weeks)',
    entryRequirements: ['Open to all learners. No prior music theory knowledge required. Passion and dedication to study are essential.'],
    deliveryFormat: 'Hybrid (Campus Studio & Online)',
    practicalAssessment: 'Timed computer and keyboard note-naming tests, plus scale construction speed drills.',
    theoreticalAssessment: 'Comprehensive 100-mark written theory examination covering clefs, key signatures, and scale writing.',
    tuitionFee: 95000,
    applicationFee: 10000,
    currency: 'NGN',
    featured: false,
    coverImage: pianoImg,
    requiresAudition: false,
    relatedProgrammeSlugs: ['certificate-tonic-sol-fa', 'certificate-ear-training', 'diploma-keyboard-piano'],
  },

  // 6. CERTIFICATE: Tonic Sol-fa and Ear Training
  {
    id: 'prog-cert-solfa',
    title: 'Certificate in Tonic Sol-fa and Ear Training',
    slug: 'certificate-tonic-sol-fa',
    category: 'certificate',
    discipline: 'Aural Musicianship',
    shortDescription:
      'Internalize pitches, sight-sing with ease, and transcribe melodies and chords directly from hearing.',
    description:
      'Tonic Sol-fa (Do, Re, Mi, Fa, Sol, La, Ti) is the proven secret to developing relative pitch and instinctive musicality. This certificate equips singers, choir directors, and instrumentalists to hear a melody and immediately know the notes, sing accurately without accompaniment, and recognize chord progressions by ear.',
    learningObjectives: [
      'Sight-sing unfamiliar melodies at sight using Curwen hand signs and Tonic Sol-fa syllables.',
      'Identify harmonic intervals (unison to octave) and chord qualities (major, minor, augmented, diminished) by ear.',
      'Hear and transcribe rhythm and melody from live performances onto paper without guessing.',
      'Transposition across different movable Do tonic centers.',
    ],
    curriculum: [
      {
        id: 'mod-sol-1',
        title: 'Module 1: The Movable Do System & Curwen Hand Signs',
        durationWeeks: 4,
        description: 'Diatonic steps, interval feel, mental pitch retention, and vocal pitching.',
        topics: ['D-R-M-F-S-L-T-D relationships', 'Curwen physical hand signs for pitch connection', 'Pentatonic and diatonic vocal drills'],
      },
      {
        id: 'mod-sol-2',
        title: 'Module 2: Chromatic Sol-fa & Modulations',
        durationWeeks: 4,
        description: 'Fe, Se, Ta, De chromatic syllables and navigating key changes.',
        topics: ['Sharpened and flattened syllables (Di, Ri, Fi, Si, Li / Ra, Ma, Sa, Ta)', 'Modulating to the dominant (Do becomes Sol)', 'Aural identification of 2-part polyphony'],
      },
      {
        id: 'mod-sol-3',
        title: 'Module 3: Dictation, Chord Recognition & Harmonization',
        durationWeeks: 4,
        description: 'Hearing chord progressions (I-IV-V, I-vi-IV-V, ii-V-I) and transcribing on the fly.',
        topics: ['Melodic dictation in 4/4 and 3/4', 'Bass movement detection in chord changes', 'Instant 3-part vocal harmony generation from ear'],
      },
    ],
    duration: '3 Months (12 Weeks)',
    entryRequirements: ['Open to singers, instrumentalists, and enthusiasts who can hold a steady pitch.'],
    deliveryFormat: 'Hybrid (Campus Studio & Online)',
    practicalAssessment: 'Live sight-singing test using unseen Sol-fa scores and aural interval identification exam.',
    theoreticalAssessment: 'Aural dictation examination (melodic transcription and harmonic progression mapping).',
    tuitionFee: 90000,
    applicationFee: 10000,
    currency: 'NGN',
    featured: false,
    coverImage: choirImg,
    requiresAudition: false,
    relatedProgrammeSlugs: ['certificate-scales-and-key-signatures', 'certificate-vocal-training', 'diploma-voice-and-vocal-performance'],
  },

  // 7. PRACTICAL TRAINING: Band Rehearsals and Stage Performance
  {
    id: 'prog-prac-band',
    title: 'Practical Band Rehearsals and Stage Performance',
    slug: 'practical-band-rehearsals',
    category: 'practical',
    discipline: 'Live Performance',
    shortDescription:
      'Step out of the bedroom into the live band arena. Rehearse with real musicians, master stage presence, and command an audience.',
    description:
      'Nothing replaces the adrenaline and precision of rehearsing and performing with a live rhythm section. In this hands-on residency, instrumentalists and vocalists form bands under faculty coaching, learning how to count in, transition between tempos, balance stage monitors, handle mistakes gracefully, and electrify a live audience.',
    learningObjectives: [
      'Lock in rhythmically with drums and bass with unwavering pocket and groove.',
      'Communicate non-verbally on stage through cues, eye contact, and head nods.',
      'Master wireless microphones, in-ear monitors, stage DI boxes, and amplifier gain settings.',
      'Develop genuine stage charisma, audience engagement, and performance storytelling.',
    ],
    curriculum: [
      {
        id: 'mod-band-1',
        title: 'Session 1: Band Chemistry, Stage Ergonomics & Soundcheck Discipline',
        durationWeeks: 4,
        description: 'Setting up instruments, running an efficient 15-minute soundcheck, and EQ balance.',
        topics: ['Stage positioning and acoustic reflections', 'Soundcheck protocol with front-of-house engineer', 'Managing stage volume to prevent muddy sound'],
      },
      {
        id: 'mod-band-2',
        title: 'Session 2: Rhythm Section Pocket & Vocal Locking',
        durationWeeks: 4,
        description: 'Tight grooves, tight stops, dynamic builds, and vocal harmonization over live instruments.',
        topics: ['The kick and bass relationship', 'Guitar and keyboard frequency separation', 'Punchy hits and dramatic musical drops'],
      },
      {
        id: 'mod-band-3',
        title: 'Session 3: Live College Showcase Performance',
        durationWeeks: 4,
        description: 'Final rehearsal runs leading to a live public ticketed concert at the FJMUSIC Auditorium.',
        topics: ['Full 30-minute high-energy set', 'Lighting cues and stage entrances/exits', 'Post-show video analysis and faculty feedback'],
      },
    ],
    duration: '6 Weeks Intensive (Weekend & Evening Sessions)',
    entryRequirements: ['Demonstrated intermediate capability on your instrument or voice. Audition or recommendation required.'],
    deliveryFormat: 'On-Campus Intensive',
    practicalAssessment: 'Full live band concert performance evaluated on pocket, stage presence, musical accuracy, and audience rapport.',
    theoreticalAssessment: 'Written review and self-critique of filmed concert footage.',
    tuitionFee: 120000,
    applicationFee: 10000,
    currency: 'NGN',
    featured: true,
    coverImage: heroImg,
    requiresAudition: true,
    auditionRequirements: 'Video or live performance of one song with backing track or accompaniment showing rhythm consistency.',
    relatedProgrammeSlugs: ['diploma-voice-and-vocal-performance', 'diploma-keyboard-piano', 'practical-recording-and-mixing'],
  },

  // 8. PRACTICAL TRAINING: Studio Recording, Mixing and Sound Engineering
  {
    id: 'prog-prac-recording',
    title: 'Practical Studio Recording, Mixing & Microphone Technique',
    slug: 'practical-recording-and-mixing',
    category: 'practical',
    discipline: 'Studio Engineering',
    shortDescription:
      'Hands-on console time: tracking real bands in the studio, vocal production, analog compression, and mixing workflows.',
    description:
      'Skip the boring theoretical lectures and get behind the mixing desk. Spend 40+ hours in our professional control room and live tracking room. Students track real drummers, acoustic pianos, brass sections, and vocalists, learning the real-world studio pressure of running sessions, setting monitor mixes, and turning multi-tracks into release-ready masters.',
    learningObjectives: [
      'Wire and operate analog and digital audio consoles, patch bays, and outboard preamps.',
      'Apply proper microphone techniques including spaced pair, XY, Mid-Side, and close-miking.',
      'Edit, comp, and tune vocal performances transparently in modern DAWs.',
      'Build balanced, punchy mixes that translate across car stereos, phones, and club sound systems.',
    ],
    curriculum: [
      {
        id: 'mod-rec-1',
        title: 'Studio Intensive 1: Live Tracking in the Live Room',
        durationWeeks: 3,
        description: 'Mic placement on drums, bass amps, acoustic guitars, and vocal booth.',
        topics: ['Acoustic isolation', 'Multi-microphone phase relationship testing', 'Setting up low-latency artist headphone mixes'],
      },
      {
        id: 'mod-rec-2',
        title: 'Studio Intensive 2: The Art of the Mixdown',
        durationWeeks: 3,
        description: 'Faders-up balance, spatial pan positioning, EQ carving, and dynamic saturation.',
        topics: ['Low-end management (kick and sub-bass clarity)', 'Parallel drum processing', 'Vocal riding and automated delays'],
      },
    ],
    duration: '6 Weeks (Hands-on Studio Rotations)',
    entryRequirements: ['Basic familiarity with any digital audio workstation or computer audio.'],
    deliveryFormat: 'Studio Masterclass',
    practicalAssessment: 'Live in-studio tracking test (30 minutes to mic up and capture a vocalist and acoustic guitar) and final mixed track submission.',
    theoreticalAssessment: 'Console signal flow schematic walkthrough with chief engineer.',
    tuitionFee: 140000,
    applicationFee: 10000,
    currency: 'NGN',
    featured: false,
    coverImage: studioImg,
    requiresAudition: false,
    relatedProgrammeSlugs: ['diploma-music-production', 'practical-band-rehearsals', 'certificate-basic-music-technology'],
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-voc-101',
    programmeId: 'prog-dip-vocal',
    code: 'VOC-101',
    title: 'Vocal Anatomy, Diaphragm Breath & Pure Tone',
    instructorId: 'fac-1',
    instructorName: 'Dr. Clara Adeleke',
    description: 'Foundational vocal mechanics, healthy breath support, eliminating throat tension, and resonance placement.',
    level: 'Foundational',
    totalLessons: 4,
    modules: [
      {
        id: 'cmod-voc-1',
        courseId: 'course-voc-101',
        order: 1,
        title: 'Section 1: The Vocal Instrument & Posture',
        lessons: [
          {
            id: 'les-voc-1',
            moduleId: 'cmod-voc-1',
            title: 'Lesson 1: The Physiology of Phonation & Breathing Mechanism',
            durationMinutes: 25,
            type: 'written_theory',
            summary: 'Understand the vocal folds, laryngeal tilt, diaphragm expansion, and how air converts into sound waves.',
            content: `### Welcome to Vocal Anatomy & Technique at FJMUSIC College

The human voice is the only instrument constructed from living tissue. Unlike a piano or guitar where you can observe hammers striking strings, vocal sound production occurs invisibly within the larynx.

#### 1. The Three Primary Components of the Vocal Mechanism
- **The Actuator (Breath Support):** The lungs, diaphragm, and intercostal muscles provide regulated air pressure.
- **The Vibrator (Phonation):** The true vocal folds (vocal cords) inside the thyroid cartilage vibrate together through the Bernoulli effect.
- **The Resonators (Acoustic Filter):** The pharynx, oral cavity, nasal cavity, and sinuses shape the raw buzzing sound into warm, intelligible tone.

#### 2. The Appoggio Breathing Technique
Appoggio (from the Italian *appoggiare*, meaning "to lean") is the classical benchmark for professional singing across both classical and contemporary genres.
- As you inhale through relaxed lips and soft palate, allow your lower abdomen and flank ribs to expand outward naturally.
- Keep shoulders relaxed and collarbones stable—never raise your shoulders on an inhalation.
- Maintain the feeling of inhalation even as you sing to avoid sudden breath collapse.`,
            resources: [
              {
                id: 'res-voc-1',
                title: 'FJMUSIC Vocal Anatomy & Breathing Guide (PDF)',
                type: 'pdf',
                size: '2.4 MB',
                downloadUrl: '#download-vocal-guide',
              },
            ],
            exercisePrompt: 'Perform 10 cycles of 4-second inhalation, 4-second gentle suspension, and 16-second even hissing exhalation on "ssss". Record your practice in your student practice log.',
          },
          {
            id: 'les-voc-2',
            moduleId: 'cmod-voc-1',
            title: 'Lesson 2: Daily Warm-Up Routine & Lip Trills',
            durationMinutes: 30,
            type: 'vocal_exercise',
            summary: 'Semi-occluded vocal tract (SOVT) exercises to awaken the voice gently without strain.',
            content: `### Semi-Occluded Vocal Tract (SOVT) Training

Semi-occluded vocal tract exercises create back-pressure at the lips, which stabilizes the vocal folds and encourages efficient vibration without muscular tension.

#### Exercise 1: Lip Trills / Bubbles
- Relax your cheeks and gently vibrate your lips together while producing a soft pitch.
- Slide up and down an octave on a 5-tone scale (1-2-3-4-5-4-3-2-1).
- Feel the vibration tickling your lips; notice that your throat feels completely relaxed.

#### Exercise 2: Straw Phonation
- Phonate through a narrow coffee straw into a half-filled glass of water.
- Observe consistent water bubbling without splashing—this indicates smooth, steady air pressure.`,
            audioSample: {
              title: 'Lip Trill 5-Tone Exercise (Key of C Major)',
              keySignature: 'C Major',
              bpm: 92,
              audioFrequencies: [261.63, 293.66, 329.63, 349.23, 392.0],
            },
            sheetMusicSnippet: 'C4 D4 E4 F4 G4 F4 E4 D4 C4',
            resources: [
              {
                id: 'res-voc-2',
                title: 'Daily SOVT Vocal Workout Audio Backing (MP3)',
                type: 'mp3',
                size: '8.1 MB',
                downloadUrl: '#download-sovt-audio',
              },
            ],
            exercisePrompt: 'Record a 2-minute video or audio practice log demonstrating your 5-tone lip trill exercise from A3 up to E5.',
          },
        ],
      },
      {
        id: 'cmod-voc-2',
        courseId: 'course-voc-101',
        order: 2,
        title: 'Section 2: Resonance & Microphone Technique',
        lessons: [
          {
            id: 'les-voc-3',
            moduleId: 'cmod-voc-2',
            title: 'Lesson 3: Finding Pharyngeal Space and "The Mask"',
            durationMinutes: 35,
            type: 'audio_example',
            summary: 'Learn how to shape vowel formants to achieve projection that cuts through live drums without shouting.',
            content: `### Formant Tuning & The Singer's Formant

To be heard over a loud contemporary rhythm section, singers do not push more volume—they tune their acoustic resonators to produce the "Singer's Formant" (between 2.8 kHz and 3.4 kHz).

#### The "Yawn-Sigh" Sensation
- Lower the larynx slightly to create warmth and depth (preventing that thin, pinched sound).
- Lift the soft palate (the soft tissue at the back of the roof of your mouth) as if stifling a yawn.
- Phonate on "NG" (as in *sing*), then transition smoothly into pure vowels: "MEE", "MAY", "MAH", "MOH", "MOO".`,
            resources: [
              {
                id: 'res-voc-3',
                title: 'Vowel Modification Chart for High Register (PDF)',
                type: 'pdf',
                size: '1.2 MB',
                downloadUrl: '#vowel-chart',
              },
            ],
          },
          {
            id: 'les-voc-4',
            moduleId: 'cmod-voc-2',
            title: 'Lesson 4: Microphone Proximity, Gain & Stage Dynamics',
            durationMinutes: 40,
            type: 'video_demonstration',
            summary: 'Essential live sound skills: proximity effect, preventing plosives, and handling stage monitors.',
            content: `### Live Stage Microphone Technique

Your microphone is the primary electronic transducer between your vocal cords and the audience's ears.

#### Golden Rules of Stage Microphone Usage
1. **Angle:** Hold the microphone at a 45-degree angle pointing directly at your upper lip, 2 to 3 cm from your mouth.
2. **Never "Cup" the Grille:** Cupping your hand over the microphone capsule turns a cardioid mic into an omnidirectional mic, instantly triggering ear-splitting audio feedback!
3. **Proximity Effect:** Bringing the mic closer boosts low frequencies (adds warmth for quiet ballads). Backing away 10–15 cm during high-energy belting prevents audio clipping.`,
            resources: [
              {
                id: 'res-voc-4',
                title: 'FJMUSIC Stage Performance Checklist (PDF)',
                type: 'pdf',
                size: '950 KB',
                downloadUrl: '#mic-checklist',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'course-thy-101',
    programmeId: 'prog-cert-scales',
    code: 'THY-101',
    title: 'Rudiments of Music Theory: Staves, Clefs & Major Scales',
    instructorId: 'fac-2',
    instructorName: 'Prof. David Olumide',
    description: 'Master reading standard musical notation, constructing all 12 major scales, and using the Circle of Fifths.',
    level: 'Foundational',
    totalLessons: 3,
    modules: [
      {
        id: 'cmod-thy-1',
        courseId: 'course-thy-101',
        order: 1,
        title: 'Module 1: The Architecture of Musical Pitch',
        lessons: [
          {
            id: 'les-thy-1',
            moduleId: 'cmod-thy-1',
            title: 'Lesson 1: The Treble and Bass Staves & Ledger Lines',
            durationMinutes: 30,
            type: 'written_theory',
            summary: 'Learn the exact location of every pitch on the 5 lines and 4 spaces of both clefs.',
            content: `### The Musical Staff

Music is written on a five-line staff. Line numbers count from bottom to top (Line 1 is the lowest, Line 5 is the highest).

#### The Treble Clef (G Clef)
- Lines: **E - G - B - D - F** (*Every Good Boy Deserves Favor*)
- Spaces: **F - A - C - E** (*Spells FACE*)

#### The Bass Clef (F Clef)
- Lines: **G - B - D - F - A** (*Good Boys Do Fine Always*)
- Spaces: **A - C - E - G** (*All Cows Eat Grass*)

#### Middle C (C4)
Middle C sits on a single ledger line right between the Treble and Bass clefs, creating the 11-line Grand Staff.`,
            sheetMusicSnippet: 'C4 D4 E4 F4 G4 A4 B4 C5',
            resources: [
              {
                id: 'res-thy-1',
                title: 'Clef Reading Flashcard Workbook (PDF)',
                type: 'pdf',
                size: '3.1 MB',
                downloadUrl: '#flashcards',
              },
            ],
          },
          {
            id: 'les-thy-2',
            moduleId: 'cmod-thy-1',
            title: 'Lesson 2: The Major Scale Formula (W-W-H-W-W-W-H)',
            durationMinutes: 35,
            type: 'sheet_music',
            summary: 'How semitones and whole tones construct every major scale in existence.',
            content: `### Constructing the Major Scale

A scale is an organized ladder of pitches. Every major scale follows an identical sequence of Whole steps (W = 2 semitones) and Half steps (H = 1 semitone):

$$\\text{Root} \\xrightarrow{W} 2 \\xrightarrow{W} 3 \\xrightarrow{H} 4 \\xrightarrow{W} 5 \\xrightarrow{W} 6 \\xrightarrow{W} 7 \\xrightarrow{H} 8$$

Notice that half steps occur strictly between degrees **3-4** and **7-8**.

#### Example: C Major
- C to D = Whole (W)
- D to E = Whole (W)
- E to F = Half (H) - *natural half step between white keys*
- F to G = Whole (W)
- G to A = Whole (W)
- A to B = Whole (W)
- B to C = Half (H) - *natural half step between white keys*`,
            sheetMusicSnippet: 'C4 D4 E4 F4 G4 A4 B4 C5',
            resources: [
              {
                id: 'res-thy-2',
                title: 'All 12 Major Scales Chart in Treble & Bass (PDF)',
                type: 'pdf',
                size: '1.8 MB',
                downloadUrl: '#scales-chart',
              },
            ],
          },
          {
            id: 'les-thy-3',
            moduleId: 'cmod-thy-1',
            title: 'Lesson 3: The Circle of Fifths & Key Signatures',
            durationMinutes: 40,
            type: 'written_theory',
            summary: 'The geometric map of harmony: navigating sharps, flats, and relative keys.',
            content: `### The Circle of Fifths

The Circle of Fifths is the harmonic GPS for every musician, arranger, and composer.

#### Clockwise (Adding Sharps by ascending 5ths):
- C (0 sharps)
- G (1 sharp: F#)
- D (2 sharps: F#, C#)
- A (3 sharps: F#, C#, G#)
- E (4 sharps: F#, C#, G#, D#)
- B (5 sharps: F#, C#, G#, D#, A#)
- F# (6 sharps: F#, C#, G#, D#, A#, E#)
- C# (7 sharps: all notes sharped)

**Order of Sharps:** Father Charles Goes Down And Ends Battle (F - C - G - D - A - E - B).
**Order of Flats:** Battle Ends And Down Goes Charles' Father (B - E - A - D - G - C - F).`,
            resources: [
              {
                id: 'res-thy-3',
                title: 'High-Resolution Circle of Fifths Reference Poster',
                type: 'pdf',
                size: '4.2 MB',
                downloadUrl: '#circle-poster',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const INITIAL_FACULTY: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Clara Adeleke',
    title: 'Director of Vocal Studies & Choral Pedagogy',
    role: 'Director of Vocal Studies',
    instruments: ['Voice (Coloratura Soprano)', 'Piano', 'Choral Conducting'],
    education: 'PhD in Vocal Performance & Pedagogy (Royal Academy of Music, UK), MMus (UNILAG)',
    bio: 'With over 20 years of international concert stage experience and masterclass delivery across Europe and West Africa, Dr. Adeleke leads the vocal department at FJMUSIC College with an uncompromising emphasis on diaphragmatic vocal health, tone production, and emotional communicative depth.',
    teachingPhilosophy:
      'Singing is not shouting. True vocal power emerges from diaphragmatic relaxation, acoustic formant resonance, and truthful lyrical conviction.',
    image: choirImg,
    assignedCourses: ['VOC-101', 'VOC-201', 'CHO-101'],
  },
  {
    id: 'fac-2',
    name: 'Prof. David Olumide',
    title: 'Head of Keyboard Studies & Classical/Jazz Harmony',
    role: 'Head of Keyboard Studies',
    instruments: ['Concert Grand Piano', 'Hammond B3 Organ', 'Workstation Synthesizers'],
    education: 'BMus (Trinity Laban Conservatoire), Fellow of the Royal Schools of Music (FRSM)',
    bio: 'Prof. Olumide is a virtuoso keyboardist renowned for seamlessly marrying Johann Sebastian Bach counterpoint with modern gospel and jazz harmonic substitutions. He has arranged for national symphony orchestras and directed high-profile music productions globally.',
    teachingPhilosophy:
      'Technique without harmonic understanding is robotic; harmony without technical discipline is chaotic. We train the hands and the mind simultaneously.',
    image: pianoImg,
    assignedCourses: ['THY-101', 'KEY-101', 'KEY-301'],
  },
  {
    id: 'fac-3',
    name: 'Marcus Vance',
    title: 'Head of Music Production & Commercial Audio Engineering',
    role: 'Head of Music Production',
    instruments: ['Analog Audio Consoles', 'Drums & Percussion', 'Logic Pro & Pro Tools'],
    education: 'BSc Audio Technology & Sound Design (Berklee College of Music Alumni)',
    bio: 'Marcus has mixed and mastered multi-platinum singles across Afrobeat, Gospel, and Contemporary Christian charts. At FJMUSIC College, he mentors students directly inside the acoustic live room and control suites on SSL consoles and analog outboard gear.',
    teachingPhilosophy:
      'Never mix with your eyes on computer screens—mix with your ears inside calibrated acoustic environments.',
    image: studioImg,
    assignedCourses: ['PRD-101', 'PRD-201'],
  },
  {
    id: 'fac-4',
    name: 'Pastor Emmanuel Eze',
    title: 'Senior Lecturer in Contemporary Worship & Band Direction',
    role: 'Lecturer in Contemporary Worship',
    instruments: ['Electric Bass', 'Acoustic Guitar', 'MainStage Rig Systems'],
    education: 'BA Music & Theology, Certified Ableton Live Specialist',
    bio: 'Pastor Eze has served as Music Director for international conferences of over 30,000 attendees. He coaches FJMUSIC students in the psychological, spiritual, and technical leadership of live stage teams, track playback, and seamless musical transitions.',
    teachingPhilosophy:
      'A great music director is invisible on stage—enabling every singer and instrumentalist to shine with flawless unity and dynamic control.',
    image: heroImg,
    assignedCourses: ['CCM-101', 'ENS-101'],
  },
];

export const INITIAL_EVENTS: CollegeEvent[] = [
  {
    id: 'evt-1',
    title: 'Annual FJMUSIC Gala Showcase: From Room to Arena',
    slug: 'annual-fjmusic-gala-showcase',
    category: 'showcase',
    description:
      'Our flagship live concert presenting diploma and certificate graduating students performing with a 12-piece live orchestra and 40-voice college choir in the main concert auditorium.',
    date: '2026-11-28',
    time: '18:00 WAT',
    venue: 'Main Auditorium, FJMUSIC Performance Hall',
    deliveryFormat: 'In-Person Concert Hall',
    coverImage: heroImg,
    capacity: 650,
    registeredCount: 420,
    isRegistrationOpen: true,
    featured: true,
  },
  {
    id: 'evt-2',
    title: 'Masterclass: Gospel Re-Harmonization & 2-5-1 Voicings',
    slug: 'masterclass-gospel-reharmonization',
    category: 'masterclass',
    description:
      'An intensive 3-hour practical keyboard workshop hosted by Prof. David Olumide dissecting altered chords, tritone substitutions, and passing chord cycles on concert acoustic pianos.',
    date: '2026-11-08',
    time: '14:00 WAT',
    venue: 'Studio A Piano Theatre & Hybrid Stream',
    deliveryFormat: 'Live Stream & Campus',
    coverImage: pianoImg,
    capacity: 120,
    registeredCount: 94,
    isRegistrationOpen: true,
    featured: true,
  },
  {
    id: 'evt-3',
    title: 'Vocal Ensemble Rehearsal & Sight-Singing Workshop',
    slug: 'vocal-ensemble-rehearsal-workshop',
    category: 'workshop',
    description:
      'Join Dr. Clara Adeleke for an experiential workshop exploring 4-part SATB choral blending, Sol-fa sight-reading under pressure, and live microphone technique.',
    date: '2026-11-15',
    time: '11:00 WAT',
    venue: 'Choral Rehearsal Pavilion',
    deliveryFormat: 'In-Person Concert Hall',
    coverImage: choirImg,
    capacity: 80,
    registeredCount: 65,
    isRegistrationOpen: true,
    featured: false,
  },
  {
    id: 'evt-4',
    title: 'Audio Engineers Live Tracking Session: Drum Miking & Phase',
    slug: 'audio-engineers-live-tracking-session',
    category: 'masterclass',
    description:
      'Marcus Vance demonstrates live tracking of a Yamaha Maple Custom drum kit in Live Room A, demonstrating phase cancellation testing and preamp gain staging.',
    date: '2026-12-05',
    time: '16:00 WAT',
    venue: 'FJMUSIC Recording Studio Suite 1',
    deliveryFormat: 'Studio Theater',
    coverImage: studioImg,
    capacity: 40,
    registeredCount: 38,
    isRegistrationOpen: true,
    featured: false,
  },
];

export const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'cert-1',
    certificateNumber: 'FJM-DIP-2026-8814',
    studentId: 'stu-demo-1',
    studentName: 'Temitope Samuel Adeleke',
    programmeTitle: 'Diploma in Voice and Vocal Performance',
    qualificationType: 'Diploma',
    issueDate: '2026-09-15',
    completionDate: '2026-08-30',
    gradeClassification: 'Distinction',
    signatoryName: 'Dr. Clara Adeleke',
    signatoryTitle: 'Director of Academic Board, FJMUSIC College',
    status: 'verified_active',
    qrVerificationUrl: '/certificates/verify/FJM-DIP-2026-8814',
  },
  {
    id: 'cert-2',
    certificateNumber: 'FJM-CERT-2026-5021',
    studentId: 'stu-demo-2',
    studentName: 'Chidinma Grace Okafor',
    programmeTitle: 'Certificate in Note Reading, Scales & Key Signatures',
    qualificationType: 'Certificate of Musicianship',
    issueDate: '2026-10-02',
    completionDate: '2026-09-28',
    gradeClassification: 'Merit',
    signatoryName: 'Prof. David Olumide',
    signatoryTitle: 'Dean of Musicianship Studies',
    status: 'verified_active',
    qrVerificationUrl: '/certificates/verify/FJM-CERT-2026-5021',
  },
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-101',
    referenceNumber: 'FJM-APP-2026-1049',
    applicantId: 'app-demo-1',
    applicantName: 'Michael Babatunde',
    applicantEmail: 'michael.babatunde@example.com',
    applicantPhone: '+234 812 445 6789',
    programmeId: 'prog-dip-vocal',
    programmeTitle: 'Diploma in Voice and Vocal Performance',
    category: 'diploma',
    status: 'audition_scheduled',
    submittedAt: '2026-10-12',
    musicalBackground:
      'Singing lead tenor in church choir for 4 years. Capable of singing up to G4 in chest voice. Seeking professional training in diaphragmatic support, register blending, and stage presence.',
    yearsOfExperience: 4,
    primaryInstrumentOrVoice: 'Voice (Tenor)',
    auditionPreference: 'in_person',
    auditionDate: '2026-10-24 10:30 WAT',
    staffNotes: 'Strong vocal potential observed in uploaded audio snippet. Audition scheduled with Dr. Adeleke in Studio 2.',
    applicationFeePaid: true,
    paymentReference: 'PAY_FJM_APP_1049_9981',
    documents: [
      { name: 'babatunde_waec_certificate.pdf', type: 'application/pdf', size: '1.4 MB' },
      { name: 'pastor_recommendation_letter.pdf', type: 'application/pdf', size: '820 KB' },
    ],
  },
  {
    id: 'app-102',
    referenceNumber: 'FJM-APP-2026-1050',
    applicantId: 'app-demo-2',
    applicantName: 'Seyi Daniel Oladipo',
    applicantEmail: 'seyi.music@example.com',
    applicantPhone: '+234 809 334 1122',
    programmeId: 'prog-dip-keyboard',
    programmeTitle: 'Diploma in Keyboard / Piano Performance',
    category: 'diploma',
    status: 'accepted',
    submittedAt: '2026-10-05',
    admittedAt: '2026-10-14',
    musicalBackground:
      'Playing keys by ear for 6 years in youth bands. Can play 2-5-1 progressions in C, F, G, Bb, and Eb. Wants formal sight-reading, classical discipline, and synthesizer sound design.',
    yearsOfExperience: 6,
    primaryInstrumentOrVoice: 'Piano / Workstation Keyboard',
    auditionPreference: 'video_link',
    auditionVideoUrl: 'https://youtube.com/watch?v=sample-audition-piano',
    auditionFeedback: 'Exceptional musical ear, fluid finger speed. Admitted to Diploma in Keyboard Studies. Enrolment cleared.',
    staffNotes: 'Approved by Admissions Board on 14 Oct 2026.',
    applicationFeePaid: true,
    paymentReference: 'PAY_FJM_APP_1050_4421',
    documents: [
      { name: 'seyi_transcript.pdf', type: 'application/pdf', size: '2.1 MB' },
    ],
  },
];

export const INITIAL_PRACTICE_LOGS: PracticeLog[] = [
  {
    id: 'pl-1',
    studentId: 'stu-demo-1',
    studentName: 'Temitope Samuel Adeleke',
    date: '2026-10-16',
    instrument: 'Voice (Tenor)',
    durationMinutes: 45,
    bpm: 88,
    learningObjective: 'Diaphragmatic appoggio breathing on 5-tone lip trills and passagio transition from E4 to G4.',
    challengesEncountered: 'Experienced minor throat constriction when trying to sustain F#4 on an open "Ah" vowel.',
    progressNotes: 'Shifted to a narrower "Oh" vowel formant modification as instructed in Lesson 3. The tone opened up immediately with zero strain.',
    audioSampleNotes: 'Recorded on Zoom H4n recorder in Practice Room B.',
    instructorFeedback: {
      instructorName: 'Dr. Clara Adeleke',
      feedback: 'Excellent vowel modification adjustment, Temitope! Remember to keep your soft palate high and avoid pushing air velocity on the passagio. 4.8/5.',
      reviewedAt: '2026-10-16 19:40',
      practicalRating: 5,
    },
  },
  {
    id: 'pl-2',
    studentId: 'stu-demo-1',
    studentName: 'Temitope Samuel Adeleke',
    date: '2026-10-14',
    instrument: 'Voice & Microphone',
    durationMinutes: 60,
    bpm: 105,
    learningObjective: 'Stage microphone handling, distance variation on belt notes, and ear monitor balance.',
    challengesEncountered: 'Accidentally moved mic too far away during mid-register phrases, resulting in low signal.',
    progressNotes: 'Practiced keeping the capsule strictly at 45 degrees, 2cm from lip, only backing away 10cm during the climatic F4 high note.',
    instructorFeedback: {
      instructorName: 'Pastor Emmanuel Eze',
      feedback: 'Much cleaner stage positioning! Your vocal clarity in the front-of-house mix was steady and well-controlled.',
      reviewedAt: '2026-10-15 11:20',
      practicalRating: 4,
    },
  },
];

export const INITIAL_ASSESSMENTS: AssessmentRecord[] = [
  {
    id: 'ass-1',
    studentId: 'stu-demo-1',
    studentName: 'Temitope Samuel Adeleke',
    programmeTitle: 'Diploma in Voice and Vocal Performance',
    courseTitle: 'Vocal Anatomy, Diaphragm Breath & Pure Tone',
    type: 'practical_jury',
    title: 'Mid-Semester Vocal Jury Performance',
    assessmentDate: '2026-10-10',
    status: 'graded',
    score: 91,
    maxScore: 100,
    gradeClassification: 'Distinction',
    assessedBy: 'Dr. Clara Adeleke & Prof. Olumide',
    feedback:
      'Outstanding vocal command. Pitch center was rock solid across all repertoire pieces. Breath support was consistent throughout legato passages. Minor advice: relax shoulders further during set transitions.',
    rubric: [
      { name: 'Pitch Accuracy & Intonation', maxPoints: 25, awardedPoints: 24, notes: 'Impeccable microtonal accuracy.' },
      { name: 'Breath Control & Phonation Support', maxPoints: 25, awardedPoints: 23, notes: 'Appoggio technique clearly evident.' },
      { name: 'Tone Quality & Register Blending', maxPoints: 25, awardedPoints: 22, notes: 'Smooth transition over passagio.' },
      { name: 'Stage Presence & Articulation', maxPoints: 25, awardedPoints: 22, notes: 'Engaging, communicative facial expressiveness.' },
    ],
  },
  {
    id: 'ass-2',
    studentId: 'stu-demo-1',
    studentName: 'Temitope Samuel Adeleke',
    programmeTitle: 'Diploma in Voice and Vocal Performance',
    courseTitle: 'Rudiments of Music Theory',
    type: 'theory_exam',
    title: 'Theory Assessment: Major Scales & Clef Reading',
    assessmentDate: '2026-10-02',
    status: 'graded',
    score: 88,
    maxScore: 100,
    gradeClassification: 'Merit',
    assessedBy: 'Prof. David Olumide',
    feedback: 'Accurately constructed all 12 major scales with their respective sharp and flat key signatures.',
    rubric: [
      { name: 'Scale Construction', maxPoints: 40, awardedPoints: 37 },
      { name: 'Key Signatures Identification', maxPoints: 30, awardedPoints: 26 },
      { name: 'Rhythm & Time Signatures', maxPoints: 30, awardedPoints: 25 },
    ],
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    reference: 'PAY_FJM_APP_1049_9981',
    userId: 'app-demo-1',
    userName: 'Michael Babatunde',
    userEmail: 'michael.babatunde@example.com',
    amount: 15000,
    currency: 'NGN',
    purpose: 'Application Fee',
    programmeTitle: 'Diploma in Voice and Vocal Performance',
    status: 'success',
    channel: 'Paystack',
    paidAt: '2026-10-12 14:22:10',
    receiptNumber: 'RCP-2026-09142',
  },
  {
    id: 'pay-2',
    reference: 'PAY_FJM_TUI_8814_0012',
    userId: 'stu-demo-1',
    userName: 'Temitope Samuel Adeleke',
    userEmail: 'temitope.adeleke@example.com',
    amount: 160000,
    currency: 'NGN',
    purpose: 'Tuition Payment',
    programmeTitle: 'Diploma in Voice and Vocal Performance (Semester 1)',
    status: 'success',
    channel: 'Paystack',
    paidAt: '2026-09-02 09:15:33',
    receiptNumber: 'RCP-2026-08311',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-16 19:40:12',
    performedBy: 'Dr. Clara Adeleke',
    userRole: 'instructor',
    action: 'REVIEW_PRACTICE_LOG',
    targetEntity: 'PracticeLog:pl-1 (Temitope Adeleke)',
    details: 'Awarded 5/5 practical rating with vowel modification guidance.',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-14 11:05:00',
    performedBy: 'Admissions Desk (Admin)',
    userRole: 'admin',
    action: 'APPROVE_ADMISSION',
    targetEntity: 'Application:app-102 (Seyi Daniel Oladipo)',
    details: 'Application approved for Diploma in Keyboard Studies after video audition review.',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-10 15:30:20',
    performedBy: 'Prof. David Olumide',
    userRole: 'instructor',
    action: 'SUBMIT_ASSESSMENT_GRADE',
    targetEntity: 'Assessment:ass-1 (Mid-Semester Vocal Jury)',
    details: 'Recorded score 91/100 (Distinction) with formal rubric breakdown.',
  },
];
