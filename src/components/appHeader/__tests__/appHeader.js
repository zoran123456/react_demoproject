import { render } from "@testing-library/react";
import React from "react";
import AppHeader from "./../appHeader";

test("successfully renders control", () => {
  render(<AppHeader title="Test" />);
});
