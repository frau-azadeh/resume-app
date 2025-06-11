import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import personalInfoReducer from "./slices/personalInfoSlice";
import tabReducer from "./slices/tabSlice";
import educationReducer from "./slices/educationSlice";
import workReducer from "./slices/workSlice";
import skillReducer from "./slices/skillSlice";

const rootReducer = combineReducers({
  personalInfo: personalInfoReducer,
  tab: tabReducer,
  education: educationReducer,
  work: workReducer,
  skill: skillReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["personalInfo"],
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
