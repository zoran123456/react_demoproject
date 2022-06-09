import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { numberBetween } from "./../../../customPropTypes/numberBetween";
import _ from "lodash";
import { logComponentInitialization } from "./../../../utils/logComponentEvents";

function Pagination({
  dataCount,
  rowsPerPage,
  currentPage,
  pageChanged,
  initializationPrefix,
}) {
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    // custom validator handles min value for rowsPerPage so it cannot be 0
    setPagesCount(Math.ceil(dataCount / rowsPerPage));
  }, [dataCount, rowsPerPage]);

  useEffect(() => {
    logComponentInitialization(initializationPrefix, "Pagination");
  }, [initializationPrefix]);

  if (pagesCount <= 1) return null;

  const linkClassName = (pageNum) => {
    return pageNum === currentPage ? "page-item active" : "page-item";
  };

  return (
    <nav data-testid="datagrid-pagination" aria-label="Page navigation example">
      <ul className="pagination">
        {/* alternative for lodash could be [...Array(pagesCount)].map for example */}
        {_.times(pagesCount, (num) => (
          <li
            data-testid="datagrid-pagination-item"
            key={num}
            className={linkClassName(num + 1)}
          >
            <a className="page-link" onClick={() => pageChanged(num + 1)}>
              {num + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  dataCount: PropTypes.number,
  rowsPerPage: numberBetween(1, 200),
  currentPage: PropTypes.number,
  pageChanged: PropTypes.func.isRequired,
  initializationPrefix: PropTypes.string,
};

Pagination.defaultProps = {
  rowsPerPage: 10,
  currentPage: 1,
};

export default Pagination;
