import { PropTypes } from "prop-types";
import React, { useEffect } from "react";
import { logComponentInitialization } from "./../../utils/logComponentEvents";

function LoadingSpinner(props) {
  const { initializationPrefix } = props;

  useEffect(() => {
    logComponentInitialization(initializationPrefix, "LoadingSpinner");
  }, [initializationPrefix]);

  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

LoadingSpinner.propTypes = {
  initializationPrefix: PropTypes.string,
};

export default LoadingSpinner;
