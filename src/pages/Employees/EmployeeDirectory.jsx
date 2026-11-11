import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './EmployeeDirectory.css';

/* ------------------------------------------------------------------ */
/* icons                                                               */
/* ------------------------------------------------------------------ */
const PATHS = {
  search: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  list: <><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><circle cx="3.5" cy="6" r="1" /><circle cx="3.5" cy="12" r="1" /><circle cx="3.5" cy="18" r="1" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
  left: <polyline points="15 18 9 12 15 6" />,
  right: <polyline points="9 18 15 12 9 6" />,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 6 12 13 2 6" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  house: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="2" /><line x1="9" y1="8" x2="9.01" y2="8" /><line x1="15" y1="8" x2="15.01" y2="8" /><line x1="9" y1="12" x2="9.01" y2="12" /><line x1="15" y1="12" x2="15.01" y2="12" /><path d="M10 21v-4h4v4" /></>,
  up: <polyline points="18 15 12 9 6 15" />,
  down: <polyline points="6 9 12 15 18 9" />,
  pin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  userCheck: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></>,
  plane: <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
};

const Icon = ({ name, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {PATHS[name]}
  </svg>
);

/* ------------------------------------------------------------------ */
/* demo data — 122 people, generated deterministically so every number */
/* on the page is computed from the same list (swap for your API later) */
/* ------------------------------------------------------------------ */
const mulberry = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const rand = mulberry(2026);
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pad = (n, l = 3) => String(n).padStart(l, '0');

const CORE = [
  ['Emmanuel Mariadoss', 'emmanuel', 'Management', 'CEO / Director', '-', 'Office', 'Present', '2019-01-01'],
  ['Priya S', 'priya', 'HR', 'HR Manager', 'Emmanuel', 'Office', 'Present', '2021-03-12'],
  ['Rahul K', 'rahul', 'Development', 'Full Stack Developer', 'Logesh', 'WFH', 'Present', '2022-07-04'],
  ['Monisha R', 'monisha', 'QA', 'QA Engineer', 'Logesh', 'Office', 'On Leave', '2022-08-10'],
  ['Vicky A', 'vicky', 'Design', 'Graphic Designer', 'Mary', 'Office', 'Present', '2022-09-15'],
  ['Venilla S', 'venilla', 'Marketing', 'Digital Marketer', 'Mary', 'WFH', 'Present', '2022-11-01'],
  ['Mustaq A', 'mustaq', 'Operations', 'Telecaller', 'Priya', 'Office', 'Absent', '2023-01-05'],
  ['Faizul K', 'faizul', 'Client Support', 'Support Executive', 'Priya', 'Office', 'Present', '2023-02-12'],
  ['Logesh S', 'logesh', 'Development', 'Project Manager', 'Emmanuel', 'Office', 'Present', '2023-03-10'],
  ['Mary J', 'mary', 'Operations', 'Operations Manager', 'Emmanuel', 'WFH', 'Present', '2023-04-18'],
];

const FIRST = ['Arun', 'Divya', 'Karthik', 'Meena', 'Naveen', 'Pooja', 'Ramesh', 'Sangeetha', 'Tamil', 'Uma', 'Vijay', 'Yamini', 'Ajay', 'Bhavani', 'Chitra', 'Dinesh', 'Elango', 'Gayathri', 'Harish', 'Indhu', 'Jeeva', 'Kavya', 'Lokesh', 'Manoj', 'Nithya', 'Prakash', 'Revathi', 'Surya', 'Thilak', 'Varsha'];
const INIT = ['A', 'B', 'C', 'D', 'G', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'V'];
const ROLES = [
  ['Development', 'Full Stack Developer'], ['Development', 'Frontend Developer'], ['Development', 'Backend Developer'],
  ['QA', 'QA Engineer'], ['Design', 'UI/UX Designer'], ['Design', 'Graphic Designer'],
  ['Marketing', 'Digital Marketer'], ['Marketing', 'SEO Executive'], ['Operations', 'Telecaller'],
  ['Operations', 'Operations Executive'], ['Client Support', 'Support Executive'], ['HR', 'HR Executive'],
  ['Sales', 'Sales Executive'], ['Finance', 'Accountant'],
];
const MANAGERS = ['Emmanuel', 'Logesh', 'Mary', 'Priya'];

function buildEmployees() {
  const list = CORE.map((c, i) => ({
    id: i + 1, name: c[0], handle: c[1], dept: c[2], desig: c[3], manager: c[4],
    mode: c[5], status: c[6], joined: new Date(c[7]), isNew: false,
  }));

  // 112 more people: exactly 79 present, 2 on leave, 3 absent, 8 resigned, 20 not in yet
  const statuses = shuffle([
    ...Array(79).fill('Present'), ...Array(2).fill('On Leave'), ...Array(3).fill('Absent'),
    ...Array(8).fill('Resigned'), ...Array(20).fill('Not in yet'),
  ]);
  const modes = shuffle([...Array(21).fill('WFH'), ...Array(58).fill('Office')]);
  const lo = Date.UTC(2019, 5, 1);
  const hi = Date.UTC(2026, 8, 20);
  let presentIdx = 0;
  let newCount = 0;

  statuses.forEach((status, k) => {
    const id = 11 + k;
    const first = FIRST[Math.floor(rand() * FIRST.length)];
    const last = INIT[Math.floor(rand() * INIT.length)];
    const [dept, desig] = ROLES[Math.floor(rand() * ROLES.length)];
    let mode = 'Office';
    let isNew = false;
    if (status === 'Present') {
      mode = modes[presentIdx];
      if (presentIdx % 6 === 0 && newCount < 12) { isNew = true; newCount += 1; }
      presentIdx += 1;
    }
    const joined = isNew
      ? new Date(Date.UTC(2026, 9, 1 + Math.floor(rand() * 18)))
      : new Date(lo + rand() * (hi - lo));
    list.push({
      id, name: `${first} ${last}`, handle: `${first.toLowerCase()}${id}`, dept, desig,
      manager: MANAGERS[Math.floor(rand() * MANAGERS.length)], mode, status, joined, isNew,
    });
  });

  return list.map((e) => ({
    ...e,
    empId: `MW${pad(e.id)}`,
    email: `${e.handle}@megworld.com`,
    phone: `+91 98765 ${43209 + e.id}`,
    location: 'Chennai',
  }));
}

const ALL = buildEmployees();
const OPEN_POSITIONS = 6;

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (d) => `${pad(d.getUTCDate(), 2)} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

function tenure(d) {
  const now = new Date();
  const m = (now.getFullYear() - d.getUTCFullYear()) * 12 + (now.getMonth() - d.getUTCMonth());
  if (m < 1) return 'New this month';
  if (m < 12) return `${m} mo`;
  const y = Math.floor(m / 12);
  const r = m % 12;
  return r ? `${y} yr ${r} mo` : `${y} yr`;
}

const initials = (n) => n.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
const hueOf = (n) => [...n].reduce((a, c) => a + c.charCodeAt(0) * 7, 0) % 360;

const STATUS_TONE = {
  Present: 'ok', 'On Leave': 'warn', Absent: 'bad', 'Not in yet': 'idle', Resigned: 'gone',
};

function Avatar({ name, size = 40, status }) {
  const h = hueOf(name);
  return (
    <span
      className={`ed-avatar ${status ? `ring-${STATUS_TONE[status]}` : ''}`}
      style={{
        width: size, height: size, fontSize: size * 0.36,
        background: `linear-gradient(140deg, hsl(${h} 56% 42%), hsl(${(h + 28) % 360} 60% 30%))`,
      }}
    >
      {initials(name)}
    </span>
  );
}

const StatusChip = ({ status }) => (
  <span className={`ed-status st-${STATUS_TONE[status]}`}><i />{status}</span>
);

const ModeChip = ({ mode }) => (
  <span className={`ed-mode mode-${mode.toLowerCase()}`}>
    <Icon name={mode === 'WFH' ? 'house' : 'building'} size={13} />
    {mode === 'WFH' ? 'Home' : 'Office'}
  </span>
);

const pageNumbers = (cur, pages) => {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const keep = [...new Set([1, 2, cur - 1, cur, cur + 1, pages - 1, pages])]
    .filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const out = [];
  keep.forEach((n, i) => {
    if (i && n - keep[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
};

const BLANK = { dept: 'All', desig: 'All', status: 'All', mode: 'All' };

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */
export default function EmployeeDirectory() {
  const [q, setQ] = useState('');
  const [f, setF] = useState(BLANK);
  const [tab, setTab] = useState('all');
  const [view, setView] = useState('list');
  const [sort, setSort] = useState({ key: null, dir: 1 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(null);
  const closeRef = useRef(null);

  /* ----- numbers shown in the band, all derived from the list ----- */
  const stats = useMemo(() => {
    const c = (fn) => ALL.filter(fn).length;
    const present = c((e) => e.status === 'Present');
    const wfh = c((e) => e.status === 'Present' && e.mode === 'WFH');
    const resigned = c((e) => e.status === 'Resigned');
    const active = ALL.length - resigned;
    return {
      total: ALL.length, present, wfh, office: present - wfh,
      leave: c((e) => e.status === 'On Leave'),
      absent: c((e) => e.status === 'Absent'),
      notIn: c((e) => e.status === 'Not in yet'),
      joiners: c((e) => e.isNew), resigned, active,
      pct: Math.round((present / active) * 100),
    };
  }, []);

  const TABS = [
    { key: 'all', label: 'All employees', n: stats.total },
    { key: 'present', label: 'Present', n: stats.present },
    { key: 'wfh', label: 'Working from home', n: stats.wfh },
    { key: 'leave', label: 'On leave', n: stats.leave },
    { key: 'absent', label: 'Absent', n: stats.absent },
    { key: 'joiners', label: 'New joiners', n: stats.joiners },
    { key: 'resigned', label: 'Resigned', n: stats.resigned },
  ];

  const opts = useMemo(() => ({
    dept: [...new Set(ALL.map((e) => e.dept))].sort(),
    desig: [...new Set(ALL.map((e) => e.desig))].sort(),
  }), []);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = ALL.filter((e) => {
      if (needle && !`${e.name} ${e.empId} ${e.email} ${e.phone}`.toLowerCase().includes(needle)) return false;
      if (f.dept !== 'All' && e.dept !== f.dept) return false;
      if (f.desig !== 'All' && e.desig !== f.desig) return false;
      if (f.status !== 'All' && e.status !== f.status) return false;
      if (f.mode !== 'All' && e.mode !== f.mode) return false;
      switch (tab) {
        case 'present': return e.status === 'Present';
        case 'wfh': return e.status === 'Present' && e.mode === 'WFH';
        case 'leave': return e.status === 'On Leave';
        case 'absent': return e.status === 'Absent';
        case 'joiners': return e.isNew;
        case 'resigned': return e.status === 'Resigned';
        default: return true;
      }
    });
    if (sort.key) {
      const val = (e) => (sort.key === 'joined' ? e.joined.getTime() : String(e[sort.key]).toLowerCase());
      out = [...out].sort((a, b) => (val(a) > val(b) ? 1 : val(a) < val(b) ? -1 : 0) * sort.dir);
    }
    return out;
  }, [q, f, tab, sort]);

  useEffect(() => { setPage(1); }, [q, f, tab, sort, pageSize]);

  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const cur = Math.min(page, pages);
  const start = (cur - 1) * pageSize;
  const visible = rows.slice(start, start + pageSize);

  /* popup: position of the open employee inside the filtered list + prev/next */
  const idx = open ? rows.findIndex((r) => r.id === open.id) : -1;
  const step = (d) => {
    const n = rows[idx + d];
    if (n) setOpen(n);
  };

  const filtersOn = q || tab !== 'all' || Object.values(f).some((v) => v !== 'All');
  const clearAll = () => { setQ(''); setF(BLANK); setTab('all'); setSort({ key: null, dir: 1 }); };

  const allChecked = visible.length > 0 && visible.every((r) => selected.includes(r.id));
  const toggleAll = () => setSelected((s) => (allChecked
    ? s.filter((id) => !visible.some((r) => r.id === id))
    : [...new Set([...s, ...visible.map((r) => r.id)])]));
  const toggleOne = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const cycleSort = (key) => setSort((s) => {
    if (s.key !== key) return { key, dir: 1 };
    if (s.dir === 1) return { key, dir: -1 };
    return { key: null, dir: 1 };
  });

  const exportCsv = (list) => {
    const head = ['Emp ID', 'Name', 'Email', 'Phone', 'Department', 'Designation', 'Manager', 'Location', 'Work mode', 'Status', 'Joined'];
    const body = list.map((e) => [e.empId, e.name, e.email, e.phone, e.dept, e.desig, e.manager, e.location, e.mode, e.status, fmtDate(e.joined)]);
    const csv = [head, ...body].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'employees.csv';
    a.click();
  };

  /* popup: Esc = close, ← → = prev/next, lock page scroll while open */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      const i = rows.findIndex((r) => r.id === open.id);
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight' && i >= 0 && rows[i + 1]) setOpen(rows[i + 1]);
      if (e.key === 'ArrowLeft' && i > 0) setOpen(rows[i - 1]);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, rows]);

  const CARDS = [
    { key: 'total', icon: 'users', n: stats.total, label: 'Total Employees', sub: `${stats.active} active people`, tab: 'all', tone: 'blue' },
    { key: 'present', icon: 'userCheck', n: stats.present, label: 'Present Today', sub: `${stats.pct}% attendance`, tab: 'present', tone: 'green', bar: stats.pct },
    { key: 'wfh', icon: 'house', n: stats.wfh, label: 'WFH Today', sub: `${Math.round((stats.wfh / stats.active) * 100)}% of workforce`, tab: 'wfh', tone: 'red' },
    { key: 'leave', icon: 'plane', n: stats.leave, label: 'On Leave', sub: `${Math.round((stats.leave / stats.active) * 100)}% of workforce`, tab: 'leave', tone: 'amber' },
    { key: 'joiners', icon: 'users', n: stats.joiners, label: 'New Joiners', sub: 'This month', tab: 'joiners', tone: 'purple' },
    { key: 'open', icon: 'doc', n: OPEN_POSITIONS, label: 'Open Positions', sub: 'Recruitment', tab: null, tone: 'teal' },
  ];

  const onRowKey = (e, emp) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      setOpen(emp);
    }
  };

  const Sort = ({ k, children }) => (
    <button type="button" className={`ed-sort ${sort.key === k ? 'on' : ''}`} onClick={() => cycleSort(k)}>
      {children}
      {sort.key === k && <Icon name={sort.dir === 1 ? 'up' : 'down'} size={12} />}
    </button>
  );

  return (
    <div className="emp-dir">
      <div className="ed-main">
        {/* ------------------------------ header ------------------------------ */}
        <header className="ed-head">
          <div>
            <h1>Employee Directory</h1>
            <p>{stats.total} people at MEG WORLD</p>
          </div>
          <div className="ed-head-actions">
            <button type="button" className="ed-btn ghost" onClick={() => exportCsv(rows)}>
              <Icon name="download" /> Export
            </button>
            <button type="button" className="ed-btn primary"><Icon name="plus" /> Add employee</button>
          </div>
        </header>

        {/* ------------------------------ stat cards -------------------------- */}
        <section className="ed-cards" aria-label="Employee summary">
          {CARDS.map((c) => (
            <button key={c.key} type="button"
              className={`ed-stat tone-${c.tone} ${c.tab && tab === c.tab ? 'on' : ''}`}
              disabled={!c.tab} onClick={() => c.tab && setTab(c.tab)}>
              <span className="ed-stat-ic"><Icon name={c.icon} size={24} /></span>
              <span className="ed-stat-tx">
                <strong>{c.n}</strong>
                <b>{c.label}</b>
                <small>{c.sub}</small>
                {c.bar != null && <i className="ed-stat-bar"><i style={{ width: `${c.bar}%` }} /></i>}
              </span>
            </button>
          ))}
        </section>

        {/* ------------------------------ filters ----------------------------- */}
        <div className="ed-filters ed-panel">
          <label className="ed-search">
            <Icon name="search" />
            <input
              placeholder="Search name, ID, email or phone"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            {q && <button type="button" onClick={() => setQ('')} aria-label="Clear search"><Icon name="x" size={14} /></button>}
          </label>

          {[
            ['dept', 'Department', opts.dept],
            ['desig', 'Designation', opts.desig],
            ['status', 'Status', ['Present', 'On Leave', 'Absent', 'Not in yet', 'Resigned']],
            ['mode', 'Work mode', ['Office', 'WFH']],
          ].map(([key, label, list]) => (
            <label key={key} className={`ed-pick ${f[key] !== 'All' ? 'on' : ''}`}>
              <span>{label}</span>
              <select value={f[key]} onChange={(e) => setF((o) => ({ ...o, [key]: e.target.value }))}>
                <option value="All">All</option>
                {list.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          ))}

          <button type="button" className="ed-reset" onClick={clearAll} disabled={!filtersOn}>Reset</button>
        </div>

        {/* ------------------------------ tabs -------------------------------- */}
        <div className="ed-bar2">
          <div className="ed-tabs" role="tablist">
            {TABS.map((t) => (
              <button key={t.key} type="button" role="tab" aria-selected={tab === t.key}
                className={`t-${t.key} ${tab === t.key ? 'on' : ''}`} onClick={() => setTab(t.key)}>
                {t.label}<em>{t.n}</em>
              </button>
            ))}
          </div>
          <div className="ed-toggle" role="group" aria-label="View">
            <button type="button" className={view === 'list' ? 'on' : ''} onClick={() => setView('list')} aria-label="List view"><Icon name="list" /></button>
            <button type="button" className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')} aria-label="Grid view"><Icon name="grid" /></button>
          </div>
        </div>

        {/* ------------------------------ list -------------------------------- */}
        {view === 'list' && (
          <div className="ed-list">
            <div className="ed-lhead">
              <span className="c-check">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} aria-label="Select all on this page" />
              </span>
              <Sort k="name">Employee</Sort>
              <Sort k="desig">Role</Sort>
              <span className="c-mgr">Manager</span>
              <span className="c-mode">Work mode</span>
              <span className="c-status">Status</span>
              <span className="c-joined"><Sort k="joined">Joined</Sort></span>
              <span />
            </div>

            {visible.map((e) => (
              <div key={e.id}
                className={`ed-row ${selected.includes(e.id) ? 'sel' : ''}`}
                tabIndex={0} role="button"
                onClick={() => setOpen(e)} onKeyDown={(ev) => onRowKey(ev, e)}>
                <span className="c-check" onClick={(ev) => ev.stopPropagation()}>
                  <input type="checkbox" checked={selected.includes(e.id)} onChange={() => toggleOne(e.id)} aria-label={`Select ${e.name}`} />
                </span>
                <span className="c-emp">
                  <Avatar name={e.name} size={44} status={e.status} />
                  <span>
                    <b>{e.name}</b>
                    <small>{e.email}</small>
                  </span>
                </span>
                <span className="c-role">
                  <b>{e.desig}</b>
                  <small>{e.dept} · {e.location}</small>
                </span>
                <span className="c-mgr">
                  {e.manager === '-' ? <small>—</small> : (<><Avatar name={e.manager} size={26} />{e.manager}</>)}
                </span>
                <span className="c-mode"><ModeChip mode={e.mode} /></span>
                <span className="c-status"><StatusChip status={e.status} /></span>
                <span className="c-joined">
                  <b>{fmtDate(e.joined)}</b>
                  <small>{tenure(e.joined)}</small>
                </span>
                <span className="c-act" onClick={(ev) => ev.stopPropagation()}>
                  <a href={`mailto:${e.email}`} aria-label={`Email ${e.name}`}><Icon name="mail" size={15} /></a>
                  <button type="button" onClick={() => setOpen(e)} aria-label={`Open ${e.name}'s profile`}><Icon name="eye" size={15} /></button>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ------------------------------ grid -------------------------------- */}
        {view === 'grid' && (
          <div className="ed-grid">
            {visible.map((e) => (
              <button key={e.id} type="button" className="ed-card" onClick={() => setOpen(e)}>
                <span className="ed-card-cover" style={{ '--h': hueOf(e.name) }} />
                <Avatar name={e.name} size={64} status={e.status} />
                <b>{e.name}</b>
                <span>{e.desig}</span>
                <small>{e.dept} · {e.location}</small>
                <span className="ed-card-chips"><ModeChip mode={e.mode} /><StatusChip status={e.status} /></span>
              </button>
            ))}
          </div>
        )}

        {rows.length === 0 && (
          <div className="ed-empty">
            <b>No employees match these filters</b>
            <p>Try a different name, or clear the filters to see everyone.</p>
            <button type="button" className="ed-btn primary" onClick={clearAll}>Clear filters</button>
          </div>
        )}

        {/* ------------------------------ footer ------------------------------ */}
        {rows.length > 0 && (
          <footer className="ed-foot">
            <span>Showing {start + 1}–{Math.min(start + pageSize, rows.length)} of {rows.length} employees</span>
            <div className="ed-pager">
              <button type="button" disabled={cur === 1} onClick={() => setPage(cur - 1)} aria-label="Previous page"><Icon name="left" /></button>
              {pageNumbers(cur, pages).map((p, i) => (p === '…'
                ? <span key={`gap${i}`} className="gap">…</span>
                : <button type="button" key={p} className={p === cur ? 'on' : ''} onClick={() => setPage(p)} aria-current={p === cur ? 'page' : undefined}>{p}</button>))}
              <button type="button" disabled={cur === pages} onClick={() => setPage(cur + 1)} aria-label="Next page"><Icon name="right" /></button>
              <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)} aria-label="Rows per page">
                {[10, 20, 50].map((n) => <option key={n} value={n}>{n} per page</option>)}
              </select>
            </div>
          </footer>
        )}
      </div>

      {/* ---------------- selection bar + profile popup (portal) ---------------- */}
      {selected.length > 0 && createPortal(
        <div className="ed-portal ed-selbar" role="status">
          <b>{selected.length} selected</b>
          <button type="button" onClick={() => exportCsv(ALL.filter((e) => selected.includes(e.id)))}>Export selected</button>
          <button type="button" onClick={() => setSelected([])}>Clear</button>
        </div>, document.body)}

      {open && createPortal(
        <div className="ed-portal">
          <div className="ed-scrim" onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}>
            <section className="ed-modal" role="dialog" aria-modal="true" aria-label={`${open.name} profile`}>
              <button type="button" className="ed-x" ref={closeRef} onClick={() => setOpen(null)} aria-label="Close profile">
                <Icon name="x" size={18} />
              </button>

              {/* left: identity */}
              <div className="ed-m-side">
                <Avatar name={open.name} size={96} status={open.status} />
                <h2>{open.name}</h2>
                <p>{open.desig}</p>
                <div className="ed-d-chips"><StatusChip status={open.status} /><ModeChip mode={open.mode} /></div>

                <div className="ed-m-actions">
                  <a className="ed-btn light" href={`mailto:${open.email}`}><Icon name="mail" /> Email</a>
                  <a className="ed-btn glass" href={`tel:${open.phone.replace(/\s/g, '')}`}><Icon name="phone" /> Call</a>
                  <button type="button" className="ed-btn glass"><Icon name="pen" /> Edit</button>
                </div>
              </div>

              {/* right: details */}
              <div className="ed-m-body">
                <div className="ed-m-title">
                  <span className="ed-m-id">{open.empId}</span>
                  <h3>Employee details</h3>
                </div>

                <div className="ed-m-grid">
                  {[
                    ['building', 'Department', open.dept],
                    ['pin', 'Location', open.location],
                    ['eye', 'Reports to', open.manager === '-' ? 'No manager' : open.manager],
                    ['house', 'Work mode', open.mode === 'WFH' ? 'Work from home' : 'Office'],
                    ['mail', 'Email', open.email],
                    ['phone', 'Phone', open.phone],
                  ].map(([ic, k, v]) => (
                    <div className="ed-m-tile" key={k}>
                      <span className="ed-m-ic"><Icon name={ic} size={16} /></span>
                      <span><small>{k}</small><b>{v}</b></span>
                    </div>
                  ))}
                  <div className="ed-m-tile wide">
                    <span className="ed-m-ic"><Icon name="plus" size={16} /></span>
                    <span><small>Joined</small><b>{fmtDate(open.joined)} · {tenure(open.joined)}</b></span>
                  </div>
                </div>

                <div className="ed-m-nav">
                  <button type="button" disabled={idx <= 0} onClick={() => step(-1)}><Icon name="left" size={15} /> Previous</button>
                  <span>{idx >= 0 ? `${idx + 1} of ${rows.length}` : ''}</span>
                  <button type="button" disabled={idx < 0 || idx >= rows.length - 1} onClick={() => step(1)}>Next <Icon name="right" size={15} /></button>
                </div>
              </div>
            </section>
          </div>
        </div>, document.body)}
    </div>
  );
}