import API from "../../../API/API";
const api = new API();
const endPoint = "Payroll/delete-payroll-data";

export const deletepayrollApi = async (staffid) => {
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
