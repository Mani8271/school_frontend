import API from "../../../../API/API";
const api = new API();
const endPoint = "BusStaff/update-bus-staff";

export const updatebusstaffApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, formData );
      console.log("updatebusstaffApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
