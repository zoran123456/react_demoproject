import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logComponentInitialization } from "./../../../utils/logComponentEvents";

function GridComments(props) {
  const { items, primary, secondary, initializationPrefix } = props;

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    logComponentInitialization(initializationPrefix, "GridComments");
  }, [initializationPrefix]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      <ul
        className="list-group list-group-flush"
        style={{ display: expanded ? "" : "none" }}
        data-testid="grid-control"
      >
        {items.map((item) => (
          <li
            className="list-group-item"
            key={item.id}
            data-testid="grid-control-item"
          >
            <strong>{item[primary]}</strong> {item[secondary]}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-link mt-2"
        onClick={toggleExpanded}
      >
        {expanded ? "Hide Comments" : "Show Comments"}
      </button>
    </>
  );
}

GridComments.propTypes = {
  items: PropTypes.array.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  initializationPrefix: PropTypes.string,
};

export default GridComments;
