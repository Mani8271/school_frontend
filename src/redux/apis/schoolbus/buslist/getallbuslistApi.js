import API from "../../../../API/API";
const api = new API();
const endPoint = "BusList/buses-data"; // Endpoint to fetch all classes

export const getAllbuslistApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All non BusList API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};