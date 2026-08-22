import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import CompetitiveExamsPage from './pages/public/CompetitiveExamsPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import SchoolTuitionsPage from './pages/public/SchoolTuitionsPage';
import DistanceEducationPage from './pages/public/DistanceEducationPage';
import FacultyPage from './pages/public/FacultyPage';
import AchievementsPage from './pages/public/AchievementsPage';
import CertificateAssistancePage from './pages/public/CertificateAssistancePage';
import CertificateTrackingPage from './pages/public/CertificateTrackingPage';
import AdmissionsPage from './pages/public/AdmissionsPage';
import ContactPage from './pages/public/ContactPage';
import StudentLoginPage from './pages/public/StudentLoginPage';
import StudentRegisterPage from './pages/public/StudentRegisterPage';
import AdminLoginPage from './pages/public/AdminLoginPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Student Portal Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyCoursesPage from './pages/student/MyCoursesPage';
import StudyMaterialsPage from './pages/student/StudyMaterialsPage';
import AttendancePage from './pages/student/AttendancePage';
import ResultsPage from './pages/student/ResultsPage';
import MyCertificateRequestsPage from './pages/student/MyCertificateRequestsPage';
import MyAdmissionsPage from './pages/student/MyAdmissionsPage';
import AnnouncementsPage from './pages/student/AnnouncementsPage';
import StudentProfilePage from './pages/student/StudentProfilePage';

// Admin Panel Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminCourses from './pages/admin/AdminCourses';
import AdminTuitions from './pages/admin/AdminTuitions';
import AdminDistanceEd from './pages/admin/AdminDistanceEd';
import AdminFaculty from './pages/admin/AdminFaculty';
import AdminAdmissions from './pages/admin/AdminAdmissions';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminMaterials from './pages/admin/AdminMaterials';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminResults from './pages/admin/AdminResults';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="courses" element={<CompetitiveExamsPage />} />
            <Route path="courses/:slug" element={<CourseDetailPage />} />
            <Route path="school-tuitions" element={<SchoolTuitionsPage />} />
            <Route path="distance-education" element={<DistanceEducationPage />} />
            <Route path="faculty" element={<FacultyPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="certificate-assistance" element={<CertificateAssistancePage />} />
            <Route path="certificate-tracking" element={<CertificateTrackingPage />} />
            <Route path="admissions" element={<AdmissionsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="student/login" element={<StudentLoginPage />} />
            <Route path="student/register" element={<StudentRegisterPage />} />
            <Route path="admin/login" element={<AdminLoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Student Portal Protected Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<MyCoursesPage />} />
            <Route path="materials" element={<StudyMaterialsPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="certificates" element={<MyCertificateRequestsPage />} />
            <Route path="admissions" element={<MyAdmissionsPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="profile" element={<StudentProfilePage />} />
          </Route>

          {/* Admin Control Center Protected Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="tuitions" element={<AdminTuitions />} />
            <Route path="distance-education" element={<AdminDistanceEd />} />
            <Route path="faculty" element={<AdminFaculty />} />
            <Route path="admissions" element={<AdminAdmissions />} />
            <Route path="certificates" element={<AdminCertificates />} />
            <Route path="materials" element={<AdminMaterials />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="results" element={<AdminResults />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="settings" element={<AdminSiteSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
