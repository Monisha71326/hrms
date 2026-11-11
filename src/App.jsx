import React from 'react';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { AppLayout } from './layouts/AppLayout.jsx';

export default function App() {
  return <AppLayout><AppRoutes /></AppLayout>;
}
