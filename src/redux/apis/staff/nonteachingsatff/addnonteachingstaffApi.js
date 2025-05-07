import API from "../../../../API/API";
const api = new API();
const endPoint = "NonTeachingStaff/add-staff";

export const addnonteachingstaffApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData );
      console.log("NonTeachingStaff API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
