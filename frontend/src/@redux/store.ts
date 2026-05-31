import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import { authReducer } from "../model/auth/auth.slice";
import { authApi } from "../model/auth/auth.api";
import { channelsApi } from "../model/channels/channels.api";
import { channelsReducer } from "../model/channels/channels.slice";
import { messagesApi } from "../model/messages/messages.api";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  channels: channelsReducer,
  [authApi.reducerPath]: authApi.reducer,
  [channelsApi.reducerPath]: channelsApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      channelsApi.middleware,
      messagesApi.middleware,
    ),
});

const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

export type { RootState };
export { store, persistor };
