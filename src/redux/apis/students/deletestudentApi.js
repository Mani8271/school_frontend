import API from "../../../API/API";
const api = new API();
const endPoint = "students/delete-student";

export const deletestudentApi = async (studentid) => {
    console.log("formdataapi", studentid);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, studentid );
      console.log("Forgot Password API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
