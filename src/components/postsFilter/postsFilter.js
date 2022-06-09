import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { logComponentInitialization } from "./../../utils/logComponentEvents";

function PostsFilter({ value, onChange, initializationPrefix }) {
  useEffect(() => {
    logComponentInitialization(initializationPrefix, "PostsFilter");
  }, []);

  return (
    <div className="form-floating mb-2">
      <input
        className="form-control"
        id="floatingInput"
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor="floatingInput">Filter posts by title</label>
    </div>
  );
}

PostsFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  initializationPrefix: PropTypes.string,
};

export default PostsFilter;
