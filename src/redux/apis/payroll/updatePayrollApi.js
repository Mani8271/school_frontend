import API from "../../../API/API";
const api = new API();
const endPoint = "Payroll/update-payroll-data";

export const updatepayrollApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, formData );
      console.log("update-staff API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
