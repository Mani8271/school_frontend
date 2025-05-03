import API from "../../../API/API";
const api = new API();
const endPoint = "students/students-data"; // Endpoint to fetch all classes

export const getAllStudentsApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All students API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
