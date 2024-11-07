// src/pages/HomePage.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AuthForm from '../components/LoginForm';

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      <h1>Добро пожаловать на главную страницу!</h1>
      {user ? (
        <p>Вы зарегистрированы как: <strong>{user.username}</strong></p>
      ) : (
        <div>
          <p>Вы не зарегистрированы.</p>
          <AuthForm />
        </div>
      )}
    </div>
  );
};

export default HomePage;
