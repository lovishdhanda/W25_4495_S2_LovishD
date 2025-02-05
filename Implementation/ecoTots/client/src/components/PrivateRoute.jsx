import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  
  //navigate the user to the sign in page
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}