import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import { findSubByPath } from '../../data/navConfig.js';

// One generic screen for every submenu item that does not have its own page yet.
export default function SubModulePage() {
  const { pathname } = useLocation();
  const hit = findSubByPath(pathname);
  if (!hit) return <Navigate to="/dashboard" replace />;
  return <ModuleWorkspace key={pathname} title={hit.item.label} description={`${hit.group.label} · ${hit.item.label}`} />;
}
