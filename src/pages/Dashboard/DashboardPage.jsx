import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UsersRound, UserCheck, House, Plane, CalendarDays, FileText, FileSpreadsheet, Handshake, Receipt,
  ArrowUp, ArrowDown, Plus, ChevronDown, MoreHorizontal, Target, Building2, ShieldCheck,
  Palette, ChartNoAxesColumnIncreasing, FolderCheck, UserPlus, Fingerprint, CalendarPlus, FilePlus2,
  ListTodo, CalendarRange, UserRoundSearch, BriefcaseBusiness, CheckCheck,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
  AreaChart, Area, Tooltip, ReferenceLine,
} from 'recharts';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import Panel from '../../components/Panel/Panel.jsx';
import '../../components/DataTable/DataTable.css';
import '../../components/StatCard/StatCard.css';
import './DashboardPage.css';

/* ---------- sample data (swap with your API / mock data) ---------- */
/* ---------- period-dependent data (Today / This Week / This Month / This Year) ---------- */
// att = [present, wfh, on leave, absent, holiday] · tasks = [done, in progress, pending, overdue]
// rec = [total, shortlisted, interview, offer] · q/p/i = [count, amount, pending|follow-up|overdue]
// fin = [value, % vs previous] · targets = [[value, %] × 5]
const PERIODS = {
  Today: {
    prev: 'yesterday', total: { v: 122, sub: 'No change vs yesterday', up: false },
    att: [87, 24, 3, 4, 4], tasks: [12, 8, 4, 2], rec: [12, 3, 2, 1], joiners: 0,
    q: [2, '₹3.5L', 1], p: [1, '₹2.2L', 1], i: [3, '₹1.8L', 0],
    fin: { income: ['₹0.9L', 6], expense: ['₹0.4L', 3], profit: ['₹0.5L', 9] },
    ie: { income: '₹1.8L', expense: '₹0.4L', profit: '₹0.5L', labels: ['9 AM', '11 AM', '1 PM', '3 PM', '5 PM'], inc: [0.2, 0.6, 0.4, 0.9, 0.7], exp: [0.1, 0.2, 0.3, 0.2, 0.3] },
    target: { name: 'Daily Target', total: '₹0.5L', got: '₹0.2L', pct: 40 },
    targets: [['₹0.5L', 40], ['1', 50], ['3', 60], ['2', 50], ['2', 70]],
    hours: { sub: '(Today · by shift)', labels: ['Morning', 'Day', 'Evening', 'Night'], v: [8.0, 8.4, 7.6, 6.9], light: [] },
  },
  'This Week': {
    prev: 'last week', total: { v: 122, sub: '2 new vs last week', up: true },
    att: [84, 22, 5, 6, 5], tasks: [22, 14, 7, 4], rec: [28, 8, 5, 3], joiners: 2,
    q: [5, '₹9.2L', 2], p: [3, '₹6.1L', 1], i: [8, '₹4.6L', 2],
    fin: { income: ['₹2.4L', 11], expense: ['₹1.5L', 8], profit: ['₹0.9L', 14] },
    ie: { income: '₹4.6L', expense: '₹1.5L', profit: '₹0.9L', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], inc: [0.8, 0.5, 0.7, 0.9, 1.0, 0.3, 0.1], exp: [0.4, 0.3, 0.5, 0.3, 0.4, 0.2, 0.1] },
    target: { name: 'Weekly Target', total: '₹2.5L', got: '₹0.9L', pct: 36 },
    targets: [['₹2.5L', 36], ['3', 45], ['5', 55], ['3', 65], ['3', 72]],
    hours: { sub: '(This Week)', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], v: [8.2, 7.6, 8.1, 7.9, 8.3, 4.1, 0], light: ['Sat'] },
  },
  'This Month': {
    prev: 'last month', total: { v: 122, sub: '5% vs last month', up: true },
    att: [87, 24, 3, 4, 4], tasks: [32, 20, 10, 6], rec: [68, 18, 8, 6], joiners: 6,
    q: [12, '₹24.8L', 5], p: [7, '₹18.5L', 3], i: [26, '₹12.4L', 4],
    fin: { income: ['₹8.6L', 18], expense: ['₹5.8L', 12], profit: ['₹2.8L', 28] },
    ie: { income: '₹12.4L', expense: '₹5.8L', profit: '₹2.8L', labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], inc: [3, 5, 3.5, 5.5], exp: [2, 4, 2.5, 4] },
    target: { name: 'Monthly Target', total: '₹10.0L', got: '₹2.8L', pct: 28 },
    targets: [['₹10.0L', 28], ['10', 50], ['20', 60], ['10', 70], ['8', 75]],
    hours: { sub: '(This Week)', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], v: [8.2, 7.6, 8.1, 7.9, 8.3, 4.1, 0], light: ['Sat'] },
  },
  'This Year': {
    prev: 'last year', total: { v: 122, sub: '12% vs last year', up: true },
    att: [82, 20, 8, 7, 5], tasks: [310, 120, 48, 22], rec: [610, 140, 64, 48], joiners: 41,
    q: [138, '₹2.9Cr', 41], p: [82, '₹2.1Cr', 26], i: [301, '₹1.5Cr', 34],
    fin: { income: ['₹1.04Cr', 22], expense: ['₹68L', 15], profit: ['₹36L', 31] },
    ie: { income: '₹1.5Cr', expense: '₹68L', profit: '₹36L', labels: ['Q1', 'Q2', 'Q3', 'Q4'], inc: [24, 28, 22, 30], exp: [15, 18, 16, 19] },
    target: { name: 'Yearly Target', total: '₹1.2Cr', got: '₹74L', pct: 62 },
    targets: [['₹1.2Cr', 62], ['120', 70], ['160', 75], ['90', 68], ['45', 80]],
    hours: { sub: '(This Year · by quarter)', labels: ['Q1', 'Q2', 'Q3', 'Q4'], v: [7.9, 8.0, 8.1, 8.2], light: [] },
  },
};
const ATT_META = [['Present', '#035096'], ['WFH', '#7d6df0'], ['On Leave', '#ffa944'], ['Absent', '#f56aa6'], ['Holiday', '#b6c4e0']];
const TASK_META = [['Completed', '#035096'], ['In Progress', '#7d6df0'], ['Pending', '#ffa944'], ['Overdue', '#f56aa6']];
const REC_META = [['Total', '#1b6bc41f'], ['Shortlisted', '#13b96b24'], ['Interview', '#ffa94430'], ['Offer', '#7d6df026']];
const TARGET_META = [
  ['Revenue Target', '#035096', FileText], ['New Clients', '#3b8ee0', UsersRound],
  ['Quotations', '#7d6df0', ChartNoAxesColumnIncreasing], ['Proposals', '#ffa944', Handshake], ['Project Delivery', '#35b6c9', FolderCheck],
];
const toDonut = (meta, vals) => {
  const sum = vals.reduce((a, b) => a + b, 0);
  return meta.map(([name, color], i) => ({ name, color, value: vals[i], pct: `${Math.round((vals[i] / sum) * 100)}%` }));
};
const candidates = [
  ['AS', 'Anjali Sharma', 'PHP Developer', 'Interview', ''],
  ['VK', 'Vignesh Kumar', 'Flutter Developer', 'Shortlisted', 'a1'],
  ['MN', 'Meera Nair', 'Digital Marketing', 'Test Scheduled', 'a2'],
  ['AP', 'Arun Prakash', 'Telecaller', 'Applied', 'a3'],
];

