import React from "react";

import { renderWithRouter } from "../utils/tests/renderWithRouter";
import { InputSearch } from "./InputSearch";

describe("GIVEN InputSearch Component", () => {
  describe("WHEN searches some text", () => {
    it("THEN should match to snapshot", () => {
      const { asFragment } = renderWithRouter(<InputSearch />);
      expect(asFragment()).toMatchSnapshot();
    });
    xit("THEN should change the url search params", () => {});
  });
});
