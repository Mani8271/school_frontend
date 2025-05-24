import API from "../../../API/API";
const api = new API();
const endPoint = "Fees/delete-fee";

export const deletefeesApi = async (staffid) => {
    console.log("formdataapi", staffid);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, staffid );
      console.log("/delete-fee API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
