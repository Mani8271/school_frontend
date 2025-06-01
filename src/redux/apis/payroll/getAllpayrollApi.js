import API from "../../../API/API";
const api = new API();
const endPoint = "Payroll/payrolls-data"; // Endpoint to fetch all classes

export const getAllpayrollApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get All non getAllfeesApi API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};