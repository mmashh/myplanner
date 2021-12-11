import React from 'react';

function ErrorDisplay({error}) {
  var content = (error && error !== "")
    ? <span id="error-message" className="text-danger">Error: {error}</span>
    : <div className="spacer">&nbsp;</div>;

  return (
    <div id="error-display" className="my-2">
      {content}
    </div>
  )

}


export default ErrorDisplay;
