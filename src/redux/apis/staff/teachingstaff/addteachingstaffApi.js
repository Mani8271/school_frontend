import API from "../../../../API/API";
const api = new API();
const endPoint = "teachingstaff/add-teacher";

export const addteachingstaffApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("TeachingStaff API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
