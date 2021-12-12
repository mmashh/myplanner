const handlePromiseError = function(err){
  if (err.response){
    switch (err.response.status) {
      case (500):
        return {
          error_type: "UNKNOWN",
          error: "An unknown issue with the server has occured. Please log out and try again."
        };
      case (401):
        return {
          error_type: "UNAUTHORIZED",
          error: (err.response.data?.error !== undefined) ? err.response.data?.error : "The request being actioned is unauthorized. Please try again."
        };
      case (422):
        return {
          error_type: "UNPROCESSABLEENTITY",
          error: (err.response.data?.error !== undefined) ? err.response.data?.error : "This request cannot be processed by the server. Please try again."
        };
      default:
        return  {
          error_type: "UNKNOWN",
          error: "An unknown issue with the server has occured. Please log out and try again."        
        }
    }
  } else if (err.request) {
    return {
      error_type: "CLIENT", 
      error: "Connection to server could not be established."
    }
  } else {
    return {
      error_type: "UNKOWN",
      error: "An unexpected issue has occured."
    }
  }
}

export default handlePromiseError;
