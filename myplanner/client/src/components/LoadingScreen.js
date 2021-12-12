import {Spinner} from 'react-bootstrap';


function LoadingScreen({show, isTransparent}){
  if (show) {
    
    
    return (
    <div className="loading-screen" style={(!isTransparent) ? {backgroundColor:'black',opacity:'40%'} : undefined}>
      <div className="loading-container">
        <Spinner className="loading-icon text-light" animation="border" />
        <span className="loading-text">Loading...</span>
      </div>
    </div>);
  } else {
    return null;
  }
}

export default LoadingScreen;