import API from "../../../../API/API";
const api = new API();
const endPoint = "TeachingStaff/delete-teacher";

export const deleteteachingstaffApi = async (teacherid) => {
    console.log("formdataapi", teacherid);
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
