import { Button } from "react-bootstrap"

function LoadingButton(props) {
  const {loading,text, ...buttonProps} = props;
  return <Button {...buttonProps} disabled={loading === true}>{(loading) ? "Loading...": text}</Button>
}

export default LoadingButton;