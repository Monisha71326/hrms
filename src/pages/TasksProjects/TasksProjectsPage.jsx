import React from 'react';
import ModuleWorkspace from '../../components/ModuleWorkspace/ModuleWorkspace.jsx';
import './TasksProjectsPage.css';

export default function TasksProjectsPage() {
  return <div className="tasksProjects-page">
    <ModuleWorkspace title="Tasks & Projects" mode="tasks" />
  </div>;
}
