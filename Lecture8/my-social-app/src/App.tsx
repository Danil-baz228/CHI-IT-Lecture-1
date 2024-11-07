// App.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; // Импортируем новый компонент
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isAllowed }: { children: JSX.Element; isAllowed: boolean }) {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.user !== null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Главная страница */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
