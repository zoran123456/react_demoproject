import { render, screen } from "@testing-library/react";
import React from "react";
import LoadingSpinner from "./../loadingSpinner";

test("successfully renders control", () => {
  render(<LoadingSpinner />);
});

test("has spinner-border element", () => {
  render(<LoadingSpinner />);
  const spinner = screen.getByRole("status");
  expect(spinner).toBeInTheDocument();
});
