import _ from "lodash";

export function paginateData(data, currentPage, itemsPerPage) {
  const start = (currentPage - 1) * itemsPerPage;

  return _(data).slice(start).take(itemsPerPage).value();
}
