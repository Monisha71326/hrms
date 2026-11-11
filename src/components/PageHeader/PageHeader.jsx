import React from 'react';
import { CalendarDays, ChevronDown, Hand } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './PageHeader.css';

const labels={'/dashboard':'Dashboard','/my-workspace':'My Workspace','/approvals':'My Approvals','/employees':'Employees','/attendance':'Attendance','/leave-management':'Leave Management','/work-from-home':'Work From Home','/shift-management':'Shift Management','/tasks-projects':'Tasks & Projects','/recruitment':'Recruitment & Interviews','/assessments':'Assessments & Tests','/policies':'HR Policies & SOPs','/training':'Training & Learning','/documents':'Documents','/quotations':'Quotations','/invoices':'Invoices & Billing','/payroll':'Payroll','/payslips':'Payslips','/reports':'Reports & Analytics','/company-calendar':'Company Calendar','/notifications':'Notifications','/settings':'Settings'};

function WaveIcon(){
 return <span className="greeting-wave" aria-hidden="true">
  <svg width="0" height="0" style={{position:'absolute'}}>
   <defs>
    <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
     <stop offset="0%" stopColor="#1688f8"/>
     <stop offset="100%" stopColor="#035096"/>
    </linearGradient>
   </defs>
  </svg>
  <Hand size={26} strokeWidth={2} stroke="url(#waveGrad)"/>
 </span>;
}

export default function PageHeader({title,description}) {
 const {pathname}=useLocation();
 const pageTitle=title||labels[pathname]||'Dashboard';
 const sub=description||(pathname==='/dashboard'?"Here's what's happening at MEG WORLD TECHNOLOGIES today.":`Manage ${pageTitle.toLowerCase()} and keep your team operations moving.`);
 const date=new Date().toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short',year:'numeric'});
 return <div className="page-header">
  <div>
   <div className="page-breadcrumb">Workspace <span>/</span> {pageTitle}</div>
   <h1>{pathname==='/dashboard'?<>Good Morning, Emmanuel! <WaveIcon/></>:pageTitle}</h1>
   <p>{sub}</p>
  </div>
  <button className="page-date"><CalendarDays size={18}/><b>{date}</b><ChevronDown size={15}/></button>
 </div>;
}