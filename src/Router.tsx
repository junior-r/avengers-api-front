import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import LoginPage from './pages/auth/Login.tsx'
import ResgisterPage from './pages/auth/Register.tsx'
import { MainLayout } from './layouts/MainLayout.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import Profile from './pages/account/user/Profile.tsx'
import AccountLayout from './layouts/AccountLayout.tsx'
import ChangePassword from './pages/account/user/ChangePassword.tsx'
import TokenPage from './pages/account/user/token'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/account',
        element: <AccountLayout />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'change-password',
            element: <ChangePassword />,
          },
          {
            path: 'token',
            element: <TokenPage />,
          },
        ],
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <ResgisterPage />,
          },
        ],
      },
      {
        path: '/docs',
        element: <div>docs</div>,
      },
    ],
  },
])
