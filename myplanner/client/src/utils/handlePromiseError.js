const handlePromiseError = function(err){
  if (err.response) {
    return {
      error_type: "server", 
      error: err.response.data.message
    }
  } else if (err.request) {
    return {
      error_type: "client", 
      error: "Connection to server could not be established."
    }
  } else {
    return {
      error_type: "unknown",
      error: "An unexpected issue has occured."
    }
  }
}


export default handlePromiseError
