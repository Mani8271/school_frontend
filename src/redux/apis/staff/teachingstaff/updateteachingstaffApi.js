import API from "../../../../API/API";
const api = new API();
const endPoint = "TeachingStaff/update-teacher";

export const updateteachingstaffApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, formData );
      console.log("update-teacher API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
