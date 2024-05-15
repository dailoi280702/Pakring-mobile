import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import bookingSlice from "./slices/bookingSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    booking: bookingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
