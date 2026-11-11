import React,{useMemo,useState} from 'react';
import { Plus, Search, Filter, Download, Users, CalendarDays, CheckCircle2, X } from 'lucide-react';
import PageHeader from '../PageHeader/PageHeader.jsx';
import Panel from '../Panel/Panel.jsx';
import DataTable from '../DataTable/DataTable.jsx';
import { attendanceRecords, taskRecords, approvalRecords, genericRecords } from '../../data/hrmsMockData.js';
import './ModuleWorkspace.css';

const descriptions={
 'My Workspace':'Your personal tasks, daily reports and assigned employee actions.',
 'My Approvals':'Review requests, check supporting details and record approval decisions.',
 'Employees':'Maintain employee records, departments, employment details and onboarding.',
 'Attendance':'Review daily check-ins, attendance exceptions and working arrangements.',
 'Leave Management':'Manage leave requests, leave balances and approval history.',
 'Work From Home':'Review WFH requests, work plans and remote-work history.',
 'Shift Management':'Manage shift templates, employee assignments and shift changes.',
 'Tasks & Projects':'Track project delivery, task owners, priorities and deadlines.',
 'Recruitment & Interviews':'Manage vacancies, candidate pipeline and interview rounds.',
 'Assessments & Tests':'Create assessments, assign tests and review candidate or employee results.',
 'HR Policies & SOPs':'Publish policies, maintain SOP versions and track acknowledgements.',
 'Training & Learning':'Manage training courses, assignments and learning compliance.',
 'Documents':'Organise company documents, verification status, access and expiry.',
 'Quotations':'Prepare quotations, review approval status and manage client estimates.',
 'Invoices & Billing':'Track invoices, payments, outstanding balances and overdue accounts.',
 'Payroll':'Review payroll periods, exceptions, approvals and salary processing status.',
 'Payslips':'View published salary slips and employee salary-document history.',
 'Reports & Analytics':'Explore HR, attendance, recruitment, finance and performance reports.',
 'Notifications':'Review system alerts, reminders and recent employee updates.',
 'Settings':'Configure company preferences, roles, permissions and approval workflows.'
};
const badgeClass=(value)=>String(value).toLowerCase().replaceAll(' ','-');
export default function ModuleWorkspace({title,description,mode='generic'}) {
 const [query,setQuery]=useState('');const [statusFilter,setStatusFilter]=useState('All statuses');const [showForm,setShowForm]=useState(false);const [notice,setNotice]=useState('');
 const data=useMemo(()=>{
  if(mode==='employees')return attendanceRecords.map(e=>({cells:[<span className="person-cell"><i>{e.initials}</i><span><b>{e.name}</b><small>{e.role}</small></span></span>,e.role,e.shift,e.checkin,<span className={`state-pill ${badgeClass(e.status)}`}>{e.status}</span>]}));
  if(mode==='attendance')return attendanceRecords.map(e=>({cells:[<span className="person-cell"><i>{e.initials}</i><span><b>{e.name}</b><small>{e.role}</small></span></span>,e.shift,e.checkin,'—',<span className={`state-pill ${badgeClass(e.status)}`}>{e.status}</span>]}));
  if(mode==='tasks')return taskRecords.map(t=>({cells:[t.title,t.project,t.due,<span className={`state-pill ${badgeClass(t.priority)}`}>{t.priority}</span>,<span className={`state-pill ${badgeClass(t.status)}`}>{t.status}</span>]}));
  if(mode==='approvals')return approvalRecords.map(a=>({cells:[a.request,a.requester,a.submitted,a.type,<span className={`state-pill ${badgeClass(a.status)}`}>{a.status}</span>]}));
  return (genericRecords[title]||[['Sample record','General','Admin','Active']]).map(r=>({cells:[r[0],r[1],r[2],r[3],<span className={`state-pill ${badgeClass(r[3])}`}>{r[3]}</span>]}));
 },[mode,title]);
 const columns=mode==='employees'?['Employee','Job title','Shift','Last check-in','Status']:mode==='attendance'?['Employee','Shift','Check in','Check out','Status']:mode==='tasks'?['Task','Project','Due date','Priority','Status']:mode==='approvals'?['Request','Requested by','Submitted','Type','Status']:['Name / Reference','Category','Owner / Department','Updated','Status'];
 const filtered=data.filter(r=>r.cells.map(c=>typeof c==='string'?c:(c?.props?.children||'')).join(' ').toLowerCase().includes(query.toLowerCase())&&(statusFilter==='All statuses'||JSON.stringify(r.cells).toLowerCase().includes(statusFilter.toLowerCase())));
 const createLabel=mode==='employees'?'Add employee':mode==='tasks'?'Create task':mode==='approvals'?'New request':`Add ${title.replace(/s$/,'').toLowerCase()}`;
 const submit=()=>{setShowForm(false);setNotice('Demo form saved locally for this session. Connect a backend to persist records.');};
 return <div className="module-workspace">
  <PageHeader title={title} description={description||descriptions[title]}/>
  <div className="module-toolbar"><label className="module-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${title.toLowerCase()}...`}/></label><select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>All statuses</option>{['Pending','Approved','Present','WFH','In Progress','Completed','Published','Ready','Active','Unread'].map(s=><option key={s}>{s}</option>)}</select><button className="outline-btn" onClick={()=>setNotice('Filters are applied to the current demo list.')}><Filter size={15}/> Filters</button><button className="outline-btn" onClick={()=>setNotice('Demo export requested. Configure backend export for production.')}><Download size={15}/> Export</button><button className="solid-btn" onClick={()=>setShowForm(true)}><Plus size={16}/>{createLabel}</button></div>
  <div className="module-summary"><div><span className="summary-icon"><Users size={18}/></span><span><small>Total records</small><b>{mode==='employees'?'22':mode==='tasks'?'28':mode==='approvals'?'12':data.length}</b></span></div><div><span className="summary-icon teal"><CalendarDays size={18}/></span><span><small>Updated this month</small><b>18</b></span></div><div><span className="summary-icon green"><CheckCircle2 size={18}/></span><span><small>Active / completed</small><b>86%</b></span></div></div>
  <Panel title={`${title} overview`} action="More actions" onAction={()=>setNotice('More actions are available when connected to the application backend.')}><DataTable columns={columns} rows={filtered} emptyMessage="No matching records. Try a different search or filter." rowAction={(row)=>setNotice('Record details opened in demo mode.')}/><div className="module-table-footer"><span>Showing {filtered.length} of {data.length} demo records</span><div><button disabled>Previous</button><button className="page-number">1</button><button onClick={()=>setNotice('Only one demo page is currently available.')}>Next</button></div></div></Panel>
  {notice&&<div className="inline-notice"><span>{notice}</span><button onClick={()=>setNotice('')}><X size={15}/></button></div>}
  {showForm&&<div className="modal-overlay" onClick={()=>setShowForm(false)}><form className="module-modal" onSubmit={e=>{e.preventDefault();submit()}} onClick={e=>e.stopPropagation()}><div className="module-modal-heading"><div><h2>{createLabel}</h2><p>Enter basic information to create a demo record.</p></div><button type="button" onClick={()=>setShowForm(false)}><X size={18}/></button></div><label>Name or title<input required placeholder="Enter a name or title"/></label><label>Category<select defaultValue=""><option value="" disabled>Select a category</option><option>Human Resources</option><option>Operations</option><option>Engineering</option><option>Finance</option></select></label><label>Notes<textarea placeholder="Add optional notes"/></label><div className="module-modal-actions"><button type="button" className="outline-btn" onClick={()=>setShowForm(false)}>Cancel</button><button type="submit" className="solid-btn">Save demo record</button></div></form></div>}
 </div>;
}
