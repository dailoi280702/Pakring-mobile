import axiosClient from "./axiosClient";

const favoriteApi = {
  getAll: async (idUser: any) => {
    const res = await axiosClient.get("/favorite/get-all?userId=" + idUser);
    return res.data;
  },
  create: async (params: any) => {
    const res = await axiosClient.post("/favorite/create", params);
    return res.data;
  },
  deleteOne: async (idFavorite: any) => {
    const res = await axiosClient.delete("/favorite/delete/" + idFavorite);
    return res.data;  
  },
  getOne: async (userId: string, parkingLotId: string) => {
    const res = await axiosClient.get(`/favorite/get-one?userId=${userId}&parkingLotId=${parkingLotId}`);
    return res.data;  
  },
};

export default favoriteApi;
