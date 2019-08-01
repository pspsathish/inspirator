/*import http from "./httpService";*/
import { getAjaxService } from "./ajaxservice";
import { getEnvironment } from "../../config";

function dbService() {}
export default dbService;

export const getDBService = async (service, data, callback) => {
  //Call the server
	const apiEndPoint = service;
	if (getEnvironment() === "php") {
		try {
			const response = await getAjaxService(apiEndPoint, data, callback);
			//console.log(response.data);
			callback(response.data.result, response.data.data, response.data.msg);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				console.log(ex.response.data);
			}
		}
	}
};
