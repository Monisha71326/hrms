import React from 'react';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import './PayrollPage.css';

export default function PayrollPage() {
  return <div className="payroll-page">
    <ModuleWorkspace title="Payroll" mode="generic" />
  </div>;
}
