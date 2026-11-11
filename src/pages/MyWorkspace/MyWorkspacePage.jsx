import React from 'react';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import './MyWorkspacePage.css';

export default function MyWorkspacePage() {
  return <div className="myWorkspace-page">
    <ModuleWorkspace title="My Workspace" mode="generic" />
  </div>;
}
