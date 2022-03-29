import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import Login from "./pages/Login";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // {
    //   path: '/',
    //   element: <DashboardLayout />,
    //   children: [
    //     { path: '/', element: <Navigate to="/dashboard" /> },
    //     { path: 'dashboard', element: <DashboardApp /> }
    //   ]
    // },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/trip1"/> },
        { path: 'dashboard', element: <Navigate to="/trip1"/> },
        { path: 'trip1', element: <DashboardApp /> },
        { path: 'trip2', element: <DashboardApp /> },
        { path: 'trip3', element: <DashboardApp /> },
        { path: 'trip4', element: <DashboardApp /> },
        { path: 'trip5', element: <DashboardApp /> },
        { path: 'trip6', element: <DashboardApp /> },
        { path: '404', element: <NotFound /> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
