import API from "../../../../API/API";
const api = new API();
const endPoint = "NonTeachingStaff/delete-staff";

export const deletenonteachingstaffApi = async (staffid) => {
    console.log("formdataapi", staffid);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, staffid );
      console.log("/delete-staff API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
