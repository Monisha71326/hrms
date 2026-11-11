import React from 'react';
import { useLocation } from 'react-router-dom';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import './EmployeesPage.css';

export default function EmployeesPage() {
  const { pathname } = useLocation();
  // Full directory ONLY on the "Employee Directory" submenu route.
  // Everything else under /employees keeps the generic workspace.
  const isDirectory = pathname.startsWith('/employees/employee-directory');

  return (
    <div className="employees-page">
      {isDirectory
        ? <EmployeeDirectory />
        : <ModuleWorkspace title="Employees" mode="employees" />}
    </div>
  );
}