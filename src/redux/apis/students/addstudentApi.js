import API from "../../../API/API";
const api = new API();
const endPoint = "students/add-students";

export const addstudentApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("Forgot Password API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
