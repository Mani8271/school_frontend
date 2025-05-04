import API from "../../../../API/API";
const api = new API();
const endPoint = "TeachingStaff/delete-student";

export const deleteteachingstaffApi = async (teacherid) => {
    console.log("formdataapi", studentid);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, teacherid );
      console.log("/delete-teacher API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
