import _ from "lodash";

// Helper function used to paginate through the list of items
// Used in the Paginate component
export function paginateData(data, currentPage, itemsPerPage) {
  const start = (currentPage - 1) * itemsPerPage;

  return _(data).slice(start).take(itemsPerPage).value();
}
