import API from "../../../API/API";
const api = new API();
const endPoint = "systemUsers/profile";

export const getprofiledataApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Forgot Password API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
