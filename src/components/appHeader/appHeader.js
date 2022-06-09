import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { logComponentInitialization } from "./../../utils/logComponentEvents";

function AppHeader({ title, initializationPrefix }) {
  useEffect(() => {
    logComponentInitialization(initializationPrefix, "AppHeader");
  }, [initializationPrefix]);

  return (
    <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
      <span className="d-flex align-items-center text-dark text-decoration-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-brand-visual-studio"
          width="40"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <desc>
            Download more icon variants from
            https://tabler-icons.io/i/brand-visual-studio
          </desc>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 8l2 -1l10 13l4 -2v-12l-4 -2l-10 13l-2 -1z"></path>
        </svg>
        <span className="fs-4">{title}</span>
      </span>
    </header>
  );
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  initializationPrefix: PropTypes.string,
};

export default AppHeader;
