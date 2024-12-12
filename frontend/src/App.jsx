import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HeroSection from './pages/HeroSection';
import AdminMain from './Components/admin/AdminMain'
import Dashboard from './Components/admin/Dashboard';
import Chat from './Components/admin/Chat';
import MedicalHistory from './Components/dashboard/user/MedicalHistory';
import ConsultationHistory from './Components/dashboard/user/ConsultationHistory';
import InsuranceMain from './Components/dashboard/insurance/InsuranceMain';
import InsuranceDashboard from './Components/dashboard/insurance/InsuranceDashboard';
import ManageHospital from './Components/dashboard/insurance/ManageHospital';
import ManageUser from './Components/dashboard/insurance/ManageUser';
import UserCreation from './Components/forms/UserCreation';
import CreateHospitalForm from './Components/forms/CreateHospitalForm';
import QrGenerator from './Components/dashboard/user/QrGenerator';

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
      path: "/user/dashboard",
      element: (
        <div>
          <AdminMain />
        </div>
      ),
      children: [
        {
          path: "/user/dashboard/",
          element: <Dashboard />
        },
        {
          path: "/user/dashboard/chat/",
          element: <Chat />
        },
        {
          path: "/user/dashboard/medical-history/",
          element: <MedicalHistory />
        },
        {
          path: "/user/dashboard/Consultation-history/",
          element: <ConsultationHistory />
        },
        {
          path: "/user/dashboard/qrcode/",
          element: <QrGenerator />
        },
      ]
    },
    {
      path: "/insurance/dashboard",
      element: (
        <div>
          <InsuranceMain />
        </div>
      ),
      children: [
        {
          path: "/insurance/dashboard/",
          element: <InsuranceDashboard />
        },
        {
          path: "/insurance/dashboard/hospital",
          element: <ManageHospital />
        },
        {
          path: "/insurance/dashboard/user",
          element: <ManageUser />
        },
        {
          path: "/insurance/dashboard/addUser",
          element: <UserCreation />
        },
        {
          path: "/insurance/dashboard/addHospital",
          element: <CreateHospitalForm />
        },
      ]
    },

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App