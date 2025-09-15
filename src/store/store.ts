import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import educationReducer from "./slices/educationSlice";
// localStorage
import personalInfoReducer from "./slices/personalInfoSlice";
import skillReducer from "./slices/skillSlice";
import userReducer from "./slices/userSlice";
import workReducer from "./slices/workSlice";

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  user: userReducer,
  education: educationReducer,
  work: workReducer,
  skill: skillReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["personalInfo", "work", "skill", "education"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
