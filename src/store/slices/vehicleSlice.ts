import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createVehicleAction,
  deleteVehicleAction,
  getVehicleAction,
  updateVehicleAction,
} from "../actions/vehicleAction";

type VehicleState = Partial<{
  entities: Vehicle[];
}>;

const initialState: VehicleState = {
  entities: [],
};

const actions = [
  createVehicleAction,
  deleteVehicleAction,
  getVehicleAction,
  updateVehicleAction,
];

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createVehicleAction.fulfilled,
      (state, { payload }: PayloadAction<Vehicle>) => {
        state.entities.push(payload);
        Spinner.hide();
      }
    );
    builder.addCase(
      getVehicleAction.fulfilled,
      (state, { payload }: PayloadAction<Vehicle[]>) => {
        state.entities = payload;
        Spinner.hide();
      }
    );
    builder.addCase(
      updateVehicleAction.fulfilled,
      (state, { payload }: PayloadAction<Vehicle>) => {
        const newState = state.entities.map((vehicle) =>
          vehicle.id == payload.id ? payload : vehicle
        );
        state.entities = newState;
        Spinner.hide();
      }
    );
    builder.addCase(
      deleteVehicleAction.fulfilled,
      (state, { payload }: PayloadAction<Vehicle>) => {
        const newState = state.entities.filter(
          (vehicle) => vehicle.id != payload.id
        );
        state.entities = newState;
        Spinner.hide();
      }
    );
    actions.forEach((thunk) =>
      builder.addCase(thunk.pending, () => {
        Spinner.show();
      })
    );
    actions.forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        Spinner.hide();
      })
    );
  },
});
export const vehicleActions = {
  ...vehicleSlice.actions,
  createVehicleAction,
  deleteVehicleAction,
  getVehicleAction,
  updateVehicleAction,
};
