import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UsersRound, CalendarCheck, CalendarDays, MonitorSmartphone, UserRoundSearch, GraduationCap, ListTodo, BriefcaseBusiness, ReceiptText, Wallet, TrendingUp, MessagesSquare, CalendarRange, ScrollText, ChartNoAxesCombined, Settings, ChevronRight, X } from 'lucide-react';
import { navMenu } from '../../data/navConfig.js';
import './Sidebar.css';

const icons = {
  dashboard: LayoutDashboard, employees: UsersRound, attendance: CalendarCheck, leave: CalendarDays,
  wfh: MonitorSmartphone, recruitment: UserRoundSearch, training: GraduationCap, projects: ListTodo,
  clients: BriefcaseBusiness, sales: ReceiptText, payroll: Wallet, performance: TrendingUp,
  community: MessagesSquare, events: CalendarRange, policies: ScrollText, reports: ChartNoAxesCombined, settings: Settings
};

const isGroupActive = (g, pathname) =>
  pathname === g.path || pathname.startsWith(g.path + '/') || g.items.some((i) => i.path === pathname);

function NavGroup({ group, open, active, onToggle, onClose }) {
  const Icon = icons[group.icon];
  const hasSub = group.items.length > 0;
  const ref = useRef(null);

  useEffect(() => {
    if (open && ref.current) setTimeout(() => ref.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 120);
  }, [open]);

  if (!hasSub) {
    return <NavLink to={group.path} onClick={onClose} className={({ isActive }) => `sidebar-link ${isActive ? 'is-active' : ''}`}>
      <Icon size={18} strokeWidth={1.9} /><span>{group.label}</span>{group.count && <b className="sidebar-count">{group.count}</b>}
    </NavLink>;
  }

  return <div ref={ref} className={`sidebar-group ${open ? 'is-open' : ''}`}>
    <Link to={group.path} aria-expanded={open} onClick={onToggle} className={`sidebar-link ${active ? 'is-active' : ''}`}>
      <Icon size={18} strokeWidth={1.9} /><span>{group.label}</span>
      {group.count && <b className="sidebar-count">{group.count}</b>}
      <ChevronRight className="sidebar-chevron" size={15} strokeWidth={2.2} />
    </Link>
    <div className="sidebar-sub">
      <div className="sidebar-sub-inner">
        {group.items.map((it, i) => it.heading
          ? <div key={'h' + i} className="sidebar-subhead">{it.heading}</div>
          : <NavLink key={it.path} to={it.path} end onClick={onClose} className={({ isActive }) => `sidebar-sublink ${isActive ? 'is-active' : ''}`}>
              <span>{it.label}</span>{it.count && <b className="sidebar-count sm">{it.count}</b>}
            </NavLink>)}
      </div>
    </div>
  </div>;
}

export default function Sidebar({ mobileOpen, onClose }) {
  const { pathname } = useLocation();
  const activeKey = (navMenu.find((g) => g.items.length && isGroupActive(g, pathname)) || {}).key || '';
  const [openKey, setOpenKey] = useState(activeKey);

  // open the right group automatically when the page changes (e.g. from the dashboard banner)
  useEffect(() => { setOpenKey(activeKey); }, [activeKey]);

  return <>
    {mobileOpen && <button className="sidebar-overlay" aria-label="Close navigation" onClick={onClose} />}
    <aside className={`app-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-brand"><div className="brand-symbol"><span>M</span><i>W</i></div><div className="brand-copy">MEG WORLD<small>H R M S</small></div><button className="sidebar-close" onClick={onClose}><X size={18} /></button></div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navMenu.map((g) => <NavGroup key={g.key} group={g}
          open={openKey === g.key} active={isGroupActive(g, pathname)}
          onToggle={() => setOpenKey((k) => (k === g.key ? '' : g.key))}
          onClose={onClose} />)}
      </nav>
    </aside>
  </>;
}