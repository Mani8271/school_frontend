import API from "../../../API/API";
const api = new API();
const endPoint = "classtimetable/classes/delete-class-timetable";  // Endpoint for deleting the class timetable

export const deleteClassTimetableApi = async (timetableId) => {
  console.log("Timetable ID in deleteClassTimetableApi:", timetableId);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, { _id: timetableId });
      console.log("Delete Class Timetable API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
