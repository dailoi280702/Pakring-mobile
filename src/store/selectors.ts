import { RootState } from ".";

export const selectBooking = (state: RootState) => state.booking.entities;
