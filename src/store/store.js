import { appConfigReducer } from '@/slices/appConfig';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { configPersister } from './middleware';
import { internalApi } from '@/api/internalApi';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    [internalApi.reducerPath]: internalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(internalApi.middleware, configPersister),
});

setupListeners(store.dispatch);
