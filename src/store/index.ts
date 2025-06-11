import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./slices/tabSlice";

export const store = configureStore({
  reducer: {
    tab: tabReducer,
  },
});

// Types برای TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
