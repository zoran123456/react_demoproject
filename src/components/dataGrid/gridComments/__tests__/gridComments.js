import { render, screen } from "@testing-library/react";
import React from "react";
import GridComments from "../gridComments";

const items = [
  { email: "a@a.com", title: "Foo", id: 1 },
  { email: "b@b.com", title: "Bar", id: 2 },
  { email: "c@c.com", title: "Baz", id: 3 },
];

test("successfully renders control", () => {
  render(<GridComments primary="email" secondary="title" items={items} />);
});

test("grid comments control has items", () => {
  const { getByTestId } = render(
    <GridComments primary="email" secondary="title" items={items} />
  );
  const control = getByTestId("grid-control");
  const childItems = screen.getAllByTestId("grid-control-item");

  expect(control).toBeInTheDocument();
  expect(childItems).not.toBeNull();
});
