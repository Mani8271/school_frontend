import API from "../../../../API/API";
const api = new API();
const endPoint = "BusStaff/delete-bus-staff";

export const deletebusstaffApi = async (staffid) => {
    console.log("formdataapi", staffid);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, staffid );
      console.log("/deletebusstaffApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
