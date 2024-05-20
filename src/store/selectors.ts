import { RootState } from ".";

export const selectVehicles = (state: RootState) => state.vehicles.entities;
export const selectTimeFrames = (state: RootState) => state.timeFrame.entities;
export const selectBooking = (state: RootState) => state.booking.entities;
