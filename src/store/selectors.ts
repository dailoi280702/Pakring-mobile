import { RootState } from ".";

export const selectTimeFrames = (state: RootState) => state.timeFrame.entities;
export const selectBooking = (state: RootState) => state.booking.entities;
