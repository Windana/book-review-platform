import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';

export const appRoutes = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  profile: (username: string) => `/profile/${username}`,
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'profile/:username', element: <ProfilePage /> },
      { path: '*', element: <Navigate to={appRoutes.home} replace /> },
    ],
  },
];

export function AppRoutes() {
  return useRoutes(routes);
}
