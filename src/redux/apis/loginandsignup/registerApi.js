import API from "../../../API/API";
const api = new API();

const endPoints = "systemUsers/register";

// This function handles the registration API call
export const registerApi = async (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Automatically handled by API class (which supports FormData)
      const result = await api.post(endPoints, formData);
      console.log("Register API response:", result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
