import API from "../../../API/API";
const api = new API();
const endPoint = "Fees/add-fee";

export const addfessApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("addfessApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
