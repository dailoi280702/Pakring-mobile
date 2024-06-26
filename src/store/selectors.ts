import { RootState } from "./";

export const selectVehicles = (state: RootState) => state.vehicles.entities;
export const selectTimeFrames = (state: RootState) => state.timeFrame.entities;
export const selectBooking = (state: RootState) => state.booking.entities;
export const selectUser = (state: RootState) => state.user.data;
export const selectFavorites = (state: RootState) => state.favorite.entities;
export const selectNewTickets = (state: RootState) => state.ticket.newBooking;
export const selectOngoingTickets = (state: RootState) =>
  state.ticket.ongoingBooking;
export const selectCompletedTickets = (state: RootState) =>
  state.ticket.completedBooking;
export const selectCancelTickets = (state: RootState) =>
  state.ticket.cancelBooking;
