import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import sampleSlice from "../features/sample/sampleSlice";
import { sampleApi } from "../features/sample/sampleApi";
import unsavedChangesSlice from "../features/prompt/unsavedChangesSlice";
import mangaFormSlice from "../features/manga/mangaFormSlice";
import loginFormSlice from "../features/login/loginFormSlice";
import userProfileFormSlice from "../features/user-profile/userProfileFormSlice";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  loginFormSlice,
  mangaFormSlice,
  userProfileFormSlice,
  sampleSlice: sampleSlice,
  [sampleApi.reducerPath]: sampleApi.reducer,
  unsavedChangesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat([sampleApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
