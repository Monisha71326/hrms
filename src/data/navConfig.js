// MEG WORLD HRMS — sidebar menu + submenus
// Item format:  'Label'  |  'Label|/custom-path'  |  'Label||count'  |  '#Group heading'
// Default sub path = <parent path>/<slug-of-label>. Paths that already have a page
// (e.g. /invoices, /payslips) are given explicitly so those pages stay reachable.

export const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const raw = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },

  { key: 'employees', label: 'Employees', path: '/employees', icon: 'employees', items: [
    'Employee Directory', 'Employee Profile', 'Departments', 'Designations', 'Teams',
    'Onboarding', 'Offboarding', 'Employee Documents', 'Company Assets'
  ] },

  { key: 'attendance', label: 'Attendance', path: '/attendance', icon: 'attendance', items: [
    '#Attendance & Time',
    'Daily Attendance', 'Check-In / Check-Out', 'Attendance Corrections', 'Missing Punches', 'Timesheets', 'Work Hours', 'Attendance Reports',
    '#Shift Management',
    'Shift Templates', 'Shift Scheduling', 'Employee Shifts', 'Team Schedules', 'Rotational Shifts', 'Shift Swaps', 'Shift Overrides', 'Shift Coverage'
  ] },

  { key: 'leave', label: 'Leave Management', path: '/leave-management', icon: 'leave', items: [
    'Leave Requests||5', 'Leave Types', 'Leave Balances', 'Leave Policies', 'Holiday Calendar', 'Weekly Offs', 'Leave Approvals'
  ] },

  { key: 'wfh', label: 'WFH Monitoring', path: '/work-from-home', icon: 'wfh', items: [
    'WFH Requests', 'WFH Calendar', 'QR Verification', 'Scan History', 'Desktop Sessions', 'Application Usage',
    'Idle / Lock Tracking', 'Device Health', 'Monitoring Exceptions', 'Screenshot Records (Restricted)'
  ] },

  { key: 'recruitment', label: 'Recruitment', path: '/recruitment', icon: 'recruitment', items: [
    'Candidate Portal', 'Candidate Database', 'Job Vacancies', 'Applications', 'Screening', 'Interview Scheduling',
    'Interview Rounds', 'Assessments', 'Scorecards', 'Shortlisting', 'Offers', 'Joining & Onboarding'
  ] },

  { key: 'training', label: 'Training & Learning', path: '/training', icon: 'training', items: [
    '#Assessments',
    'Assessment Library|/assessments', 'MCQ Tests', 'Typing Tests', 'Telecalling Tests', 'Technical Tests',
    'Practical Tests', 'Written Tests', 'Test Results', 'Retakes',
    '#Training',
    'Course Library', 'Training Courses', 'Assigned Training', 'Learning Paths', 'Learning Materials',
    'Training Calendar', 'Training Attendance', 'Completion Records', 'Certifications'
  ] },

  { key: 'projects', label: 'Projects & Tasks', path: '/tasks-projects', icon: 'projects', items: [
    'All Projects', 'My Projects', 'Task Board', 'Task Assignment', 'Subtasks', 'Milestones',
    'Work Reports', 'Deliverables', 'Task Reviews', 'Project Timeline', 'Workload Planning'
  ] },

  { key: 'clients', label: 'Clients & Delivery', path: '/clients-delivery', icon: 'clients', items: [
    'Client 360', 'Client Requirements', 'Client Requests', 'Meeting Notes', 'Client Commitments', 'Complaints & Issues',
    'Bug Tracking', 'Demos', 'UAT', 'Training Records', 'Deployment', 'Client Sign-Off', 'Support & Follow-Ups', 'Client Feedback'
  ] },

  { key: 'sales', label: 'Quotations & Invoices', path: '/quotations', icon: 'sales', items: [
    'Sales Pipeline', 'Leads', 'Quotations|/quotations', 'Quotation Approvals', 'Invoices|/invoices', 'Recurring Invoices',
    'Payment Receipts', 'Outstanding Payments', 'Overdue Invoices', 'Client Contracts', 'Renewals'
  ] },

  { key: 'payroll', label: 'Payroll & Finance', path: '/payroll', icon: 'payroll', items: [
    'Payroll Dashboard', 'Salary Components', 'Monthly Payroll', 'Payroll Review', 'Director Approval', 'Payslips|/payslips',
    'Salary Advances', 'Deductions & Recoveries', 'Reimbursements', 'Expense Claims', 'Payment Records', 'Statutory Reports'
  ] },

  { key: 'performance', label: 'Performance', path: '/performance', icon: 'performance', items: [
    'Goals & KPIs', 'Appraisals', 'Probation Reviews', 'Manager Feedback', 'Employee Self-Review',
    'Performance Plans', 'Recognition', 'Review History'
  ] },

  { key: 'community', label: 'Community', path: '/community', icon: 'community', count: '3', items: [
    'Company Feed', 'Employee Posts', 'Announcements', 'Birthdays', 'Celebrations', 'Events', 'Polls', 'Quizzes',
    'Appreciation', 'Comments & Reactions', 'Reports & Moderation'
  ] },

  { key: 'events', label: 'Events & Calendar', path: '/company-calendar', icon: 'events', items: [
    'Company Calendar', 'Team Calendar', 'Interviews', 'Meetings', 'Training Events', 'Leave Calendar',
    'Shift Calendar', 'Client Meetings', 'Project Deadlines', 'Reminders'
  ] },

  { key: 'policies', label: 'Policies & SOP', path: '/policies', icon: 'policies', items: [
    '#Policies',
    'Policy Library', 'SOP Library', 'Policy Categories', 'Document Versions', 'Effective Dates', 'Acknowledgements',
    'Read Confirmations', 'Policy Training', 'Compliance Tracking',
    '#Documents',
    'Company Documents|/documents', 'Client Documents', 'Contracts', 'Shared Files', 'Document Expiry Alerts', 'Access History'
  ] },

  { key: 'reports', label: 'Reports & Analytics', path: '/reports', icon: 'reports', items: [
    'HR Reports', 'Attendance Reports', 'Leave Reports', 'Workforce Analytics', 'WFH Reports', 'Project Reports',
    'Client Delivery Reports', 'Recruitment Reports', 'Assessment Reports', 'Payroll Reports', 'Finance Reports',
    'Performance Reports', 'Custom Reports'
  ] },

  { key: 'settings', label: 'Settings', path: '/settings', icon: 'settings', items: [
    '#Settings & Integrations',
    'Company Profile', 'Departments & Designations', 'Workweek & Holidays', 'Approval Workflows', 'Payroll Configuration',
    'Assessment Settings', 'Community Upload Limits', 'Email & SMS', 'API Integrations', 'Backup & Retention', 'System Preferences',
    '#Notifications',
    'Notification Center|/notifications', 'Email Notifications', 'In-App Alerts', 'Approval Reminders', 'Overdue Alerts',
    'Escalations', 'Communication Templates',
    '#Security & Audit',
    'User Accounts', 'Roles & Permissions', 'Login History', 'Active Sessions', 'Device Registry', 'Audit Logs',
    'Security Events', 'Access Reviews', 'Data Retention'
  ] }
];

const parse = (parentPath) => (s) => {
  if (s.startsWith('#')) return { heading: s.slice(1) };
  const [label, path, count] = s.split('|');
  return { label, path: path || `${parentPath}/${slug(label)}`, count };
};

export const navMenu = raw.map((g) => ({ ...g, items: (g.items || []).map(parse(g.path)) }));

// Look up a submenu item from its URL (used by the generic sub-page route)
export function findSubByPath(pathname) {
  for (const group of navMenu) {
    const item = group.items.find((i) => i.path === pathname);
    if (item) return { group, item };
  }
  return null;
}
