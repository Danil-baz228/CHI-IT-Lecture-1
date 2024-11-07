import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Определите интерфейс для ваших учетных данных
interface Credentials {
  username: string; // Или email, если это актуально
  password: string;
}

// Определите интерфейс для данных пользователя
interface User {
  token: string;
  username: string; // Добавьте поле username
  // добавьте другие необходимые поля, например, email и т. д.
}

// Определите интерфейс для состояния
interface UserState {
  user: null | User; // Замените 'object' на User
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
}

// Функция для регистрации пользователя
export const register = createAsyncThunk<User, Credentials>(
  'user/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/register', credentials); // Измените путь на ваш
      return response.data; // Предполагается, что response.data - это объект User
    } catch (error) {
      const err = error as { response: { data: string } };
      console.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

// Функция для входа пользователя
export const login = createAsyncThunk<User, Credentials>(
  'user/login',
  async (credentials) => {
    const response = await axiosInstance.post('/api/auth/login', credentials); // Измените путь на ваш
    return response.data; // Предполагается, что response.data - это объект User
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload; // Теперь это объект User
        localStorage.setItem('token', action.payload.token); // action.payload.token теперь доступен
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload; // Теперь это объект User
        localStorage.setItem('token', action.payload.token); // action.payload.token теперь доступен
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string; // Явно указываем, что action.payload - это строка
      });
  },
});

export default userSlice.reducer;
