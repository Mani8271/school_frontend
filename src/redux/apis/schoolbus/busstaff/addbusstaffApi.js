import API from "../../../../API/API";
const api = new API();
const endPoint = "BusStaff/add-bus-staff";

export const addbusstaffApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("addbusstaffApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
