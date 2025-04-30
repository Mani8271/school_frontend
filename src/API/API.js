import axios from "axios";
import { STATUS_CODE, BASE_URL } from "./Constants";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

console.log("localStorage.getItem(token);", localStorage.getItem("token"));

// Request Methods
const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

/*
* API controller that handles requests
*/
class API {
  isLoggedIn = false;
  userData = {};
  userToken = null;
  constructor() {
    this.baseURL = BASE_URL;
   
  }

  get(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.GET, url, data)
        .then((response) => resolve(response))
        .catch((error) => console.log(error));
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.POST, url, data)
        .then((response) => resolve(response))
        .catch((error) => console.log(error));
    });
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.PUT, url, data)
        .then((response) => resolve(response))
        .catch((error) => console.log(error));
    });
  }

  patch(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.PATCH, url, data)
        .then((response) => resolve(response))
        .catch((error) => console.log(error));
    });
  }

  delete(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.DELETE, url, data)
        .then((response) => resolve(response))
        .catch((error) => console.log(error));
    });
  }

  // Main function to handle API requests
  api(method, url, data) {
    console.log('method, url, data', method, url, data);
    return new Promise((resolve, reject) => {
      let axiosConfig = {};
      axiosConfig.method = method;
      axiosConfig.url = this.baseURL + url;
      axiosConfig.headers = this.setHeaders(data);
      axiosConfig.withCredentials = true;  

      if (data) {
        axiosConfig.data = data;  
      }

      axios(axiosConfig)
        .then((response) => {
          if (response && response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
            alert("Something went wrong!!");
          } else {
            resolve(response);
            console.log('Response:', response.data?.token); // Check full response structure
            const successMessage = response.data?.messages;
            if (successMessage) {
              toast.success(successMessage);
            } else {
              console.log('No success message found');
            }
          }
        })
        .catch((error) => {
          this.handleApiError(error);  
        });
    });
  }

 
  setHeaders(data) {
    let headers = {};
    headers["accept-language"] = "en";
    headers["Accept"] = "application/json";
    headers["Authorization"] = localStorage.getItem("token");
    

    if (data instanceof FormData) { 
    } else {
      headers["Content-Type"] = "application/json";  
    }

    return headers;
  }
 
  handleApiError(error) {
    let err = error?.response;
    let errData = error?.response?.data;
    console.log("in API", err);
    console.log("in API", errData);
    console.log("ERROR", error);

    if (errData?.email?.length > 0) {
      toast.error(`Email ${errData.email[0]}`);
    } else if (errData?.phone_number?.length > 0) {
      toast.error(`Mobile Number ${errData.phone_number[0]}`);
    } else if (errData?.message?.length > 0) {
      toast.error(`${errData.messages}`);
    } else if (err?.status === 401) {
      toast.error(`${errData.errors}`);
    } else if (err?.status === 422) {
      toast.error(`${errData.errors}`);
    } else {
      toast.error("An error occurred");
    }
  }
}

export default API;