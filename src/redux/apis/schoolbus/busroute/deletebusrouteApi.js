import API from "../../../../API/API";
const api = new API();
const endPoint = "BusRoutes/delete-bus-route";

export const deletebusrouteApi = async (staffid) => {
    console.log("formdataapi", staffid);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, staffid );
      console.log("/deletebusrouteApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
