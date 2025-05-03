import API from "../../../API/API";
const api = new API();
const endPoint = "classtimetable/add-class-timetable"; // Replace with your actual endpoint

export const addClassTimetableApi = async (formData) => {
  console.log("formData in addClassTimetableApi:", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.post(`${endPoint}`, formData);
      console.log("Add Class Timetable API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Add Class Timetable API error:", error);
      reject(error);
    }
  });
};
