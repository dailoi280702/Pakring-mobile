import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import bookingSlice from "./slices/bookingSlice";

export const store = configureStore({
  reducer: {
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
