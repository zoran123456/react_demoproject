import { render, screen } from "@testing-library/react";
import React from "react";
import Pagination from "../pagination";

test("successfully renders control", () => {
  render(
    <Pagination
      rowsPerPage={5}
      dataCount={20}
      currentPage={1}
      pageChanged={() => {}}
    />
  );
});

test("pagination control has items", () => {
  const { getByTestId } = render(
    <Pagination
      rowsPerPage={5}
      dataCount={20}
      currentPage={1}
      pageChanged={() => {}}
    />
  );
  const control = getByTestId("datagrid-pagination");
  const childItems = screen.getAllByTestId("datagrid-pagination-item");

  expect(control).toBeInTheDocument();
  expect(childItems).not.toBeNull();
});
