import API from "../../../API/API";
const api = new API();
const endPoint = "add-holiday";

export const addHolidayApi = async (formData) => {
  console.log("formData (addHolidayApi):", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData);
      console.log("Add Holiday API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
