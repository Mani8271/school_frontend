import API from "../../../../API/API";
const api = new API();
const endPoint = "NonTeachingStaff/all-staff-data"; // Endpoint to fetch all classes

export const getAllnonTeachingApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All non TeachingStaff API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};