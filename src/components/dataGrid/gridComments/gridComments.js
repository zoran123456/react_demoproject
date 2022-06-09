import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { logComponentInitialization } from "./../../../utils/logComponentEvents";

function GridComments(props) {
  const { items, primary, secondary, showExpandLink, initializationPrefix } =
    props;

  // Shorter is !showExpandLink but it is harder to understand
  const [expanded, setExpanded] = useState(showExpandLink ? false : true);

  useEffect(() => {
    logComponentInitialization(initializationPrefix, "GridComments");
  }, [initializationPrefix]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const getBtnClassName = () => {
    return expanded ? "btn btn-link mt-2" : "btn btn-link";
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
      {showExpandLink && (
        <button
          type="button"
          className={getBtnClassName()}
          onClick={toggleExpanded}
        >
          {expanded ? "Hide Comments" : "Show Comments"}
        </button>
      )}
    </>
  );
}

GridComments.propTypes = {
  items: PropTypes.array.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  showExpandLink: PropTypes.bool,
  initializationPrefix: PropTypes.string,
};

export default GridComments;
