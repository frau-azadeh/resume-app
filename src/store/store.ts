// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";

export const store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
