import { Navigate, Outlet } from 'react-router-dom';
import Cookie from 'universal-cookie';
export default function PublicRoutes() {
  const cookie = new Cookie();
  const token = cookie.get('token');
  console.log(token);
  if (token) {
    return <Navigate to='/' />;
  } else {
    return <Outlet />;
  }
}
