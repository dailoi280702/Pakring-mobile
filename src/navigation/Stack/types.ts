export type HomeStackParams = {
  HomeScreen: undefined;
  ParkingDetailsScreen: { parkingLotId: string };
  SelectVehicleScreen: any;
  ReserveParkingScreen: any;
  SelectParkingSlotScreen: any;
  SelectPaymentScreen: any;
  SummaryScreen: any;
  ParkingTicketScreen: any;
};

export type BookingHistoryStackParams = {
  BookingHistoryScreen: undefined;
  ExntendTicket: { ticketWithExtend: Ticket };
};

export type ProfileStackParams = {
  ProfileScreen: undefined;
  PersonalScreen: undefined;
  VehicleScreen: undefined;
  AddVehicleScreen: Vehicle;
  FavoriteScreen: undefined;
  ChangePasswordScreen: undefined;
  ParkingDetailsScreen: { parkingLotId: string };
};
