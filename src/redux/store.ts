import { configureStore } from "@reduxjs/toolkit";
import { servicesApi } from "./feature/information/services/servicesSlice";
import { bannerApi } from "./feature/information/banner/bannerSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { balanceApi } from "./feature/transaction/balance/balanceSlice";
import { profileApi } from "./feature/membership/profile/profileSlice";
import { historyApi } from "./feature/transaction/history/historySlice";

export const store = configureStore({
  reducer: {
    [bannerApi.reducerPath]: bannerApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [balanceApi.reducerPath]: balanceApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      servicesApi.middleware,
      bannerApi.middleware,
      balanceApi.middleware,
      profileApi.middleware,
      historyApi.middleware,
    ]),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
