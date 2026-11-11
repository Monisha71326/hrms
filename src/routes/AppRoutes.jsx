import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage.jsx';
import MyWorkspacePage from '../pages/MyWorkspace/MyWorkspacePage.jsx';
import ApprovalsPage from '../pages/Approvals/ApprovalsPage.jsx';
import EmployeesPage from '../pages/Employees/EmployeesPage.jsx';
import AttendancePage from '../pages/Attendance/AttendancePage.jsx';
import LeaveManagementPage from '../pages/LeaveManagement/LeaveManagementPage.jsx';
import WorkFromHomePage from '../pages/WorkFromHome/WorkFromHomePage.jsx';
import ShiftManagementPage from '../pages/ShiftManagement/ShiftManagementPage.jsx';
import TasksProjectsPage from '../pages/TasksProjects/TasksProjectsPage.jsx';
import RecruitmentPage from '../pages/Recruitment/RecruitmentPage.jsx';
import AssessmentsPage from '../pages/Assessments/AssessmentsPage.jsx';
import PoliciesPage from '../pages/Policies/PoliciesPage.jsx';
import TrainingPage from '../pages/Training/TrainingPage.jsx';
import DocumentsPage from '../pages/Documents/DocumentsPage.jsx';
import QuotationsPage from '../pages/Quotations/QuotationsPage.jsx';
import InvoicesPage from '../pages/Invoices/InvoicesPage.jsx';
import PayrollPage from '../pages/Payroll/PayrollPage.jsx';
import PayslipsPage from '../pages/Payslips/PayslipsPage.jsx';
import ReportsPage from '../pages/Reports/ReportsPage.jsx';
import CompanyCalendarPage from '../pages/CompanyCalendar/CompanyCalendarPage.jsx';
import NotificationsPage from '../pages/Notifications/NotificationsPage.jsx';
import SettingsPage from '../pages/Settings/SettingsPage.jsx';
import SubModulePage from '../pages/SubModule/SubModulePage.jsx';
import ModuleWorkspace from '../components/ModuleWorkspace/ModuleWorkspace.jsx';

export function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/my-workspace" element={<MyWorkspacePage />} />
    <Route path="/approvals" element={<ApprovalsPage />} />
    <Route path="/employees" element={<EmployeesPage />} />
    <Route path="/employees/employee-directory" element={<EmployeesPage />} />
    <Route path="/attendance" element={<AttendancePage />} />
    <Route path="/leave-management" element={<LeaveManagementPage />} />
    <Route path="/work-from-home" element={<WorkFromHomePage />} />
    <Route path="/shift-management" element={<ShiftManagementPage />} />
    <Route path="/tasks-projects" element={<TasksProjectsPage />} />
    <Route path="/recruitment" element={<RecruitmentPage />} />
    <Route path="/assessments" element={<AssessmentsPage />} />
    <Route path="/policies" element={<PoliciesPage />} />
    <Route path="/training" element={<TrainingPage />} />
    <Route path="/documents" element={<DocumentsPage />} />
    <Route path="/quotations" element={<QuotationsPage />} />
    <Route path="/invoices" element={<InvoicesPage />} />
    <Route path="/payroll" element={<PayrollPage />} />
    <Route path="/payslips" element={<PayslipsPage />} />
    <Route path="/reports" element={<ReportsPage />} />
    <Route path="/company-calendar" element={<CompanyCalendarPage />} />
    <Route path="/notifications" element={<NotificationsPage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/clients-delivery" element={<ModuleWorkspace title="Clients & Delivery" description="Client requirements, commitments, delivery milestones, UAT and sign-offs." />} />
    <Route path="/performance" element={<ModuleWorkspace title="Performance" description="Goals, KPIs, appraisals, probation reviews and recognition." />} />
    <Route path="/community" element={<ModuleWorkspace title="Community" description="Company feed, announcements, celebrations, polls and appreciation." />} />
    <Route path="/:module/:sub" element={<SubModulePage />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>;
}
