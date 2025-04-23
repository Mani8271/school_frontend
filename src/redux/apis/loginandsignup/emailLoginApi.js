import API from "../../../API/API";
const api = new API();
const endPoints = "systemUsers/login";
export const createEmailLoginApi = async (formData) => {
  // console.log('users in api', users);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoints}`, formData );
      console.log("api response",result)
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};