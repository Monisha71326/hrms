import React from 'react';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import './ApprovalsPage.css';

export default function ApprovalsPage() {
  return <div className="approvals-page">
    <ModuleWorkspace title="My Approvals" mode="approvals" />
  </div>;
}
