import API from "../../../API/API";
const api = new API();
const endPoint = "classtimetable/update-class-timetable"; // Endpoint for updating the class timetable

export const updateClassTimetableApi = async (timetableId, timetableData) => {
  console.log("Data in updateClassTimetableApi:", timetableId, timetableData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.patch(`${endPoint}`, { _id: timetableId, ...timetableData }); // Send timetableId in body
      console.log("Update Class Timetable API response:", result);
      resolve(result);
    } catch (error) {
      console.error("Update Class Timetable API error:", error);
      reject(error);
    }
  });
};
