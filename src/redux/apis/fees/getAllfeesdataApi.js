import API from "../../../API/API";
const api = new API();
const endPoint = "Fees/fees-data"; // Endpoint to fetch all classes

export const getAllfeesApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All non getAllfeesApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};