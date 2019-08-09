import { getPhpPath } from "../../config";
import $ from "jquery";

function AjaxService() {}
export default AjaxService;

export const getAjaxService = (service, data, callback) => {
  callback("success", { aid: "sassa" }, "message");
  return true;
  //console.log(data);
  let phpPath = getPhpPath();
  let ajaxCallPhp = false;
  if (!ajaxCallPhp) {
    ajaxCallPhp = true;
    var datasend = { ...data, perform: service };
    //$(this).serialize() + "&" + $.param(datasend);
    $.ajax({
      type: "POST",
      dataType: "json",
      crossDomain: true,
      async: false,
      data: datasend,
      url: phpPath + "phpactions.php",
      beforeSend: function() {
        $("body").addClass("loading");
      },
      complete: function() {
        $("body").removeClass("loading");
      },
      success: function(response) {
        ajaxCallPhp = false;
        callback(response.result, response.data, response.msg);
      },
      error: function(e) {
        ajaxCallPhp = false;
      }
    });
  } else {
    return false;
  }
};
