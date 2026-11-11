import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import './AppLayout.css';

export function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__mwtToast);
    window.__mwtToast = window.setTimeout(() => setToast(''), 2600);
  };

  return <div className="aqua-stage">
    <div className="aqua-bg" aria-hidden="true"><i className="blob blob-a" /><i className="blob blob-b" /><i className="blob blob-c" /></div>
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="app-main">
        <Header onMenu={() => setMobileOpen(v => !v)} checkedIn={checkedIn}
          onCheckIn={() => { setCheckedIn(v => !v); showToast(checkedIn ? 'Check-out recorded in demo mode.' : 'Check-in recorded in demo mode.'); }}
          onToast={showToast} />
        <main className="app-content">{children || <Outlet />}</main>
        <footer className="app-footer"><span>© 2026 MEG WORLD TECHNOLOGIES Pvt. Ltd.</span><span><i /> HRMS Demo Workspace</span></footer>
      </div>
      {toast && <div className="app-toast"><span className="toast-check">✓</span>{toast}<button onClick={() => setToast('')}>×</button></div>}
    </div>
  </div>;
}
