import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRouter } from 'next/router';

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login'); // Redirect to login page
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Return null until redirection completes
  }

  return children;
}

export default ProtectedRoute;
