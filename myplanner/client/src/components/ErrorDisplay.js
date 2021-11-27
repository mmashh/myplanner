import React from 'react';

function ErrorDisplay({error}) {
  if (error && error !== "") {
    return (
      <span id="error-message" className="mb-4 text-danger">Error: {error}</span>
    ); 
  } else {
    return null;  // render nothing
  }
}


export default ErrorDisplay;
