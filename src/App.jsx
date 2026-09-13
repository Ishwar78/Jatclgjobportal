import React from 'react';import{Routes,Route,Navigate}from'react-router-dom';
import Home from './pages/Home';import Instructions from './pages/Instructions';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ForgotApplication from './pages/auth/ForgotApplication';
import ForgotRegistration from './pages/auth/ForgotRegistration';
import Personal from './pages/application/Personal';
import References from './pages/application/References';
import Education from './pages/application/Education';
import Experience from './pages/application/Experience';
import AcademicScore from './pages/application/AcademicScore';
import Responsibilities from './pages/application/Responsibilities';
import Research from './pages/application/Research';
import Documents from './pages/application/Documents';
import Payment from './pages/application/Payment';
import Declaration from './pages/application/Declaration';
import Preview from './pages/application/Preview';
import UserDashboard from './pages/user/UserDashboard';
import UserApplications from './pages/user/UserApplications';
import UserProfile from './pages/user/UserProfile';
import UserNotifications from './pages/user/UserNotifications';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminJobs from './pages/admin/AdminJobs';
import AdminCreateJob from './pages/admin/AdminCreateJob';
import AdminApplications from './pages/admin/AdminApplications';
import AdminApplicantDetails from './pages/admin/AdminApplicantDetails';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminPayments from './pages/admin/AdminPayments';
import AdminScores from './pages/admin/AdminScores';
import AdminShortlist from './pages/admin/AdminShortlist';
import AdminInterviews from './pages/admin/AdminInterviews';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminReports from './pages/admin/AdminReports';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminInstructions from './pages/admin/AdminInstructions';
import ApplicationPortal from './pages/application/ApplicationPortal';
export default function App(){
    return <Routes><Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/forgot-application" element={<ForgotApplication/>}/>
    <Route path="/forgot-registration" element={<ForgotRegistration/>}/>
    <Route path="/instructions" element={<ApplicationPortal/>}/>
    <Route path="/application" element={<ApplicationPortal/>}/>
    <Route path="/application/*" element={<ApplicationPortal/>}/>
    <Route path="/user/dashboard" element={<UserDashboard/>}/>
    <Route path="/user/applications" element={<UserApplications/>}/>
    <Route path="/user/profile" element={<UserProfile/>}/>
    <Route path="/user/notifications" element={<UserNotifications/>}/>
    <Route path="/admin" element={<AdminLogin/>}/>
    <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
    <Route path="/admin/users" element={<AdminUsers/>}/>
    <Route path="/admin/instructions" element={<AdminInstructions/>}/>
    <Route path="/admin/jobs" element={<AdminJobs/>}/>
    <Route path="/admin/jobs/create" element={<AdminCreateJob/>}/>
    <Route path="/admin/applications" element={<AdminApplications/>}/>
    <Route path="/admin/applicant" element={<AdminApplicantDetails/>}/>
    <Route path="/admin/documents" element={<AdminDocuments/>}/>
    <Route path="/admin/payments" element={<AdminPayments/>}/>
    <Route path="/admin/scores" element={<AdminScores/>}/>
    <Route path="/admin/shortlist" element={<AdminShortlist/>}/>
    <Route path="/admin/interviews" element={<AdminInterviews/>}/>
    <Route path="/admin/notifications" element={<AdminNotifications/>}/>
    <Route path="/admin/reports" element={<AdminReports/>}/>
    <Route path="/admin/settings" element={<AdminSettings/>}/>
    <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>
}
