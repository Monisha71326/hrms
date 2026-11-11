import React, { useEffect, useState } from 'react';
import { Menu, Search, Fingerprint, MessageSquare, Bell, ChevronDown, X } from 'lucide-react';
import './Header.css';

const timeNow = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

export default function Header({ onMenu, checkedIn, onCheckIn, onToast }) {
  const [search, setSearch] = useState('');
  const [popover, setPopover] = useState('');
  const [time, setTime] = useState(timeNow());
  const toggle = (name) => setPopover(popover === name ? '' : name);

  /* live clock shown inside the Check In button */
  useEffect(() => {
    const t = setInterval(() => setTime(timeNow()), 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="app-header">
      {/* Island 1: menu + search */}
      <div className="hd-island hd-left">
        <button className="header-menu" onClick={onMenu} aria-label="Open sidebar"><Menu size={20} /></button>
        <div className="global-search">
          <span className="search-orb"><Search size={15} /></span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees, candidates, tasks, documents, reports..."
          />
          {search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}
        </div>
      </div>

      {/* Island 2: actions + profile */}
      <div className="hd-island hd-right">
        <button className={`header-checkin ${checkedIn ? 'checked' : ''}`} onClick={onCheckIn}>
          <span className="checkin-icon"><Fingerprint size={17} /><i className="live-dot" /></span>
          <span className="checkin-text"><b>{checkedIn ? 'Checked In' : 'Check In'}</b><small>{time}</small></span>
        </button>

        <button className="header-icon" title="Messages" onClick={() => toggle('messages')}><MessageSquare size={19} /></button>
        <button className="header-icon notification-trigger" title="Notifications" onClick={() => toggle('notifications')}>
          <Bell size={20} /><i>8</i>
        </button>

        <span className="header-divider" />

        <button className="header-profile" onClick={() => toggle('profile')}>
          <span className="header-avatar"><em>AD</em><i className="online-dot" /></span>
          <span className="profile-text"><b>Admin</b><small>Director</small></span>
          <ChevronDown size={15} />
        </button>

        {popover && (
          <div className="header-popover">
            <div className="header-popover-top">
              <b>{popover === 'profile' ? 'Admin Director' : popover === 'messages' ? 'Messages' : 'Notifications'}</b>
              <button onClick={() => setPopover('')}><X size={15} /></button>
            </div>
            {popover === 'profile'
              ? ['My profile', 'Account settings', 'Help & support'].map((x) => (
                  <button key={x} onClick={() => { onToast(`${x} opened in demo mode.`); setPopover(''); }}>{x}</button>
                ))
              : popover === 'messages'
              ? <p>You are all caught up on messages.</p>
              : <>
                  <p><b>Leave request pending</b><small>Priya Mehta · 10 min ago</small></p>
                  <p><b>New task assigned</b><small>Website UI Design · 1 hour ago</small></p>
                  <p><b>Policy update</b><small>Attendance policy · Yesterday</small></p>
                </>}
          </div>
        )}
      </div>
    </header>
  );
}