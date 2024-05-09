type User = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
};

type ParkingLot = {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: number;
  long: number;
  startTime: Date;
  endTime: Date;
  companyId: string;
};

type Block = {
  id: string;
  parkingLotId: string;
  code: string;
  description: string;
  slot: number;
};

type TimeFrame = {
  id: string;
  parkingLotId: string;
  duration: number;
  cost: number;
};
