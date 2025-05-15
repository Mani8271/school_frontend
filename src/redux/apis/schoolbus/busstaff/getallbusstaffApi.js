import API from "../../../../API/API";
const api = new API();
const endPoint = "BusStaff/buses-staff-data"; // Endpoint to fetch all classes

export const getallbusstaffApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All non getallbusstaffApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};