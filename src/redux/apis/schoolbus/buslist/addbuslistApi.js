import API from "../../../../API/API";
const api = new API();
const endPoint = "BusList/add-bus";

export const addbuslistApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("addbuslistApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
