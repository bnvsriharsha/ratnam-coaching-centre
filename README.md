# RATNAM COACHING CENTRE (Est. 1998)
> **"Don't Sit Like a Rock, Work Like a Clock."**  
> *Building Careers Through Quality Education Since 1998 • Bhimavaram, Andhra Pradesh*

---

## 🏛️ Project Overview
A complete, modern, professional, and responsive educational institution web application, student management portal, and administrative control center for **Ratnam Coaching Centre**.

### Core Academic Wings & Services
1. **Competitive Examination Coaching**: Structured coaching for SSC (CGL & CHSL), Banking (IBPS PO & SBI PO), Railways (RRB NTPC), and RBI Grade B.
2. **School Daily Tuitions (Classes 1–10)**: Daily classroom coaching, textbook concept building, daily homework supervision, and weekly syllabus-oriented test series.
3. **Distance Education Support (Andhra University)**: Academic guidance, syllabus counseling, assignment submission assistance, and exam preparation for Andhra University distance learners.
4. **Certificate Assistance & Retrieval Cell**: Specialized guidance desk helping past graduates retrieve and process pending Degree Certificates, Provisional Memos, Marks Memos, and Migration Certificates with live real-time status tracking.
5. **Student Portal**: Interactive learning portal with timetable schedules, study materials downloads, attendance calendar, mock test results, and status tracking.
6. **Directorate Control Center (Admin Panel)**: 15 modular CRUD management engines spanning courses, faculty, tuitions, admissions, certificate workflows, tests, attendance, and institutional settings.

---


## 🛠️ Technology Stack

- **Frontend**: React.js (v18), Vite, Tailwind CSS, Lucide Icons, React Router DOM (v7), Axios
- **Backend**: Node.js, Express.js (v4), REST API, Multer, Morgan, CORS, Dotenv
- **Database**: MongoDB with Mongoose (with embedded `mongodb-memory-server` auto-fallback for zero-config out-of-the-box startup)
- **Security**: JSON Web Tokens (JWT), bcryptjs password hashing, role-based route middleware (`protect`, `adminOnly`)

---

## 🚀 Quick Start & Running Instructions

### 1. Start the Backend API Server
```bash
cd server
npm install
npm start
```
*Server runs on port 5000 (`http://localhost:5000`). Database automatically initializes and seeds all programs, faculty, tuitions, and admin credentials.*

### 2. Start the Frontend Client
```bash
cd client
npm install
npm run dev
```
*Vite dev server runs at `http://localhost:5173`.*

---

## 🧭 Application Site Map & Routes

### A. Public Website (`/`)
- `GET /` — **Home Page** (Hero with primary tagline, 4 highlight cards, Why Choose Ratnam, Philosophy of Discipline, Featured Courses)
- `GET /about` — **About Us** (28-year history since 1998, AP registration notice, institutional milestones timeline)
- `GET /courses` — **Competitive Exams** (SSC, Banking, Railways, RBI cards with filters, duration, timings, editable fees)
- `GET /courses/:slug` — **Course Details** (Detailed syllabus, methodology, study material, mock tests, fee details, direct apply)
- `GET /school-tuitions` — **School Daily Tuitions** (Classes 1 through 10 daily academic coaching, timings, capacity)
- `GET /distance-education` — **Andhra University Distance Education** (Guidance services, program directory, legal disclaimer)
- `GET /faculty` — **Faculty Directory** (Educator profiles, qualifications, subjects, teaching experience)
- `GET /achievements` — **Achievements & Selections** (Verified results, year filter, student testimonials)
- `GET /certificate-assistance` — **Certificate Assistance** (Assistance application form generating unique `RCC-CERT-...` ID)
- `GET /certificate-tracking` — **Live Tracking Desk** (Track certificate assistance and admission status by ID + Mobile)
- `GET /admissions` — **Online Admissions** (Candidate enrollment form generating unique `RCC-ADM-...` ID)
- `GET /contact` — **Contact Bhimavaram Office** (Campus address, office hours, enquiry form)
- `GET /student/login` & `GET /student/register` — **Student Auth**
- `GET /admin/login` — **Admin Directorate Auth**

### B. Student Portal (`/student`)
- `/student` — **Overview Dashboard** (KPI stats, score summary, notice board)
- `/student/courses` — **My Courses & Timetable**
- `/student/materials` — **Study Materials Repository** (Search & download notes/PDFs)
- `/student/attendance` — **My Attendance Record** (Monthly logs & percentage)
- `/student/results` — **Mock Test Scores** (Marks, ranks, faculty remarks)
- `/student/certificates` — **My Certificate Requests** (Live status & history trail)
- `/student/admissions` — **My Admission Applications**
- `/student/announcements` — **Notice Board**
- `/student/profile` — **Profile & Password Management**

### C. Admin Control Center (`/admin`)
1. `/admin` — **Dashboard Overview** (Live KPI counters, recent submissions)
2. `/admin/students` — **Student Directory** (Search, toggle active/suspended, delete)
3. `/admin/courses` — **Course Management** (Full CRUD, configure fees, timings, syllabus)
4. `/admin/tuitions` — **School Tuitions (1–10)** (Configure timings, teachers, capacity)
5. `/admin/distance-education` — **Distance Education Management** (AU programs & services)
6. `/admin/faculty` — **Faculty Management** (Add/Edit teacher profiles)
7. `/admin/admissions` — **Admissions Workflow** (Under Review, Approved, Enrolled, assign Student IDs)
8. `/admin/certificates` — **Certificate Requests Pipeline** (Update stages: Submitted, Processed, Ready, Completed)
9. `/admin/materials` — **Study Materials Repository** (Upload & organize downloads)
10. `/admin/attendance` — **Daily Attendance** (Record daily batch attendance)
11. `/admin/results` — **Test Results & Rankings** (Score entry & faculty feedback)
12. `/admin/achievements` — **Achievements & Testimonials** (Manage verified selections)
13. `/admin/announcements` — **Broadcast Notices & Alerts** (Urgent ticker manager)
14. `/admin/enquiries` — **Contact Inquiries** (Visitor messages & follow-up)
15. `/admin/settings` — **Site Configuration & Timeline** (Contact details, registration text, timeline milestones)

---

## 🛡️ Institutional Integrity Rules Complied
- **Zero Fake Statistics**: No fabricated numerical counters ("10,000+ selections") are displayed.
- **Clear Regulatory Disclaimers**: Explicit notices clarify that Ratnam Coaching Centre provides independent guidance and coaching for Andhra University distance education and university certificate recovery, but does not itself award university degrees or issue government certificates.
- **Sample Data Labeled**: All sample records are cleanly designated with `[DEMO DATA]` tags.
