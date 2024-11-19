import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import commentsSlice from "./slices/commentsSlice";
import exhibitsSlice from "./slices/exhibitsSlice"; // Импортируем ваш slice

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    comments: commentsSlice,
    exhibits: exhibitsSlice, // Добавляем exhibitsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
