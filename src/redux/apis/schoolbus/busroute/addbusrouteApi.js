import API from "../../../../API/API";
const api = new API();
const endPoint = "BusRoutes/add-bus-route";

export const addbusrouteApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("addbusrouteApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
