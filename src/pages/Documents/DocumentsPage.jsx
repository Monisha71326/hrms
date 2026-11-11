import React from 'react';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import './DocumentsPage.css';

export default function DocumentsPage() {
  return <div className="documents-page">
    <ModuleWorkspace title="Documents" mode="generic" />
  </div>;
}
