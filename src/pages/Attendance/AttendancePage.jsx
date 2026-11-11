import React from 'react';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import './AttendancePage.css';

export default function AttendancePage() {
  return <div className="attendance-page">
    <ModuleWorkspace title="Attendance" mode="attendance" />
  </div>;
}
