import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HeroSection from './pages/HeroSection';
import AdminMain from './Components/admin/AdminMain'
import Dashboard from './Components/admin/Dashboard';
import Chat from './Components/admin/Chat';

const App = () => {
  const Layout = () => {
    return (
      <>
        <Outlet />
      </>
    );
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/test',
      element: <HeroSection />
    },
    {
      path: "/admin/dashboard",
      element: (
        <div>
          <AdminMain />
        </div>
      ),
      children: [
        {
          path: "/admin/dashboard/",
          element: <Dashboard />
        },
        {
          path: "/admin/dashboard/chat/",
          element: <Chat />
        },
      ]
    }

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App