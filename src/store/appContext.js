import { createContext } from "react";

export const AppContext = createContext(null);

export function createAppContextValue(currentPage, rowsPerPage, rowsFilter) {
  return {
    paginateCurrentPage: currentPage,
    dataGridRowsPerPage: rowsPerPage,
    dataGridRowsRowsFilter: rowsFilter,
  };
}
