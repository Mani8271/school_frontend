import API from "../../../../API/API";
const api = new API();
const endPoint = "BusRoutes/buses-routes-data"; // Endpoint to fetch all classes

export const getallbusrouteApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All non getallbusrouteApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};