import API from "../../../API/API";
const api = new API();
const endPoint = "classes/add-class";

export const addClassApi = async (formData) => {
  console.log("formData in addClassApi:", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData);
      console.log("Add Class API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
