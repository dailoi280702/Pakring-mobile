import axiosClient from "./axiosClient";

const vehicleApi = {
  create: async (vehicle: Vehicle) => {
    const res = await axiosClient.post("/vehicle/create", {
      ...vehicle,
      user_id: vehicle.userId,
    });
    return res;
  },
  getById: async (idVehicle: string) => {
    const res = await axiosClient.get(`/vehicle/get-one/${idVehicle}`);
    return res;
  },
  update: async (vehicle: Vehicle) => {
    const res = await axiosClient.put(`/vehicle/update/${vehicle.id}`, {
      ...vehicle,
      user_id: vehicle.userId,
    });
    return res;
  },
  getByIdUser: async (idUser: string) => {
    return await axiosClient.get(`/vehicle/get-list?user_id=${idUser}`);
  },
  delete: async (idVehicle: string) => {
    const res = await axiosClient.delete(`/vehicle/delete/${idVehicle}`);
    return res;
  },
};

export default vehicleApi;
