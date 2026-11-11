export const attendanceRecords=[
 {name:'Rohan Kumar',role:'Product Designer',shift:'General (9:30–6:30)',checkin:'09:25 AM',status:'Present',initials:'RK'},
 {name:'Priya Mehta',role:'Frontend Developer',shift:'Morning (6:00–2:00)',checkin:'06:02 AM',status:'Present',initials:'PM'},
 {name:'Arjun Patel',role:'Backend Developer',shift:'Evening (2:00–10:00)',checkin:'02:05 PM',status:'Present',initials:'AP'},
 {name:'Sneha Iyer',role:'UI/UX Designer',shift:'General (9:30–6:30)',checkin:'—',status:'WFH',initials:'SI'},
 {name:'Karan Verma',role:'QA Engineer',shift:'Night (10:00–6:00)',checkin:'10:03 PM',status:'Present',initials:'KV'}
];
export const taskRecords=[
 {title:'Website UI Design',project:'Meglands 360',due:'14 Oct 2026',priority:'High',status:'In Progress'},
 {title:'Client Meeting Prep',project:'Davuks',due:'14 Oct 2026',priority:'Medium',status:'Pending'},
 {title:'Report Generation',project:'Internal',due:'15 Oct 2026',priority:'Low',status:'Not Started'},
 {title:'Bug Fixing',project:'Pflege Digital',due:'15 Oct 2026',priority:'High',status:'In Progress'},
 {title:'Content Update',project:'QumSkill',due:'16 Oct 2026',priority:'Medium',status:'Pending'}
];
export const approvalRecords=[
 {request:'Annual leave · 2 days',requester:'Priya Mehta',submitted:'Today, 9:10 AM',type:'Leave',status:'Pending'},
 {request:'Work from home request',requester:'Sneha Iyer',submitted:'Today, 8:45 AM',type:'WFH',status:'Pending'},
 {request:'Shift change request',requester:'Arjun Patel',submitted:'Yesterday',type:'Shift',status:'Pending'},
 {request:'Attendance correction',requester:'Rohan Kumar',submitted:'Yesterday',type:'Attendance',status:'In Review'}
];
export const genericRecords={
 'My Workspace':[['My assigned tasks','Tasks','You','In Progress'],['Daily work report','Work report','You','Pending'],['Mandatory policy acknowledgement','Policy','You','Pending']],
 'Recruitment & Interviews':[['Frontend Developer','Vacancy','HR Team','Open'],['HR Executive','Vacancy','HR Team','Screening'],['UI/UX Designer','Candidate pipeline','Recruitment','Interview']],
 'Assessments & Tests':[['Frontend skill assessment','Technical','Recruitment','Active'],['Typing speed test','Typing','Recruitment','Draft'],['Communication evaluation','Interview','HR Team','Active']],
 'HR Policies & SOPs':[['Attendance & Punctuality Policy','Attendance','HR Admin','Published'],['Work From Home Policy','WFH','HR Admin','Published'],['Information Security SOP','Security','IT Admin','Review']],
 'Training & Learning':[['Information Security Basics','Compliance','All employees','In Progress'],['Workplace Conduct','HR','All employees','Completed'],['Manager Essentials','Leadership','Managers','Assigned']],
 'Documents':[['Employee Handbook.pdf','Policy','HR Admin','Verified'],['Q3 Performance Review.xlsx','Report','Director','Restricted'],['Onboarding Checklist.docx','Onboarding','HR Team','Pending']],
 'Quotations':[['QT-2026-014','Client services','Sales','Pending'],['QT-2026-013','Software implementation','Sales','Approved'],['QT-2026-012','Annual support','Accounts','Sent']],
 'Invoices & Billing':[['INV-2026-029','Software services','Accounts','Partially Paid'],['INV-2026-028','Consulting','Accounts','Paid'],['INV-2026-027','Annual support','Accounts','Overdue']],
 'Payroll':[['October 2026 payroll','Payroll run','Accounts','Draft'],['September 2026 payroll','Payroll run','Accounts','Approved'],['Payroll exception review','Exceptions','HR & Accounts','Pending']],
 'Payslips':[['September 2026','Monthly payslip','Employee self-service','Published'],['August 2026','Monthly payslip','Employee self-service','Published'],['July 2026','Monthly payslip','Employee self-service','Published']],
 'Reports & Analytics':[['Monthly attendance summary','Attendance','HR Admin','Ready'],['Recruitment funnel','Recruitment','HR Admin','Ready'],['Department performance','Performance','Director','Ready']],
 'Notifications':[['Leave request awaiting review','Approvals','HR Admin','Unread'],['Shift schedule updated','Shift Management','Employees','Read'],['New policy published','Policies','All employees','Unread']],
 'Settings':[['Company profile','General','Admin','Configured'],['Roles & permissions','Security','Admin','Review'],['Approval workflow','Workflow','Admin','Configured']]
};
