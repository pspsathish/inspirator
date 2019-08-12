import { getPhpPath } from "../../config";
import axios from "axios";

//intercept request/response with 2 functions as parameters "success and failure"
//whenever a response, this function will called first.

//.use(fn_success,fn_rejected)
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("An unexpected error occurrred.");
  }
  //Return rejected promise
  return Promise.reject(error);
});
function setJwt(jwt) {
  //console.log(axios.defaults, jwt)
  //axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  init
};
function init() {
  // All your magical code to initalize the game!
  axios.defaults.baseURL = getPhpPath();
}
