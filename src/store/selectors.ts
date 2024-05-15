import { RootState } from ".";

export const selectBooking = (state: RootState) => state.booking.entities;
export const selectUser = (state: RootState) => state.user.data;
