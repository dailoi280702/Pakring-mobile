import axios from "axios";
import Config from "@src/config";

const axiosClient = () => {
  return axios.create({
    baseURL: Config.API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default axiosClient;