/* ---------- Quick Action menu (routes come from navConfig.js) ---------- */
const QUICK_ACTIONS = [
  [UserPlus, 'Add Employee', '/employees/onboarding'],
  [Fingerprint, 'Mark Attendance', '/attendance/check-in-check-out'],
  [CalendarPlus, 'Apply Leave', '/leave-management/leave-requests'],
  [CheckCheck, 'Approve Leaves', '/leave-management/leave-approvals'],
  [FileSpreadsheet, 'New Quotation', '/quotations'],
  [FilePlus2, 'Create Invoice', '/invoices'],
  [ListTodo, 'Assign Task', '/tasks-projects/task-assignment'],
  [BriefcaseBusiness, 'Add Client', '/clients-delivery/client-360'],
  [UserRoundSearch, 'Post a Job Vacancy', '/recruitment/job-vacancies'],
  [CalendarRange, 'Schedule Meeting', '/company-calendar/meetings'],
];
function QuickAction() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const go = useNavigate();
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <div className="mw-qa" ref={ref}>
      <button type="button" className="mw-quick" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Plus size={15} /> Quick Action <ChevronDown size={14} className={open ? 'mw-rot' : ''} />
      </button>
      {open && (
        <div className="mw-qa-menu" role="menu">
          {QUICK_ACTIONS.map(([Icon, label, to]) => (
            <button type="button" role="menuitem" key={label} onClick={() => { setOpen(false); go(to); }}>
              <span className="mw-qa-ico"><Icon size={15} /></span>{label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const events = [
  ['#035096', '10:00 AM - 11:00 AM', 'Team Meeting', null],
  ['#f56aa6', '11:30 AM - 12:00 PM', 'Interview - PHP Developer', 'Interview'],
  ['#13b96b', '02:00 PM - 03:00 PM', 'Client Demo - VLC Properties', 'Client'],
  ['#ffa944', '04:00 PM - 05:00 PM', 'Proposal Discussion - Cookscape', 'Proposal'],
  ['#f56aa6', '06:00 PM - 06:30 PM', 'Review Quotations', 'Sales'],
];
const urgency = [
  [Building2, 'VLC Properties', 'High', 'Payment pending (₹5,00,000)', 'Due in 3 days'],
  [ShieldCheck, 'Secure Recruit Ltd', 'High', 'Demo & UAT access', 'Client waiting'],
  [Palette, 'Pflege Digital', 'Medium', 'Send final proposal', 'Due tomorrow'],
  [Building2, 'Cookscape Interiors', 'Medium', 'Bug fix and training', 'Client follow-up'],
  [House, 'Sowrem Promoters', 'Low', 'Need updated quotation', 'Next week'],
];
const quotations = [
  ['QTN-001', 'VLC Properties', '₹3,50,000', 'Sent', '15 Oct'],
  ['QTN-002', 'Sharon Real Estates', '₹2,80,000', 'Pending', 'Tomorrow'],
  ['QTN-003', 'Secure Recruit Ltd', '₹4,20,000', 'Pending', '16 Oct'],
  ['QTN-004', 'Cookscape Interiors', '₹1,50,000', 'Approved', '-'],
  ['QTN-005', 'Sauram Promoters', '₹2,20,000', 'Draft', '18 Oct'],
];
const proposals = [
  ['PRP-001', 'Pflege Digital', '₹6,00,000', 'Sent', '17 Oct'],
  ['PRP-002', 'VLC Properties', '₹4,50,000', 'Pending', '19 Oct'],
  ['PRP-003', 'Cookscape Interiors', '₹3,20,000', 'Approved', '-'],
  ['PRP-004', 'Secure Recruit Ltd', '₹4,80,000', 'Draft', '21 Oct'],
  ['PRP-005', 'Sowrem Promoters', '₹2,00,000', 'Sent', '20 Oct'],
];
const invoices = [
  ['INV-001', 'Pflege Digital', '₹3,00,000', 'Paid', '-'],
  ['INV-002', 'VLC Properties', '₹2,50,000', 'Pending', '20 Oct'],
  ['INV-003', 'Secure Recruit', '₹4,00,000', 'Overdue', '10 Oct'],
  ['INV-004', 'Cookscape', '₹1,20,000', 'Pending', '22 Oct'],
  ['INV-005', 'Sowrem Promoters', '₹1,80,000', 'Paid', '-'],
];
const payments = [
  ['PAY-014', 'Pflege Digital', '₹3,00,000', 'Paid', '12 Oct'],
  ['PAY-013', 'Sowrem Promoters', '₹1,80,000', 'Paid', '10 Oct'],
  ['PAY-012', 'VLC Properties', '₹2,00,000', 'Paid', '08 Oct'],
  ['PAY-011', 'Sharon Real Estates', '₹1,50,000', 'Paid', '05 Oct'],
  ['PAY-010', 'Cookscape', '₹90,000', 'Paid', '02 Oct'],
];
const todoSeed = [
  ['Review final proposal - VLC Properties', '09:00 AM', 'High', true],
  ['Approve employee leave requests', '10:00 AM', 'Medium', true],
  ['Client demo preparation - Cookscape', '01:00 PM', 'High', false],
  ['Follow up - Secure Recruit payment', '03:00 PM', 'High', false],
  ['Review quotations and send updates', '05:00 PM', 'Medium', true],
];
const followUps = [
  ['Secure Recruit Ltd', 'INV-003', '₹4,00,000', '4 days', 'Call Now', 'blue'],
  ['VLC Properties', 'INV-002', '₹2,50,000', '2 days', 'Send Reminder', 'blue'],
  ['Cookscape Interiors', 'INV-007', '₹1,20,000', '1 day', 'Follow Up', 'amber'],
  ['Sharon Real Estates', 'INV-006', '₹1,80,000', 'Due Today', 'Call Now', 'blue'],
];
const activities = [
  ['PR', 'Priya submitted WFH check-in', '2 minutes ago', 'WFH', ''],
  ['RO', 'Rohit completed task: API Integration', '18 minutes ago', 'Project', 'a1'],
  ['VL', 'Client demo scheduled with VLC Properties', '1 hour ago', 'Client', 'a2'],
  ['SN', 'Birthday wish post by Sneha', '2 hours ago', 'Community', 'a3'],
];

const TONE = {
  Sent: 'green', Paid: 'green', Approved: 'green', Shortlisted: 'green', Low: 'green', WFH: 'green',
  Pending: 'amber', Medium: 'amber', 'Test Scheduled': 'amber', Proposal: 'amber', Community: 'amber',
  High: 'red', Overdue: 'red', Sales: 'red',
  Interview: 'blue', Client: 'blue',
  Draft: 'grey', Applied: 'grey', Project: 'grey',
};
const Pill = ({ children }) => <span className={`mw-pill ${TONE[children] || 'grey'}`}>{children}</span>;
const dueColor = (v) => (v === '-' ? '' : v === 'Tomorrow' ? 'mw-text-amber' : 'mw-text-red');

/* ---------- building blocks ---------- */
// Tile re-uses the theme's metric-card + metric-icon so it picks up the glass + gradient look.
const Tile = ({ Icon, color, value, title, sub, trend, progress, foot, className = '', children }) => (
  <article className={`metric-card ${className}`}>
    {children || <div className={`metric-icon ${color}`}><Icon size={26} /></div>}
    <div className="metric-copy">
      <strong>{value}</strong>
      <b>{title}</b>
      {sub && (
        <small className={trend ? (trend === 'up' ? 'mw-up' : 'mw-down') : ''}>
          {trend && <ArrowUp size={11} />}{sub}
        </small>
      )}
      {progress != null && <div className="mw-meter"><i style={{ width: `${progress}%` }} /></div>}
    </div>
    {foot}
  </article>
);
const Foot = ({ amount, chip, tone }) => (
  <div className="mw-foot"><span>{amount}</span><span className={`mw-pill ${tone}`}>{chip}</span></div>
);
const Trend = ({ text, down }) => (
  <div className="mw-foot"><small className={down ? 'mw-down' : 'mw-up'}><ArrowUp size={11} /> {text}</small></div>
);

/* ---------- interactive charts ---------- */
const R = 38;
const CIRC = 2 * Math.PI * R;

// Donut drawn with SVG: segments sweep in, hovered slice pops out, centre label + legend follow the hover, click pins a slice.
function DonutCard({ data, total, label, size = 132 }) {
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState(null);
  const [pin, setPin] = useState(null);
  useEffect(() => { const t = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(t); }, []);
  const active = hover ?? pin;
  const sum = data.reduce((a, b) => a + b.value, 0);
  let cum = 0;
  const segs = data.map((d) => {
    const start = (cum / sum) * CIRC; cum += d.value;
    return { ...d, start, len: Math.max((d.value / sum) * CIRC - 2.6, 0.6) };
  });
  const cur = active != null ? data[active] : null;
  const toggle = (i) => setPin((p) => (p === i ? null : i));
  return (
    <div className="mw-donut-row">
      <div className="mw-donut" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" onMouseLeave={() => setHover(null)}>
          <circle cx="50" cy="50" r={R} fill="none" stroke="#ffffff99" strokeWidth="12" />
          <g transform="rotate(-90 50 50)">
            {segs.map((s, i) => (
              <circle
                key={s.name} cx="50" cy="50" r={R} fill="none" stroke={s.color} className="mw-seg"
                strokeWidth={active === i ? 17 : 12}
                strokeDasharray={`${ready ? s.len : 0} ${CIRC}`} strokeDashoffset={-s.start}
                style={{ opacity: active != null && active !== i ? 0.32 : 1, filter: active === i ? `drop-shadow(0 3px 6px ${s.color}99)` : 'none', transitionDelay: `${i * 110}ms,0s,0s,0s` }}
                onMouseEnter={() => setHover(i)} onClick={() => toggle(i)}
              />
            ))}
          </g>
        </svg>
        <div className="mw-donut-label">
          <b key={cur ? cur.name : 'total'} className="mw-pop">{cur ? cur.value : total}</b>
          <span>{cur ? cur.name : label}</span>
        </div>
      </div>
      <div className="mw-legend">
        {data.map((d, i) => (
          <div
            key={d.name} tabIndex={0} role="button" aria-pressed={pin === i}
            className={`${active === i ? 'is-active' : ''} ${active != null && active !== i ? 'is-dim' : ''}`}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
            onClick={() => toggle(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); } }}
          >
            <i style={{ background: d.color }} /><span>{d.name}</span><b>{d.value}</b><em>{d.pct}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

const GlassTip = ({ active, payload, label, rows }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="mw-tip">
      <b>{label}</b>
      {rows(payload, label).map((r) => (
        <div key={r.name}><i style={{ background: r.color }} /><span>{r.name}</span><strong className={r.cls || ''}>{r.value}</strong></div>
      ))}
    </div>
  );
};

// Work hours: hovered bar lifts + glows, the rest dim; click pins a bar and shows its detail chip.
function HoursChart({ data, light }) {
  const [hover, setHover] = useState(null);
  const [pin, setPin] = useState(null);
  const active = hover ?? pin;
  const sel = active != null ? data[active] : null;
  const diff = sel ? +(sel.h - 8).toFixed(1) : 0;
  return (
    <>
      <div className="mw-hint">
        {sel
          ? <span key={`${sel.day}${pin === active ? 'p' : 'h'}`} className="mw-chip-info">
              <b>{sel.day}</b> {sel.h ? `${sel.h}h logged` : 'No hours logged'}
              {sel.h > 0 && <em className={diff >= 0 ? 'up' : 'down'}>{diff >= 0 ? '+' : ''}{diff}h vs 8h target</em>}
              {pin === active && <u>pinned</u>}
            </span>
          : <span className="mw-hint-text">Hover a bar · click to pin</span>}
      </div>
      <div className="mw-chart mw-chart-sm">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 18, right: 4, left: -18, bottom: 0 }} onMouseLeave={() => setHover(null)}>
            <defs>
              <linearGradient id="mwBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f9be6" /><stop offset="100%" stopColor="#035096" /></linearGradient>
              <linearGradient id="mwBarHot" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7d6df0" /><stop offset="100%" stopColor="#035096" /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 3" vertical={false} stroke="#ffffffcc" />
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#6580a8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tickFormatter={(v) => `${v}h`} tick={{ fontSize: 10, fill: '#6580a8' }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'rgba(3,80,150,.08)', radius: 10 }} wrapperStyle={{ outline: 'none', zIndex: 30 }}
              content={<GlassTip rows={(p) => [{ name: 'Hours', color: '#035096', value: `${p[0].value}h` }, { name: 'vs target', color: p[0].value >= 8 ? '#13b96b' : '#f56aa6', value: `${p[0].value - 8 >= 0 ? '+' : ''}${(p[0].value - 8).toFixed(1)}h`, cls: p[0].value >= 8 ? 'up' : 'down' }]} />} />
            <Bar dataKey="h" radius={[8, 8, 0, 0]} maxBarSize={28} animationDuration={900} animationEasing="ease-out"
              onMouseEnter={(_, i) => setHover(i)} onMouseLeave={() => setHover(null)} onClick={(_, i) => setPin((p) => (p === i ? null : i))} style={{ cursor: 'pointer' }}>
              {data.map((x, i) => (
                <Cell key={x.day} fill={active === i ? 'url(#mwBarHot)' : light.includes(x.day) ? '#b3cff3' : 'url(#mwBar)'}
                  style={{ opacity: active != null && active !== i ? 0.4 : 1, transformBox: 'fill-box', transformOrigin: '50% 100%', transform: active === i ? 'scale(1.14,1.04)' : 'none', filter: active === i ? 'drop-shadow(0 6px 8px rgba(3,80,150,.4))' : 'none', transition: 'transform .25s cubic-bezier(.3,1.4,.5,1),opacity .2s,filter .2s' }} />
              ))}
              <LabelList dataKey="h" position="top" formatter={(v) => `${v}h`} style={{ fontSize: 10, fontWeight: 700, fill: '#0f2a55' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

const PulseDot = ({ cx, cy, stroke }) => (
  <g>
    <circle cx={cx} cy={cy} r="7" fill={stroke} opacity=".28" className="mw-pulse" />
    <circle cx={cx} cy={cy} r="4.5" fill="#fff" stroke={stroke} strokeWidth="2.5" />
  </g>
);

// Income vs expense: crosshair + pulsing dots + glass tooltip; click pins a point (reference line + detail chip).
function FlowChart({ data }) {
  const [pin, setPin] = useState(null);
  const [hov, setHov] = useState(null);
  const idx = hov ?? pin;
  const sel = idx != null ? data[idx] : null;
  const net = sel ? +(sel.income - sel.expense).toFixed(2) : 0;
  const L = (v) => `₹${v}L`;
  const find = (s) => (s && s.activeLabel != null ? data.findIndex((x) => x.w === s.activeLabel) : -1);
  return (
    <>
      <div className="mw-hint">
        {sel
          ? <span key={`${sel.w}${pin === idx ? 'p' : 'h'}`} className="mw-chip-info">
              <b>{sel.w}</b> {L(sel.income)} in · {L(sel.expense)} out<em className={net >= 0 ? 'up' : 'down'}>net {L(net)}</em>{pin === idx && <u>pinned</u>}
            </span>
          : <span className="mw-hint-text">Hover the chart · click to pin a point</span>}
      </div>
      <div className="mw-chart-fill"><div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 6, right: 8, left: -22, bottom: 0 }}
            onMouseMove={(s) => { const i = find(s); setHov(i >= 0 ? i : null); }} onMouseLeave={() => setHov(null)}
            onClick={(s) => { const i = find(s); if (i >= 0) setPin((p) => (p === i ? null : i)); }} style={{ cursor: 'pointer' }}>
            <defs>
              <linearGradient id="mwInc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#035096" stopOpacity=".34" /><stop offset="100%" stopColor="#035096" stopOpacity=".02" /></linearGradient>
              <linearGradient id="mwExp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f56aa6" stopOpacity=".3" /><stop offset="100%" stopColor="#f56aa6" stopOpacity=".02" /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 3" vertical={false} stroke="#ffffffcc" />
            <XAxis dataKey="w" tick={{ fontSize: 10, fill: '#6580a8' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 'auto']} tickCount={5} tickFormatter={(v) => (v ? `${v}L` : '0')} tick={{ fontSize: 10, fill: '#6580a8' }} axisLine={false} tickLine={false} />
            {pin != null && <ReferenceLine x={data[pin].w} stroke="#035096" strokeWidth={1.5} strokeDasharray="4 3" />}
            <Tooltip cursor={{ stroke: '#035096', strokeWidth: 1.5, strokeDasharray: '4 4' }} wrapperStyle={{ outline: 'none', zIndex: 30 }}
              content={<GlassTip rows={(p) => { const inc = p.find((x) => x.dataKey === 'income').value; const exp = p.find((x) => x.dataKey === 'expense').value; const n = +(inc - exp).toFixed(2);
                return [{ name: 'Income', color: '#035096', value: L(inc) }, { name: 'Expense', color: '#f56aa6', value: L(exp) }, { name: 'Net', color: n >= 0 ? '#13b96b' : '#f56aa6', value: L(n), cls: n >= 0 ? 'up' : 'down' }]; }} />} />
            <Area type="monotone" dataKey="income" stroke="#035096" strokeWidth={2.5} fill="url(#mwInc)" dot={{ r: 3, strokeWidth: 0, fill: '#035096' }} activeDot={<PulseDot />} animationDuration={1000} />
            <Area type="monotone" dataKey="expense" stroke="#f56aa6" strokeWidth={2.5} fill="url(#mwExp)" dot={{ r: 3, strokeWidth: 0, fill: '#f56aa6' }} activeDot={<PulseDot />} animationDuration={1200} />
          </AreaChart>
        </ResponsiveContainer>
      </div></div>
    </>
  );
}
const Tabs = ({ tabs, value, onChange }) => (
  <div className="mw-tabs">
    {tabs.map((t) => <button key={t} type="button" className={value === t ? 'on' : ''} onClick={() => onChange(t)}>{t}</button>)}
  </div>
);
const Table = ({ head, rows, lastColor }) => (
  <div className="data-table-wrap">
    <table className="hrms-table">
      <thead><tr>{head.map((h, i) => <th key={h} className={i === 2 ? 'r' : ''}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r[0]}>
            <td>{r[0]}</td><td>{r[1]}</td><td className="amt r">{r[2]}</td>
            <td><Pill>{r[3]}</Pill></td><td className={lastColor(r[4])}>{r[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------- page ---------- */
export default function DashboardPage() {
  const go = useNavigate();
  const [period, setPeriod] = useState('This Month');
  const [qTab, setQTab] = useState('Quotations');
  const [iTab, setITab] = useState('Recent Invoices');
  const [todos, setTodos] = useState(todoSeed.map(([text, time, pr, done]) => ({ text, time, pr, done })));
  const toggle = (i) => setTodos((t) => t.map((x, k) => (k === i ? { ...x, done: !x.done } : x)));

  const d = PERIODS[period];
  const attendance = toDonut(ATT_META, d.att);
  const tasks = toDonut(TASK_META, d.tasks);
  const headcount = d.att.reduce((a, b) => a + b, 0);
  const pctOf = (v) => Math.round((v / headcount) * 100);
  const avg = period === 'This Week' || period === 'This Year'; // snapshot tiles show daily averages for longer periods
  const taskTotal = d.tasks.reduce((a, b) => a + b, 0);
  const recStats = d.rec.map((n, i) => [String(n), REC_META[i][0], REC_META[i][1]]);
  const targets = TARGET_META.map(([name, color, Icon], i) => [name, d.targets[i][0], d.targets[i][1], color, Icon]);
  const ieChart = d.ie.labels.map((w, i) => ({ w, income: d.ie.inc[i], expense: d.ie.exp[i] }));
  const hoursData = d.hours.labels.map((day, i) => ({ day, h: d.hours.v[i] }));
  const invoiceChip = d.i[2] > 0 ? [`${d.i[2]} Overdue`, 'red'] : ['All clear', 'green'];

  const now = new Date();
  const dayNum = String(now.getDate());
  const mon = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const wk = now.toLocaleString('en-US', { weekday: 'short' });

  return (
    <div className="mw-page">
      <PageHeader description="Here's your complete overview of MEG WORLD today." />

      <div className="mw-toolbar">
        <select className="mw-select" value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Dashboard period">
          {Object.keys(PERIODS).map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <QuickAction />
      </div>

      {/* HR tiles */}
      <div className="mw-tiles mw-tiles-6">
        <Tile Icon={UsersRound} color="blue" value={d.total.v} title="Total Employees" sub={d.total.sub} trend={d.total.up ? 'up' : undefined} />
        <Tile Icon={UserCheck} color="green" value={d.att[0]} title={avg ? 'Avg. Present' : 'Present Today'} sub={`${pctOf(d.att[0])}% attendance`} progress={pctOf(d.att[0])} />
        <Tile Icon={House} color="red" value={d.att[1]} title={avg ? 'Avg. WFH' : 'WFH Today'} sub={`${pctOf(d.att[1])}% of workforce`} />
        <Tile Icon={Plane} color="amber" value={d.att[2]} title={avg ? 'Avg. On Leave' : 'On Leave'} sub={`${pctOf(d.att[2])}% of workforce`} />
        <Tile Icon={CalendarDays} color="purple" value={d.joiners} title="New Joiners" sub={period} />
        <Tile Icon={FileText} color="sky" value="18" title="Open Positions" sub="Recruitment" />
      </div>

      {/* Sales + finance tiles */}
      <div className="mw-tiles mw-tiles-7">
        <Tile Icon={FileSpreadsheet} color="green" value={d.q[0]} title="Quotations" sub={period} foot={<Foot amount={d.q[1]} chip={`${d.q[2]} Pending`} tone="amber" />} />
        <Tile Icon={Handshake} color="purple" value={d.p[0]} title="Proposals" sub={period} foot={<Foot amount={d.p[1]} chip={`${d.p[2]} Follow-up`} tone="amber" />} />
        <Tile Icon={Receipt} color="blue" value={d.i[0]} title="Invoices" sub={period} foot={<Foot amount={d.i[1]} chip={invoiceChip[0]} tone={invoiceChip[1]} />} />
        <Tile Icon={ArrowUp} color="mint" value={d.fin.income[0]} title="Income (Received)" foot={<Trend text={`${d.fin.income[1]}% vs ${d.prev}`} />} />
        <Tile Icon={ArrowDown} color="red" value={d.fin.expense[0]} title="Total Expenses" foot={<Trend text={`${d.fin.expense[1]}% vs ${d.prev}`} down />} />
        <Tile Icon={ChartNoAxesColumnIncreasing} color="purple" value={d.fin.profit[0]} title="Profit (P&L)" foot={<Trend text={`${d.fin.profit[1]}% vs ${d.prev}`} />} />
        <Tile className="mw-tile-target" value={d.target.total} title={d.target.name} sub={`${d.target.pct}% Achieved`} foot={<div className="mw-foot"><small>{d.target.got} / {d.target.total}</small></div>}>
          <div className="mw-ring">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie key={period} data={[{ v: d.target.pct }, { v: 100 - d.target.pct }]} dataKey="v" innerRadius="68%" outerRadius="100%" startAngle={90} endAngle={-270} stroke="none" cornerRadius={4}>
                  <Cell fill="#ffa944" /><Cell fill="#ffffffb0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mw-ring-label"><Target size={20} /></div>
          </div>
        </Tile>
      </div>

      {/* Charts + pipeline + target + events */}
      <div className="mw-main">
        <Panel title="Attendance Overview" className="mw-center" action="View Details" onAction={() => go('/attendance')}>
          <DonutCard key={period} data={attendance} total={headcount} label="Employees" />
        </Panel>

        <Panel title={<>Work Hours <span className="mw-sub">{d.hours.sub}</span></>} action="View Report" onAction={() => go('/reports')}>
          <HoursChart key={period} data={hoursData} light={d.hours.light} />
        </Panel>

        <Panel title="Task & Project Status" className="mw-center" onAction={() => go('/tasks-projects')}>
          <DonutCard key={period} data={tasks} total={taskTotal} label="Tasks" size={120} />
        </Panel>

        <Panel title="Recruitment Pipeline" onAction={() => go('/recruitment')}>
          <div className="mw-rec-stats">
            {recStats.map(([n, l, bg]) => <div key={l} style={{ background: bg }}><b>{n}</b><span>{l}</span></div>)}
          </div>
          <div className="mw-list">
            {candidates.map(([ini, name, role, st, tone]) => (
              <div className="mw-list-row" key={name}>
                <span className={`mw-avatar ${tone}`}>{ini}</span>
                <div className="mw-grow"><b>{name}</b><small>{role}</small></div>
                <Pill>{st}</Pill><MoreHorizontal size={14} className="mw-dots" />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={<>Income vs Expense <span className="mw-sub">({period})</span></>} className="mw-fill" action="View Report" onAction={() => go('/reports')}>
          <div className="mw-ie">
            <div className="inc"><b>{d.ie.income}</b><span>Income</span></div>
            <div className="exp"><b>{d.ie.expense}</b><span>Expense</span></div>
            <div className="pro"><b>{d.ie.profit}</b><span>Profit</span></div>
          </div>
          <div className="mw-ie-legend"><span><i style={{ background: '#035096' }} />Income</span><span><i style={{ background: '#f56aa6' }} />Expense</span></div>
          <FlowChart key={period} data={ieChart} />
        </Panel>

        <Panel title="Target Achievement" className="mw-center" action="View Details" onAction={() => go('/performance')}>
          <div className="mw-target" key={period}>
            {targets.map(([name, val, pct, color, Icon], i) => (
              <div className="mw-target-row" key={name} style={{ '--c': color, '--i': i }}>
                <span className="mw-target-ico" style={{ background: `${color}26`, color }}><Icon size={13} /></span>
                <span>{name}</span><b>{val}</b>
                <div className="mw-track"><i style={{ width: `${pct}%`, background: color }} /></div>
                <em>{pct}%</em>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="My Today's Events" className="mw-span2" onAction={() => go('/company-calendar')}>
          <div className="mw-events">
            <div className="mw-date mw-soft"><b>{dayNum}</b><span>{mon}</span><small>{wk}</small></div>
            <div>
              {events.map(([c, time, title, tag]) => (
                <div className="mw-event" key={title}>
                  <i style={{ background: c }} /><span>{time}</span><b>{title}</b>
                  {tag ? <Pill>{tag}</Pill> : <span />}
                  <MoreHorizontal size={14} className="mw-dots" />
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* Clients / quotations / invoices */}
      <div className="mw-triple">
        <Panel title="Client Urgency & Escalations" onAction={() => go('/clients-delivery')}>
          {urgency.map(([Icon, client, pr, note, status]) => (
            <div className="mw-urg" key={client}>
              <span className="mw-urg-ico mw-soft"><Icon size={16} /></span>
              <div className="mw-urg-mid"><b>{client}</b><small>{note}</small></div>
              <div className="mw-urg-end"><Pill>{pr}</Pill><small>{status}</small></div>
            </div>
          ))}
        </Panel>

        <Panel title="Quotations & Proposals" onAction={() => go('/quotations')}>
          <Tabs tabs={['Quotations', 'Proposals']} value={qTab} onChange={setQTab} />
          <Table head={[qTab === 'Quotations' ? 'QTN No' : 'PRP No', 'Client', 'Amount', 'Status', 'Follow-up']} rows={qTab === 'Quotations' ? quotations : proposals} lastColor={dueColor} />
        </Panel>

        <Panel title="Invoices & Payments" onAction={() => go('/invoices')}>
          <Tabs tabs={['Recent Invoices', 'Payments Received']} value={iTab} onChange={setITab} />
          <Table
            head={[iTab === 'Recent Invoices' ? 'INV No' : 'PAY No', 'Client', 'Amount', 'Status', iTab === 'Recent Invoices' ? 'Due Date' : 'Received']}
            rows={iTab === 'Recent Invoices' ? invoices : payments}
            lastColor={(v, row) => (iTab === 'Recent Invoices' && v !== '-' ? 'mw-text-red' : '')}
          />
        </Panel>
      </div>

      {/* To-do / follow-ups / activity */}
      <div className="mw-triple">
        <Panel title="My To-Do Today" onAction={() => go('/tasks-projects')}>
          {todos.map((t, i) => (
            <label className={`mw-todo ${t.done ? 'done' : ''}`} key={t.text}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(i)} />
              <span>{t.text}</span><time>{t.time}</time><Pill>{t.pr}</Pill>
            </label>
          ))}
        </Panel>

        <Panel title="Client Follow-ups for Fast Payment" onAction={() => go('/invoices')}>
          <div className="data-table-wrap">
            <table className="hrms-table">
              <thead><tr><th>Client</th><th>Invoice</th><th className="r">Amount</th><th>Days Overdue</th><th>Action</th></tr></thead>
              <tbody>
                {followUps.map(([c, inv, amt, days, act, tone]) => (
                  <tr key={inv}>
                    <td>{c}</td><td>{inv}</td><td className="amt r">{amt}</td>
                    <td className={days === 'Due Today' ? 'mw-text-amber' : 'mw-text-red'}>{days}</td>
                    <td><button type="button" className={`mw-btn-sm ${tone}`}>{act}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Recent Activities" onAction={() => go('/notifications')}>
          <div className="mw-list">
            {activities.map(([ini, text, time, tag, tone]) => (
              <div className="mw-list-row" key={text}>
                <span className="mw-act-dot" />
                <span className={`mw-avatar ${tone}`}>{ini}</span>
                <div className="mw-grow"><b>{text}</b><small>{time}</small></div>
                <Pill>{tag}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}