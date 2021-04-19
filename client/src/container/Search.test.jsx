import React from "react";
import { renderWithRouter } from "utils/tests/renderWithRouter";
import { Search } from "./Search";

describe("GIVEN Search Component", () => {
  describe("WHEN page is rendered", () => {
    it("THEN should match to snapshot", () => {
      const { asFragment } = renderWithRouter(<Search />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
