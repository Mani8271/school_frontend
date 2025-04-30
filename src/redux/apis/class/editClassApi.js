import API from "../../../API/API";
const api = new API();
const endPoint = "classes/update-class"; // Endpoint for updating the class

export const editClassApi = async (classId, classData) => {
    console.log("Data in editClassApi:", classId, classData);
    return new Promise(async (resolve, reject) => {
      try {
        const result = await api.patch(`${endPoint}`, { _id: classId, ...classData }); // Send classId in body
        console.log("Edit Class API response:", result);
        resolve(result);
      } catch (error) {
        console.error("Edit Class API error:", error);
        reject(error);
      }
    });
  };
  
  
