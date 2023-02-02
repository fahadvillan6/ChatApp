import { Navigate, Outlet } from 'react-router-dom';
import Cookie from 'universal-cookie';
export default function PrivateRoutes() {
  const cookie = new Cookie();
  const token = cookie.get('token') || localStorage.getItem('token');

  if (token) return <Outlet />;

  return <Navigate to='/login' />;
}
