import API from "../../../../API/API";
const api = new API();
const endPoint = "BusRoutes/update-bus-route";

export const updatebusrouteApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, formData );
      console.log("updatebusrouteApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
