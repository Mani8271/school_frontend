import API from "../../../API/API";
const api = new API();
const endPoint = "classes/delete-class";  // Endpoint for deleting the class

export const deleteClassApi = async (classId) => {
  console.log("Class ID in deleteClassApi:", classId);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await api.delete(`${endPoint}`, { _id: classId });
      console.log("Delete Class API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
