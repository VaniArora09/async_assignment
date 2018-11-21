
exports.parameterMissingResponse = parameterMissingResponse;
exports.emailAlreadyExits        = emailAlreadyExits;


function parameterMissingResponse(res, err, data) {
    var response = {
      message: err || "PARAMETER_MISSING",
      status : "201",
      data   : data || {}
    };
    res.send(JSON.stringify(response));
  }

  
  function emailAlreadyExits(res, err, data) {
    var response = {
      message: err || "EMAIL_ALREADY_EXITS",
      status : "101",
      data   : data || {}
    };
    res.send(JSON.stringify(response));
  }