import mongoose from 'mongoose';
import User from '../models/User.js';
import Course from '../models/Course.js';
import SchoolTuition from '../models/SchoolTuition.js';
import DistanceEducation from '../models/DistanceEducation.js';
import Faculty from '../models/Faculty.js';
import Achievement from '../models/Achievement.js';
import Testimonial from '../models/Testimonial.js';
import Announcement from '../models/Announcement.js';
import StudyMaterial from '../models/StudyMaterial.js';
import Attendance from '../models/Attendance.js';
import Result from '../models/Result.js';
import SiteSetting from '../models/SiteSetting.js';
import Admission from '../models/Admission.js';
import CertificateRequest from '../models/CertificateRequest.js';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('ℹ️ Database already contains data. Skipping initial seeding.');
      return;
    }

    console.log('🌱 Seeding Ratnam Coaching Centre database with clean initial data...');

    // 1. Create Admin
    const admin = await User.create({
      name: 'Ratnam Administrative Directorate',
      email: 'admin@ratnamcoaching.com',
      password: 'RatnamAdmin@1998',
      role: 'admin',
      phone: 'Contact details will be updated soon',
      address: 'Main Road, Bhimavaram, West Godavari District, Andhra Pradesh - 534201',
    });
    console.log('✅ Admin user created: admin@ratnamcoaching.com');

    // 2. Create Demo Student
    const student = await User.create({
      name: 'Ravi Kumar (Demo Student)',
      email: 'student@ratnamcoaching.com',
      password: 'StudentPass@1998',
      role: 'student',
      studentId: 'RCC-STU-2026-0001',
      phone: '9876543210',
      parentName: 'S. N. Murthy',
      address: 'Bhimavaram, Andhra Pradesh',
      schoolClass: 'Class 10',
    });
    console.log('✅ Demo student created: student@ratnamcoaching.com');

    // 3. Seed Site Settings & Timeline
    await SiteSetting.create({
      instituteName: 'RATNAM COACHING CENTRE',
      establishedYear: 1998,
      primaryTagline: "Don't Sit Like a Rock, Work Like a Clock.",
      secondaryTagline: 'Building Careers Through Quality Education Since 1998.',
      supportingHeroText:
        'Competitive examination coaching, school daily tuitions, distance education support and student services under one educational institution in Bhimavaram, Andhra Pradesh.',
      primaryPhone: 'Contact details will be updated soon',
      email: 'contact@ratnamcoaching.com',
      address: 'Main Road, Bhimavaram, West Godavari District, Andhra Pradesh - 534201, India',
      officeHours: 'Monday – Saturday: 7:00 AM – 8:30 PM | Sunday: 8:00 AM – 1:00 PM',
      govtRegistrationNote: 'Registered Educational Institute under the Government of Andhra Pradesh.',
      andhraUniversityDisclaimer:
        'Ratnam Coaching Centre provides independent academic coaching, application guidance, and student support for distance education programs of Andhra University. Official degrees, syllabi, and examinations are administered exclusively by Andhra University.',
      certificateAssistanceDisclaimer:
        'Ratnam Coaching Centre assists students who require guidance for university certificate retrieval, provisional memos, migration documents, and university administrative follow-up. Official certificates are issued solely by the respective universities and educational boards.',
      timeline: [
        {
          year: '1998',
          title: 'Establishment of Ratnam Coaching Centre',
          description:
            'Founded in Bhimavaram, Andhra Pradesh, with a singular mission: providing disciplined academic training, school tuitions, and competitive exam preparation.',
        },
        {
          year: '2005',
          title: 'Expansion of Competitive Exam Wing',
          description:
            'Introduced specialized classroom coaching modules for Banking (IBPS/SBI), SSC, and Railway examinations with intensive daily test series.',
        },
        {
          year: '2012',
          title: 'Andhra University Distance Education Support Wing',
          description:
            'Initiated structured academic guidance, admission support, and weekend tutorial classes for Andhra University Distance Education learners.',
        },
        {
          year: '2018',
          title: 'Certificate Assistance & Student Guidance Cell',
          description:
            'Dedicated a student helpdesk to guide past graduates in retrieving pending degree certificates, provisional memos, and migration certificates.',
        },
        {
          year: '2026',
          title: 'Digital Academic Portal & Modern Hybrid Learning',
          description:
            'Launched comprehensive student management portal, live certificate tracking, online mock tests, and digital learning resource repository.',
        },
      ],
    });

    // 4. Seed Faculty Profiles
    const faculty1 = await Faculty.create({
      name: 'Faculty Profile – Quantitative Aptitude',
      designation: 'Senior Faculty – Quantitative Aptitude & Mathematics',
      qualification: 'M.Sc. Mathematics, B.Ed.',
      subject: 'Quantitative Aptitude & Advanced Arithmetic',
      specialization: 'Arithmetic, Advanced Algebra, Data Interpretation & Speed Calculations',
      experience: '15+ Years Teaching Experience',
      coursesHandled: ['SSC CGL', 'IBPS PO', 'SBI PO', 'RRB NTPC', 'Class 10 Mathematics'],
      bio: 'Expert in shortcut methods, mental calculation strategies, and rigorous conceptual foundation for national-level competitive tests.',
      status: 'Active',
      isDemo: true,
    });

    const faculty2 = await Faculty.create({
      name: 'Faculty Profile – Logical Reasoning',
      designation: 'Lead Faculty – Reasoning & Analytical Ability',
      qualification: 'M.Tech, Reasoning Expert',
      subject: 'Logical & Analytical Reasoning',
      specialization: 'Puzzles, Seating Arrangements, Critical Reasoning & Syllogisms',
      experience: '12+ Years Teaching Experience',
      coursesHandled: ['IBPS PO', 'SBI PO', 'RBI Grade B', 'SSC CGL'],
      bio: 'Focuses on high-efficiency problem-solving frameworks and time management techniques.',
      status: 'Active',
      isDemo: true,
    });

    const faculty3 = await Faculty.create({
      name: 'Faculty Profile – General Studies & Banking',
      designation: 'Senior Faculty – General Awareness & Financial Systems',
      qualification: 'M.A. Economics, Ph.D. Scholar',
      subject: 'General Awareness, Banking & Financial Economics',
      specialization: 'Indian Economy, Banking Regulations, Current Affairs & AP Governance',
      experience: '10+ Years Teaching Experience',
      coursesHandled: ['RBI Grade B', 'IBPS PO', 'SBI PO', 'SSC CHSL'],
      bio: 'Dedicated to analytical current affairs coverage and in-depth conceptual clarity in banking mechanisms.',
      status: 'Active',
      isDemo: true,
    });

    const faculty4 = await Faculty.create({
      name: 'Faculty Profile – English Language & Grammar',
      designation: 'Head – Verbal Ability & Descriptive English',
      qualification: 'M.A. English Literature, B.Ed.',
      subject: 'English Comprehension & Grammar',
      specialization: 'Reading Comprehension, Error Detection, Vocabulary & Descriptive Writing',
      experience: '14+ Years Teaching Experience',
      coursesHandled: ['SSC CGL', 'IBPS PO', 'School Daily Tuitions'],
      bio: 'Specialist in foundational grammar rules, active vocabulary expansion, and descriptive paper drafting.',
      status: 'Active',
      isDemo: true,
    });

    // 5. Seed Courses
    const courses = [
      {
        title: 'SSC CGL (Combined Graduate Level)',
        slug: 'ssc-cgl-coaching',
        category: 'SSC',
        shortDescription:
          'Comprehensive coaching for Tier-I & Tier-II SSC CGL covering Quant, Reasoning, English, General Awareness, and Computer Proficiency.',
        overview:
          'Our SSC CGL coaching curriculum is meticulously designed around the latest Staff Selection Commission pattern. We emphasize rigorous speed drills, conceptual mastery in quantitative aptitude, comprehensive English comprehension, and daily current affairs updates.',
        whyChoose: [
          'Concept clarity from fundamentals to advanced Tier-II level',
          'Daily 1-hour speed calculation and shortcut techniques workshop',
          'Weekly computer-based mock tests with all-institute percentile ranking',
          'Updated study booklets covering 15 years of solved previous year questions',
        ],
        subjects: [
          'Quantitative Aptitude & Advanced Mathematics',
          'General Intelligence & Reasoning',
          'English Language & Comprehension',
          'General Studies (History, Polity, Geography, Economy, Science, Current Affairs)',
          'Computer Knowledge Module & Data Entry Speed Practice',
        ],
        eligibility: "Bachelor's Degree in any discipline from a recognized University.",
        duration: '6 Months (400+ Intensive Classroom Hours)',
        batchTiming: 'Morning: 7:00 AM – 10:00 AM | Evening: 5:00 PM – 8:00 PM',
        mode: 'Classroom & Online',
        facultyName: 'Expert SSC Faculty Panel (Ratnam Institute)',
        feeAmount: 14500,
        feeDetails: '₹14,500 (Comprehensive study materials, mock test series, and interview guidance included). Installment plans available.',
        startDate: 'New Batches Starting 1st & 15th of Every Month',
        admissionStatus: 'Admissions Open',
        teachingMethodology: [
          'Topic-wise concept building from base to advanced difficulty',
          'Daily Practice Problem (DPP) sheets with mandatory error tracking',
          'Weekly sectional speed tests with time-management analysis',
          'Monthly full-length CBT simulation mirroring actual SSC interface',
        ],
        studyMaterialInfo:
          'Printed topic-wise concept modules, formula reference handbooks, and previous 15 years chapter-wise solved question banks.',
        mockTestsInfo:
          '50+ Sectional Tests + 30 Full-Length Tier-I and Tier-II Computer Based Mock Tests with instant detailed analytics.',
        previousQuestionPractice: 'Complete solved repository of all SSC CGL exams from 2012 to 2025.',
        doubtClarification: 'Dedicated 1-on-1 daily doubt resolution desks available from 10:00 AM to 6:00 PM.',
        isFeatured: true,
        isDemo: false,
      },
      {
        title: 'SSC CHSL (Combined Higher Secondary Level)',
        slug: 'ssc-chsl-coaching',
        category: 'SSC',
        shortDescription:
          'Targeted coaching program for 10+2 candidates aspiring for LDC, JSA, and DEO positions with special typing speed support.',
        overview:
          'Structured preparation designed specifically for intermediate/10+2 candidates. The course builds solid fundamentals in arithmetic, grammar, reasoning, and GK along with dedicated typing test guidance.',
        whyChoose: [
          'Specially structured for 10+2 students with step-by-step foundation modules',
          'Daily vocabulary & grammar reinforcement sessions',
          'Typing test laboratory practice support',
        ],
        subjects: ['Quantitative Aptitude', 'General Intelligence', 'English Language', 'General Awareness'],
        eligibility: '10+2 (Intermediate / Senior Secondary) Pass from a recognized Board.',
        duration: '5 Months (300+ Hours)',
        batchTiming: 'Morning: 7:30 AM – 10:00 AM | Evening: 4:30 PM – 7:00 PM',
        mode: 'Classroom & Online',
        facultyName: 'Expert SSC Faculty Panel',
        feeAmount: 11500,
        feeDetails: '₹11,500 (Inclusive of printed study material & online test series).',
        startDate: 'Batches Commencing Every Month',
        admissionStatus: 'Admissions Open',
        isFeatured: true,
        isDemo: false,
      },
      {
        title: 'IBPS PO (Probationary Officer)',
        slug: 'ibps-po-coaching',
        category: 'Banking',
        shortDescription:
          'Intensive preparation program for IBPS PO Prelims, Mains, Descriptive Writing, and Mock Interviews.',
        overview:
          'Our Banking PO program delivers rigorous training in high-level reasoning puzzles, data interpretation caselets, banking & financial awareness, and English descriptive writing.',
        whyChoose: [
          'High-level complex puzzle and seating arrangement mastery',
          'Advanced Data Interpretation (DI) & Data Sufficiency workshops',
          'Special Banking Awareness & Financial Economy modules',
          'Descriptive English letter & essay evaluation with faculty feedback',
          'Panel mock interview rounds with experienced bankers',
        ],
        subjects: [
          'Quantitative Aptitude & Data Interpretation (DI)',
          'Reasoning Ability & Computer Aptitude',
          'English Language & Descriptive Writing',
          'General Economy & Banking Awareness',
        ],
        eligibility: "Graduation Degree in any discipline from a recognized University.",
        duration: '6 Months (350+ Hours)',
        batchTiming: 'Morning: 6:30 AM – 9:30 AM | Evening: 5:30 PM – 8:30 PM',
        mode: 'Classroom & Online',
        facultyName: 'Senior Banking Faculty Directorate',
        feeAmount: 13500,
        feeDetails: '₹13,500 (Study booklets, 60+ mock test pack, and interview mentoring included).',
        startDate: 'New Batches on 1st & 15th of Each Month',
        admissionStatus: 'Admissions Open',
        isFeatured: true,
        isDemo: false,
      },
      {
        title: 'SBI PO (State Bank of India Probationary Officer)',
        slug: 'sbi-po-coaching',
        category: 'Banking',
        shortDescription:
          'Premier coaching program dedicated to SBI PO Prelims, Mains, Group Discussion (GD), and Personal Interview rounds.',
        overview:
          'SBI PO requires the highest level of analytical agility. Our coaching combines cutting-edge DI techniques, advanced reasoning puzzles, group discussions, and personal psychometric guidance.',
        whyChoose: [
          'SBI-specific advanced puzzle drills and new-pattern questions',
          'Live group discussion (GD) and psychometric assessment training',
          'Individual interview preparation with personalized feedback',
        ],
        subjects: [
          'Advanced Quantitative Aptitude & Data Analysis',
          'High-Difficulty Reasoning Ability',
          'English Language & Descriptive Drafting',
          'Banking & Current Economic Scenarios',
        ],
        eligibility: 'Graduation in any discipline from a recognized University.',
        duration: '6 Months (380+ Hours)',
        batchTiming: 'Morning: 7:00 AM – 10:00 AM | Evening: 6:00 PM – 9:00 PM',
        mode: 'Classroom & Online',
        facultyName: 'Senior Banking Faculty Directorate',
        feeAmount: 14000,
        feeDetails: '₹14,000 (Complete course material, test series & GD/PI training).',
        startDate: 'Ongoing Admissions for Upcoming SBI Cycle',
        admissionStatus: 'Admissions Open',
        isFeatured: true,
        isDemo: false,
      },
      {
        title: 'RRB NTPC & Group D (Railways)',
        slug: 'rrb-railways-coaching',
        category: 'Railways',
        shortDescription:
          'Focused preparation for Railway Recruitment Board exams including NTPC (Graduate & Under Graduate) and ALP/Technician.',
        overview:
          'Designed around the standard RRB examination pattern with deep focus on General Science (Physics, Chemistry, Biology), Mathematics, General Intelligence, and Indian Railways general knowledge.',
        whyChoose: [
          'Special in-depth General Science module for Railway exams',
          'High-speed calculation training tailored to RRB arithmetic',
          'Bilingual (English & Telugu) study notes and explanation',
        ],
        subjects: ['Mathematics (Arithmetic & Pure Maths)', 'General Intelligence & Reasoning', 'General Science & General Awareness'],
        eligibility: '10th / 12th / ITI / Graduation (depending on specific RRB post).',
        duration: '5 Months (300+ Hours)',
        batchTiming: 'Morning: 8:00 AM – 11:00 AM | Evening: 4:00 PM – 7:00 PM',
        mode: 'Classroom & Online',
        facultyName: 'Railways Examination Faculty Wing',
        feeAmount: 10500,
        feeDetails: '₹10,500 (Printed books, science charts & 40+ CBT mock tests included).',
        startDate: 'Batches Commencing Regular Intervals',
        admissionStatus: 'Admissions Open',
        isFeatured: true,
        isDemo: false,
      },
      {
        title: 'RBI Grade B Officer Preparation',
        slug: 'rbi-grade-b-coaching',
        category: 'RBI',
        shortDescription:
          'Comprehensive coaching for Phase-I and Phase-II (Economic & Social Issues, Finance & Management, English Writing).',
        overview:
          'The premier central banking examination in India. Our program delivers deep conceptual grounding in Indian Economics, RBI Regulations, Corporate Finance, Organizational Management, and Descriptive Answer Writing.',
        whyChoose: [
          'Specialist faculty for Economic & Social Issues (ESI) and Finance & Management (FM)',
          'Weekly descriptive answer evaluation with faculty remarks',
          'Deep coverage of Union Budget, Economic Survey, and RBI Circulars',
        ],
        subjects: [
          'Phase-I: General Awareness, Quantitative Aptitude, Reasoning, English',
          'Phase-II: Economic & Social Issues (ESI)',
          'Phase-II: Finance & Management (FM)',
          'Phase-II: English Writing Skills (Descriptive)',
        ],
        eligibility: 'Minimum 60% marks in Graduation / Post-Graduation (50% for SC/ST/PwBD).',
        duration: '7 Months (450+ Hours)',
        batchTiming: 'Morning: 6:30 AM – 9:30 AM | Weekend Intensive: 9:00 AM – 4:00 PM',
        mode: 'Classroom & Online',
        facultyName: 'Senior Economics & Central Banking Faculty Wing',
        feeAmount: 18500,
        feeDetails: '₹18,500 (Detailed reference books, ESI/FM compilations & Phase-II evaluation).',
        startDate: 'Special Annual Batch – Limited Intake',
        admissionStatus: 'Admissions Open',
        isFeatured: true,
        isDemo: false,
      },
    ];

    for (const c of courses) {
      await Course.create(c);
    }
    console.log(`✅ ${courses.length} Competitive Exam Courses created.`);

    // 6. Seed School Tuitions (Classes 1 to 10)
    for (let grade = 1; grade <= 10; grade++) {
      const isHighSchool = grade >= 6;
      await SchoolTuition.create({
        className: `Class ${grade}`,
        classGrade: grade,
        subjects: isHighSchool
          ? ['Mathematics', 'Physical Science', 'Biological Science', 'Social Studies', 'English', 'Telugu / Hindi']
          : ['Mathematics', 'Environmental Science (EVS)', 'English', 'Telugu', 'General Knowledge'],
        dailyTuition: true,
        homeworkSupport: true,
        doubtClarification: true,
        testPracticeSupport: true,
        timings: grade <= 5 ? '4:30 PM – 6:30 PM (Daily)' : '5:00 PM – 7:45 PM (Daily)',
        feeDetails: 'Affordable monthly tuition fee. Contact office for fee details and sibling discounts.',
        batchCapacity: 20,
        currentEnrollment: grade === 10 ? 16 : 12,
        assignedTeachers: isHighSchool
          ? 'Senior Subject Specialists (Maths, Science, Social & Languages)'
          : 'Dedicated Primary Academic Mentors',
        status: 'Admissions Open',
        description: `Comprehensive daily tuition for Class ${grade} students focusing on textbook conceptual understanding, daily school homework completion, handwriting, and weekly syllabus tests.`,
        isDemo: false,
        isActive: true,
      });
    }
    console.log('✅ Classes 1 to 10 School Tuitions created.');

    // 7. Seed Andhra University Distance Education Programs
    const distancePrograms = [
      {
        programName: 'Bachelor of Arts (B.A.)',
        degreeLevel: 'Undergraduate',
        university: 'Andhra University (School of Distance Education)',
        duration: '3 Years',
        eligibility: 'Pass in Intermediate (10+2) or equivalent from recognized board.',
        overview:
          'Ratnam Coaching Centre provides admission guidance, form submission assistance, study material distribution support, and weekend contact class guidance for Andhra University B.A. distance program.',
        servicesOffered: [
          'Admission application processing & verification',
          'Subject combination selection guidance (History, Economics, Politics, Public Admin)',
          'Assignment submission tracking and syllabus updates',
          'Exam hall ticket guidance and examination center support',
        ],
        academicSupport: 'Weekend guidance classes, textbook notes, and previous question paper discussions.',
        status: 'Guidance Active',
        isDemo: false,
      },
      {
        programName: 'Bachelor of Commerce (B.Com / B.Com Computers)',
        degreeLevel: 'Undergraduate',
        university: 'Andhra University (School of Distance Education)',
        duration: '3 Years',
        eligibility: 'Pass in Intermediate (10+2) with Commerce/Maths/Vocational or equivalent.',
        overview:
          'Comprehensive support for B.Com distance education aspirants, covering Accountancy, Business Statistics, Taxation, Banking, and Computer Applications.',
        servicesOffered: [
          'Application form filling and document verification',
          'Accountancy & Statistics problem-solving guidance sessions',
          'Semester assignment submission assistance',
          'Annual examination hall ticket and results follow-up',
        ],
        academicSupport: 'Special accounting problem-solving sessions on weekends.',
        status: 'Guidance Active',
        isDemo: false,
      },
      {
        programName: 'Bachelor of Science (B.Sc. - MPC / CBZ / Computers)',
        degreeLevel: 'Undergraduate',
        university: 'Andhra University (School of Distance Education)',
        duration: '3 Years',
        eligibility: 'Pass in Intermediate (10+2) with Science stream (MPC / BiPC).',
        overview:
          'Guidance for science stream distance learners with structured support for theory preparation and practical session scheduling at designated university centers.',
        servicesOffered: [
          'Distance admission process and enrollment assistance',
          'Practical training schedule coordination at university nodal centers',
          'Study material collection and syllabus tracking',
          'Exam registration and hall ticket facilitation',
        ],
        academicSupport: 'Core concept reviews and practical record guidance.',
        status: 'Guidance Active',
        isDemo: false,
      },
      {
        programName: 'Master of Arts (M.A. - English / Telugu / Economics / Public Admin)',
        degreeLevel: 'Postgraduate',
        university: 'Andhra University (School of Distance Education)',
        duration: '2 Years',
        eligibility: "Any Bachelor's Degree from a recognized University.",
        overview:
          'PG distance education guidance for working professionals and graduates looking to pursue Master degrees with Andhra University.',
        servicesOffered: [
          'PG admission documentation & enrollment support',
          'Syllabus & assignment guideline coordination',
          'Exam registration & university correspondence assistance',
        ],
        academicSupport: 'Literature & theory conceptual guidance.',
        status: 'Guidance Active',
        isDemo: false,
      },
      {
        programName: 'Master of Commerce (M.Com)',
        degreeLevel: 'Postgraduate',
        university: 'Andhra University (School of Distance Education)',
        duration: '2 Years',
        eligibility: 'B.Com / B.B.A / B.B.M from a recognized University.',
        overview:
          'Distance learning guidance for advanced commerce, corporate finance, and business management studies.',
        servicesOffered: [
          'Enrollment assistance and verification',
          'Project and assignment submission guidance',
          'University exam updates and result tracking',
        ],
        academicSupport: 'Advanced financial management and statistics tutorial sessions.',
        status: 'Guidance Active',
        isDemo: false,
      },
    ];

    for (const dp of distancePrograms) {
      await DistanceEducation.create(dp);
    }
    console.log(`✅ ${distancePrograms.length} Distance Education programs created.`);

    // 8. Seed Announcements
    await Announcement.create({
      title: 'New Batches Commencing for SSC CGL & IBPS PO 2026',
      content:
        'New classroom and hybrid batches for SSC CGL Tier I/II and IBPS PO 2026 are scheduled to commence on the 1st of the coming month. Early registrations are open at the administrative desk.',
      category: 'Batch Notification',
      audience: 'Competitive Exams',
      priority: 'High',
      isActive: true,
    });

    await Announcement.create({
      title: 'Class 10 Board Exam Special Daily Test Series Started',
      content:
        'Daily intensive practice tests covering Mathematics and Physical Science have begun for 10th Class students at 5:30 PM. Parents can review weekly scorecards every Saturday.',
      category: 'General',
      audience: 'School Tuitions',
      priority: 'Normal',
      isActive: true,
    });

    await Announcement.create({
      title: 'Andhra University Distance Education Admission Assistance Desk Active',
      content:
        'Students wishing to apply for Andhra University B.A., B.Com, B.Sc., or M.A. distance education courses can visit the guidance desk for application assistance and documentation verification.',
      category: 'Distance Education',
      audience: 'Distance Education',
      priority: 'Normal',
      isActive: true,
    });

    // 9. Seed Study Materials
    await StudyMaterial.create({
      title: 'Quantitative Aptitude Formula Handbook & Speed Tricks [DEMO DATA]',
      category: 'Competitive Exams',
      subject: 'Quantitative Aptitude',
      courseName: 'SSC CGL / Banking PO',
      description: 'Comprehensive compendium of 200+ shortcut formulas, arithmetic tricks, and Vedic math techniques.',
      fileType: 'PDF',
      downloadUrl: '#',
      fileSize: '3.8 MB',
      isDemo: true,
    });

    await StudyMaterial.create({
      title: 'Banking & Financial Awareness Current Affairs Digest [DEMO DATA]',
      category: 'Competitive Exams',
      subject: 'Banking Awareness',
      courseName: 'IBPS PO / SBI PO',
      description: 'Key RBI circulars, monetary policy rates, and banking terminology overview.',
      fileType: 'PDF',
      downloadUrl: '#',
      fileSize: '2.1 MB',
      isDemo: true,
    });

    await StudyMaterial.create({
      title: 'Class 10 Mathematics Chapter-wise Important Theorems & Problems [DEMO DATA]',
      category: 'School Tuitions',
      subject: 'Mathematics',
      courseName: 'Class 10 Tuition',
      description: 'Solved high-yield questions for Real Numbers, Polynomials, Trigonometry, and Coordinate Geometry.',
      fileType: 'PDF',
      downloadUrl: '#',
      fileSize: '4.5 MB',
      isDemo: true,
    });

    // 10. Seed Demo Achievements (Marked as Demo Data)
    await Achievement.create({
      year: '2025',
      exam: 'IBPS PO Examination [DEMO DATA]',
      studentName: 'K. Sai Krishna [DEMO DATA]',
      achievement: 'Selected as Probationary Officer in Union Bank of India',
      rank: 'State Rank 42',
      isVerified: true,
      isDemo: true,
    });

    await Achievement.create({
      year: '2025',
      exam: 'SSC CGL Examination [DEMO DATA]',
      studentName: 'M. Divya [DEMO DATA]',
      achievement: 'Selected as Inspector of Central GST & Excise',
      rank: 'All India Rank 384',
      isVerified: true,
      isDemo: true,
    });

    await Achievement.create({
      year: '2024',
      exam: 'RRB NTPC Graduate Level [DEMO DATA]',
      studentName: 'P. Suresh Varma [DEMO DATA]',
      achievement: 'Selected as Station Master (South Central Railway)',
      rank: 'Zone Merit List',
      isVerified: true,
      isDemo: true,
    });

    // 11. Seed Demo Testimonials (Marked as Demo Data)
    await Testimonial.create({
      studentName: 'P. Venkata Ramana [DEMO DATA]',
      course: 'SSC CGL Regular Batch',
      selectedFor: 'Inspector (Central Excise)',
      year: '2025',
      message:
        'The disciplined environment at Ratnam Coaching Centre and their tagline "Work Like a Clock" shaped my entire daily preparation routine. The daily tests and mathematics shortcut techniques were crucial for my selection.',
      rating: 5,
      isVerified: true,
      isDemo: true,
    });

    await Testimonial.create({
      studentName: 'S. Lakshmi Pravallika [DEMO DATA]',
      course: 'Banking PO Comprehensive Batch',
      selectedFor: 'Probationary Officer (Canara Bank)',
      year: '2025',
      message:
        'Daily reasoning puzzles and one-on-one doubt clarification sessions helped me clear both IBPS PO and SBI PO prelims in my first attempt. Excellent mentorship in Bhimavaram.',
      rating: 5,
      isVerified: true,
      isDemo: true,
    });

    // 12. Seed Demo Attendance & Result for Demo Student
    const todayStr = new Date().toISOString().split('T')[0];
    await Attendance.create({
      student: student._id,
      studentName: student.name,
      studentId: student.studentId,
      courseName: 'Class 10 Tuition',
      date: todayStr,
      status: 'Present',
      topicCovered: 'Quadratic Equations & Arithmetic Progressions',
      remarks: 'Attentive and submitted homework on time.',
    });

    await Result.create({
      student: student._id,
      studentName: student.name,
      studentId: student.studentId,
      examTitle: 'Class 10 Mathematics Chapter Test #4',
      courseName: 'Class 10 Tuition',
      examDate: todayStr,
      totalMarks: 50,
      scoredMarks: 46,
      percentage: 92,
      rank: 2,
      feedback: 'Excellent work in algebraic derivations. Work on speed in coordinate geometry.',
      isDemo: true,
    });

    // 13. Seed a Demo Certificate Request
    await CertificateRequest.create({
      applicationId: 'RCC-CERT-2026-00001',
      studentName: 'Ravi Kumar (Demo Student)',
      mobile: '9876543210',
      email: 'student@ratnamcoaching.com',
      university: 'Andhra University',
      college: 'DNR College, Bhimavaram',
      course: 'B.Sc. Computers',
      graduationYear: '2024',
      hallTicketNumber: 'AU-2021-9874',
      certificateRequired: 'Degree Certificate (Original / Convocation)',
      certificateStatus: 'APPLICATION PROCESSED',
      additionalDetails: 'Need original convocation degree for higher education admission.',
      adminRemarks: 'Application submitted to Andhra University Exam Cell. Verification completed. Awaiting dispatch of convocation certificate.',
      statusHistory: [
        {
          status: 'SUBMITTED',
          remarks: 'Your certificate assistance request has been submitted successfully.',
          updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          status: 'UNDER REVIEW',
          remarks: 'University document verification in progress with Andhra University Examination Branch.',
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
        {
          status: 'APPLICATION PROCESSED',
          remarks: 'Application submitted to Andhra University Exam Cell. Verification completed. Awaiting dispatch of convocation certificate.',
          updatedAt: new Date(),
        },
      ],
      userId: student._id,
    });

    console.log('🎉 Database seeding complete!');
  } catch (error) {
    console.error('Database seeding error:', error);
  }
};
