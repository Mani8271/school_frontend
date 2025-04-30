import API from "../../../API/API";
const api = new API();
const endPoint = "classes/classes-data"; // Endpoint to fetch all classes

export const getAllClassesApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All Classes API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
