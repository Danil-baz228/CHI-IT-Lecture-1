// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { register } from '../store/slices/userSlice'; // Предполагаем, что у вас есть этот экшн
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { status, error } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Диспатчим экшн для регистрации
    await dispatch(register({ username, password }));
    
    // После успешной регистрации перенаправляем на главную страницу
    if (!error) { // Проверяем, нет ли ошибок
      navigate('/'); // Переход на главную страницу
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
