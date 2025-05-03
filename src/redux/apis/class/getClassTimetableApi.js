import API from "../../../API/API";
const api = new API();
const endPoint = "classtimetable/classes-timetable-data"; // Match your backend route

export const getClassTimetableApi = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.get(`${endPoint}`);
      console.log("Get Class Timetable API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Get Class Timetable API error:", error);
      reject(error);
    }
  });
};
