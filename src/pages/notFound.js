import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { logComponentInitialization } from "./../utils/logComponentEvents";

function NotFound(props) {
  const { initializationPrefix } = props;
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/posts");
  };

  useEffect(() => {
    logComponentInitialization(initializationPrefix, "NotFound");
  }, [initializationPrefix]);

  return (
    <>
      <div className="mb-5">
        <h2>404 Error</h2>
        <h3>The page you are looking for cannot be found</h3>
      </div>
      <button type="button" className="btn btn-primary" onClick={gotoHome}>
        Go Back
      </button>
    </>
  );
}

NotFound.propTypes = {
  initializationPrefix: PropTypes.string,
};

export default NotFound;
