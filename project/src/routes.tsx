import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthGuard } from './components/layout/AuthGuard';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Deliveries } from './pages/Deliveries';
import { Drivers } from './pages/Drivers';
import { Cashiers } from './pages/Cashiers';
import { Customers } from './pages/Customers';
import { Issues } from './pages/Issues';
import { Analytics } from './pages/Analytics';
import { Support } from './pages/Support';
import { Office } from './pages/Office';
import Map from './pages/Map';
import { Receipts } from './pages/Receipts';
import { Chats } from './pages/Chats';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'deliveries',
        element: <Deliveries />,
      },
      {
        path: 'drivers',
        element: <Drivers />,
      },
      {
        path: 'cashiers',
        element: <Cashiers />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'issues',
        element: <Issues />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'support',
        element: <Support />,
      },
      {
        path: 'office',
        element: <Office />,
      },
      {
        path: 'map',
        element: <Map />,
      },
      {
        path: 'receipts',
        element: <Receipts />,
      },
      {
        path: 'chats',
        element: <Chats />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}