import React from 'react';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import './SettingsPage.css';

export default function SettingsPage() {
  return <div className="settings-page">
    <ModuleWorkspace title="Settings" mode="generic" />
  </div>;
}
