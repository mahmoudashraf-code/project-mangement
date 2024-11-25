import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import Auth from './pages/Auth.tsx';
import App from './pages/app/Index';
import Home from './pages/app/Home';
import Profile from './pages/app/Profile';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Auth,
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ':id?',
        Component: Home,
      },
      {
        path: 'profile',
        Component: Profile,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
