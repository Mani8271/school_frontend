import API from "../../../../API/API";
const api = new API();
const endPoint = "TeachingStaff/teachers-data"; // Endpoint to fetch all classes

export const getAllTeachingApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All TeachingStaff API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};