import React from 'react';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import './InvoicesPage.css';

export default function InvoicesPage() {
  return <div className="invoices-page">
    <ModuleWorkspace title="Invoices & Billing" mode="generic" />
  </div>;
}
