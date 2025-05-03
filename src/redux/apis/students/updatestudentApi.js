import API from "../../../API/API";
const api = new API();
const endPoint = "students/update-student";

export const updatestudentApi = async (formData) => {
    console.log("formdataapi", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, formData );
      console.log("Forgot Password API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
