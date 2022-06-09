import { render } from "@testing-library/react";
import React from "react";
import PostsFilter from "../postsFilter";

test("successfully renders control", () => {
  render(<PostsFilter onChange={() => {}} />);
});
